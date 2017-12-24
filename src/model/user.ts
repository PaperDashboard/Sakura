import { Mongoose } from "mongoose";
import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

class UserModel {
    private static userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        invite: mongoose.Schema.Types.ObjectId,
        inviteNumber: { type: Number, default: 0 },
        join: { type: Date, required: true, default: Date.now },
        lastSignup: Date,
        isAdmin: { type: Boolean, default: false },

        port: { type: Number, required: true },
        linkPassword: { type: String, required: true },
        method: { type: String, required: true, default: 'rc4-md5' },
        protocol: { type: String, required: true, default: 'auth_chain_a' },
        obfs: { type: String, required: true, default: 'tls1.2_ticket_auth' },
        product: Array,
    })

    getModel() {
        UserModel.userSchema.plugin(uniqueValidator)
        return mongoose.model('Users', UserModel.userSchema);
    }
}

export default new UserModel()
