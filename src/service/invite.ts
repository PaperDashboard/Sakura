import { Document } from "mongoose"

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
}

export default InviteService
