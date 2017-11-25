import { Mongoose } from "mongoose"
import * as mongoose from 'mongoose'

class InviteModel {
    private static inviteSchema = new mongoose.Schema({
        code: { type: String, required: true, unique: true },
        used: { type: Boolean, required: true, default: false },
        date: { type: Date, required: true, default: Date.now },
        owner: { type: mongoose.Schema.Types.ObjectId, required: false },
    })

    getModel() {
        return mongoose.model('Codes', InviteModel.inviteSchema);
    }
}

export default new InviteModel()
