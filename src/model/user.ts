import { Mongoose } from "mongoose";

export default function(mongoose: Mongoose) {
    const userSchema = new mongoose.Schema({
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
        produce: Array,
    })

    return mongoose.model('Users', userSchema);
}
