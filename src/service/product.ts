import { Document, Error } from "mongoose";
import { IConfig } from "config";

class ProductService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async findById(productId): Promise<Document> {
        return await this.context.model.product.findById(productId)
    }

    public async getInitProduct(): Promise<Document> {
        const config: IConfig = this.context.config
        const traffic: number = config.get("user.initTraffic")

        const product = new this.context.model.product({
            traffic,
            level: 0,
            stage: 0,
            used: 0,
            default: true,
            name: "Default Product"
        })
        await product.save()
        return product
    }

    public async addTraffic(productId, traffic: number): Promise<void> {
        const product = await this.findById(productId);
        product["traffic"] += traffic;
        await product.save()
    }

    public async findDeafultProduct(productsId: Array<string>): Promise<string> {
        for (const productId of productsId) {
            const product = await this.findById(productId);
            if (product["default"]) {
                return productId;
            }
        }
        throw new Error("No default product found")
    }
}

export default ProductService
