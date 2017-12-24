import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class NodeModel {
    public static KIND: Object = {
        SHADOWSOCKS: 0x00,
        ANYCONNECT: 0x01,
    }

    private static nodeSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        kind: { type: Number, required: true, default: 0 },
        address: { type: String, required: true },
        onlySignalPort: { type: Boolean, defalut: false },
        rate: { type: Number, required: true, default: 1 },
        level: { type: Number, default: 0 },
        enable: { type: Boolean, default: true },
        state: { type: Number, default: 0, required: true },
        detail: String,
        port: Number,
        used: { type: Number, default: 0 },
        signalPort: Array
    })

    getModel() {
        const model: any = mongoose.model('Nodes', NodeModel.nodeSchema);
        model.KIND_LIST = NodeModel.KIND;
        return model
    }
}

export default new NodeModel()
