import { Document } from "mongoose";

class ProduceService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getAllNodes(): Promise<Array<Document>> {
        return await this.context.model.node.find({})
    }
}

export default ProduceService
