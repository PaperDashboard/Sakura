import { Document } from "mongoose"
import * as nanoid from 'nanoid'

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
}

export default SessionService
