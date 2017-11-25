import { Document } from "mongoose";

class ProduceService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getAllNodes(): Promise<Array<Document>> {
        return await this.context.model.node.find({})
    }

    public async create(nodeObject): Promise<Document> {
        const doc = new this.context.model.node(nodeObject)
        await doc.save()
        return doc
    }
    public async findById(nodeId): Promise<Document> {
        return await this.context.model.node.findOne({
            _id: nodeId
        });
    }
}

export default ProduceService
