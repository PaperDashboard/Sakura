import { Document } from "mongoose"
import * as nanoid from 'nanoid'
import { isNull } from "util";

class SessionService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async create(userId): Promise<string> {
        const uid: string = nanoid()
        await this.context.db.redis.set(uid, userId)
        return uid
    }

    public async get(token): Promise<string> {
        const ret = await this.context.db.redis.get()
        if (!isNull(ret)) {
            return ret
        } else {
            throw new Error("Not found token")
        }
    }
}

export default SessionService
