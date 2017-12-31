import { Document } from "mongoose";

export default {
    async get(req, res, next) {
        const codes = await req.service.invite.getUserCode(req.user._id);
        res.json({
            status: 'success',
            codes
        })
    },
    async post(req, res, next) {
        const codes: Array<Document> = [];
        for(let i = 0; i < req.user.inviteNumber; i++) {
            const thisCode = await req.service.invite.createCodeForUser(req.user._id)
            codes.push(thisCode)
        }
        req.user.inviteNumber = 0
        await req.user.save()
        res.json({
            status: 'success',
            codes
        })
    }
}
