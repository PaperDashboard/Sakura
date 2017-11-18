import { Document } from "mongoose"
import { v4 } from 'uuid';

class InviteService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getById(codeId): Promise<Document> {
        return await this.context.model.invite.findById(codeId)
    }

    public async getByCode(codeId): Promise<Document> {
        return await this.context.model.invite.findOne({
            code: codeId
        })
    }

    public async use(code: any) {
        code.used = true
        await code.save()
    }

    public async getPublicCode(): Promise<Array<Document>> {
        return await this.context.model.invite.find({
            owner: null,
            used: false
        })
    }

    public async getUserCode(userId): Promise<Array<Document>> {
        return await this.context.model.invite.find({
            used: false,
            owner: userId
        })
    }

    public async createCodeForUser(userId): Promise<Document> {
        const doc: Document = new this.context.model.invite({
            code: v4(),
            owner: userId
        })
        await doc.save()
        return doc
    }
}

export default InviteService
