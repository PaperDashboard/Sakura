import { Document } from "mongoose"
import * as nanoid from 'nanoid'
import { isNull } from "util";
import { Redis } from "ioredis";
import { IConfig } from "config";

class SessionService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async create(userId): Promise<string> {
        const uid: string = nanoid(),
            config: IConfig = this.context.config,
            expireTime: number = config.get("user.keyExpire")

        await this.context.db.redis.set(uid, userId)

        await this.context.db.redis.expire(uid, expireTime)
        return uid
    }

    public async get(token): Promise<string> {
        const ret = await this.context.db.redis.get(token)
        if (!isNull(ret)) {
            return ret
        } else {
            throw new Error("Not found token")
        }
    }
}

export default SessionService
