export default {
    async get(req, res, next) {
        const codes = await req.service.invite.getPublicCode()

        res.json({
            status: "success",
            codes
        })
    }
}
