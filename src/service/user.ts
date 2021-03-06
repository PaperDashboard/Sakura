import { Document } from "mongoose"
import * as bcrypt from 'bcrypt'
import { isNull } from "util"
import * as nanoid from 'nanoid'
import { IConfig } from "config";
import { isToday } from '../utils/date';

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

    public async findById(userId: string): Promise<Document> {
        return await this.context.model.user.findById(userId)
    }

    public async findByMail(userMail: string): Promise<Document> {
        return this.context.model.user.findOne({
            "email": userMail
        })
    }

    public async findFromToken(userToken: string): Promise<Document> {
        const id = await this.context.service.session.get(userToken)
        return await this.findById(id)
    }

    public async getPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS)
    }

    public async login(email: string, password: string): Promise<Document> {
        const user: Document = await this.findByMail(email)
        if (isNull(user)) {
            throw new Error("User login failure")
        }
        const isLogin = await bcrypt.compare(password, user["password"])
        if (!isLogin) {
            throw new Error("User login failure")
        }
        return user
    }

    public async register(user: Object): Promise<Document> {
        user["password"] = await this.getPassword(user["password"])
        user["linkPassword"] = nanoid(8)
        user["port"] = await this.getEmptyPort()
        const product = await this.context.service.product.getInitProduct()
        user["product"] = [ product._id ]
        user["inviteNumber"] = this.context.config.get('user.initInvite')
        const u: Document = new this.context.model.user(user)
        await u.save()
        return u;
    }

    public async getDefaultProduct(userId: string): Promise<string> {
        const user = await this.findById(userId)

        return this.context.service.product.findDeafultProduct(user["product"])
    }

    public async signup(userId: string): Promise<number> {
        const user = await this.findById(userId);
        const config: IConfig = this.context.config

        if (isToday(user["lastSignup"])) {
            throw new Error('User is signuped today');
        }

        const max: number = config.get('user.signup.max'),
            min: number = config.get('user.signup.min');

        const traffic: number = Math.ceil(
            Math.random() * (max - min)
        ) + min;

        const productId = await this.getDefaultProduct(userId);
        await this.context.service.product.addTraffic(productId, traffic);

        user['lastSignup'] = new Date()
        await user.save()
        return traffic
    }

    public async getTrafficDetail(userId: string): Promise<Object> {
        const user = await this.findById(userId);
        const ret = {
            used: 0,
            free: 0
        };

        for (const element of user["product"]) {
            const product = await this.context.service.product.findById(element);
            ret["used"] += product.used,
            ret["free"] += product.traffic
        }

        return ret
    }

    public async getProductList(userId: string): Promise<Array<Document>> {
        const user = await this.findById(userId);

        const ret: Array<Document> = [];
        for (const element of user["product"]) {
            const product: Document = await this.context.service.product.findById(element);
            ret.push(product);
        }

        return ret
    }

    public async getHighestLevel(userId: string): Promise<number> {
        const list = await this.getProductList(userId)
        let max: number = 0

        for (const element of list) {
            if (element["level"] > max) {
                max = element["level"]
            }
        }

        return max
    }

    public async updateSettings(userId: string, settings: object): Promise<void> {
        const user = await this.findById(userId);;
        for (const item in settings) {
            user[item] = settings[item]
        }
        await user.save()
    }
}

export default UserService
