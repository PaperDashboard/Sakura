import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class TicketModel {
    private static STATE = {
        OPEN       : 0b0000,
        CLOSED     : 0b0001,
        LOCKED     : 0b0010,
        NEED_REPLY : 0b0100,
    }

    private static ticketSchema = new mongoose.Schema({
        creater: { type: mongoose.Schema.Types.ObjectId, required: true },
        tigger: Array,
        messages: Array,
        labels: Array,
        status: { type: Number, required: true, default: TicketModel.STATE.OPEN }
    })

    getModel() {
        const model = mongoose.model('Tickets', TicketModel.ticketSchema);
        model['STATE'] = TicketModel.STATE
        return model
    }
}
