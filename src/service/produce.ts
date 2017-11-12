import { Document, Error } from "mongoose";
import { IConfig } from "config";

class ProduceService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getById(produceId): Promise<Document> {
        return await this.context.model.produce.findById(produceId)
    }

    public async getInitProduce(): Promise<Document> {
        const config: IConfig = this.context.config
        const traffic: number = config.get("user.initTraffic")

        const produce = new this.context.model.produce({
            traffic,
            level: 0,
            stage: 0,
            used: 0,
            default: true
        })
        await produce.save()
        return produce
    }

    public async addTraffic(produceId, traffic: number): Promise<void> {
        const produce = await this.getById(produceId);
        produce["traffic"] += traffic;
        await produce.save()
    }

    public async findDeafultProduce(producesId: Array<string>): Promise<string> {
        for (const produceId of producesId) {
            const produce = await this.getById(produceId);
            if (produce["default"]) {
                return produceId;
            }
        }
        throw new Error("No default produce found")
    }
}

export default ProduceService
