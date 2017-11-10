import { Document } from "mongoose";
import { IConfig } from "config";

class ProduceService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getInitProduce(): Promise<Document> {
        const config: IConfig = this.context.config
        const traffic: number = config.get("user.initTraffic")

        const produce = new this.context.model.produce({
            traffic,
            level: 0,
            stage: 0,
            used: 0,
        })
        await produce.save()
        return produce
    }
}

export default ProduceService
