import { Document } from "mongoose"
import * as bcrypt from 'bcrypt'
import { isNull } from "util"
import * as nanoid from 'nanoid'
import { IConfig } from "config";

const SALT_ROUNDS = 10;


class UserService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async checkPort(port: number): Promise<boolean> {
        const user = await this.context.model.user.findOne({ port })
        return isNull(user)
    }

    public async getEmptyPort(): Promise<number> {
        const config: IConfig = this.context.config

        const min: number = config.get("shadowsocks.port.begin"),
            max: number = config.get("shadowsocks.port.end")

        function getRamdonInt(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min)) + min
        }

        const userNumber: number = await this.context.model.user.count({});

        // if user is too much 😂
        if (userNumber === (max - min)) {
            throw new Error("Port poll is full");
        }

        let port: number = getRamdonInt(min, max)
        while (!await this.checkPort(port)) {
            port =  getRamdonInt(min, max)
        }

        return port;
    }

    public async getUserById(userId): Promise<Document> {
        return await this.context.model.user.findById(userId)
    }

    public async getUserByMail(userMail): Promise<Document> {
        return this.context.model.user.findOne({
            "email": userMail
        })
    }

    public async getFromToken(userToken: string): Promise<Document> {
        const id = await this.context.service.session.get(userToken)
        return await this.getUserById(id)
    }

    public async getPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS)
    }

    public async login(email, password): Promise<Document> {
        const user: Document = await this.getUserByMail(email)
        if (isNull(user)) {
            throw new Error("User login failure")
        }
        const isLogin = await bcrypt.compare(password, user["password"])
        if (!isLogin) {
            throw new Error("User login failure")
        }
        return user
    }

    public async register(user): Promise<Document> {
        user.password = await this.getPassword(user.password)
        user.linkPassword = nanoid(8)
        user.port = await this.getEmptyPort()
        const produce = await this.context.service.produce.getInitProduce()
        console.log(produce)
        user.produce = [ produce._id ]
        const u: Document = new this.context.model.user(user)
        await u.save()
        return u;
    }
}

export default UserService
