import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class TickerLabelModel {
    private static ticketLabelSchema = new mongoose.Schema({
        text: { type: String, required: true },
        color: { type: String, required: true }
    })

    getModel() {
        return mongoose.model('TicketLabels', TickerLabelModel.ticketLabelSchema);
    }
}
