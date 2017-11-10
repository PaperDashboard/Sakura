import { Document } from "mongoose"
import * as bcrypt from 'bcrypt'
import { isNull } from "util";

const SALT_ROUNDS = 10;


class UserService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getUserById(userId): Promise<Document> {
        return await this.context.model.user.findById(userId)
    }

    public async getUserByMail(userMail): Promise<Document> {
        return this.context.model.user.findOne({
            "email": userMail
        })
    }

    public async getPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS)
    }

    public async login(email, password): Promise<boolean> {
        const user: Document = await this.getUserByMail(email)
        if (isNull(user)) {
            return false
        }
        return await bcrypt.compare(password, user["password"])
    }

    public async register(user): Promise<Document> {
        user.password = await this.getPassword(user.password)
        const u: Document = new this.context.model.user(user)
        return u;
    }
}

export default UserService
