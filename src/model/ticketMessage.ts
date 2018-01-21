import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class TickerMessageModel {
    private static ticketMessageSchema = new mongoose.Schema({
        creater: { type: mongoose.Schema.Types.ObjectId, required: true },
        context: { type: String, required: true, default: "" },
        lastEdit: { type: Date, required: false }
    })

    getModel() {
        return mongoose.model('TickerMessage', TickerMessageModel.ticketMessageSchema);
    }
}

export default new TickerMessageModel()
