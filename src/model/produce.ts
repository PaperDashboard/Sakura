import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class ProduceModel {
    private static produceSchema = new mongoose.Schema({
        traffic: { type: Number, defalut: 0, required: true },
        level: { type: Number, default: 0, required: true },
        used: { type: Number, defalut: 0, required: true },
        stage: { type: Number, required: true },
        enabled: { type: Boolean, default: true, required: true },
        cycle: { type: Number, default: -1 },
        default: { type: Boolean, default: false, required: true }
    })

    getModel() {
        return mongoose.model('Produces', ProduceModel.produceSchema);
    }
}

export default new ProduceModel()
