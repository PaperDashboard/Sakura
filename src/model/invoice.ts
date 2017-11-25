import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class InvoiceModel {
    public static STATUS = {
        CREATED: 0x00,
        VALUED: 0x01,
        SUCCESS: 0x02,
    }

    private static invoiceSchema = new mongoose.Schema({
        triger: { type: mongoose.Schema.Types.ObjectId, required: true },
        amount: { type: Number, required: true },
        status: { type: Number, required: true, default: InvoiceModel.STATUS.CREATED },
        orederId: String,
        date: { type: Date, required: true, default: Date.now },
    })

    getModel() {
        return mongoose.model('Invoice', InvoiceModel.invoiceSchema);
    }
}

export default new InvoiceModel()
