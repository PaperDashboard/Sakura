import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class ProduceModel {
    private static userSchema = new mongoose.Schema({
        traffic: { type: Number, defalut: 0, required: true },
        level: { type: Number, default: 0, required: true },
        used: { type: Number, defalut: 0, required: true },
        stage: { type: Number, required: true },
        enabled: { type: Boolean, default: true, required: true },
        cycle: { type: Number, default: -1 },
    })

    getModel() {
        return mongoose.model('Produces', ProduceModel.userSchema);
    }
}

export default new ProduceModel()