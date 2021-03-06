import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class ProductModel {
    private static productSchema = new mongoose.Schema({
        traffic: { type: Number, defalut: 0, required: true },
        level: { type: Number, default: 0, required: true },
        used: { type: Number, defalut: 0, required: true },
        stage: { type: Number, required: true },
        enabled: { type: Boolean, default: true, required: true },
        cycle: { type: Number, default: -1 },
        default: { type: Boolean, default: false, required: true },
        name: { type: String, default: "", required: true }
    })

    getModel() {
        return mongoose.model('Products', ProductModel.productSchema);
    }
}

export default new ProductModel()
