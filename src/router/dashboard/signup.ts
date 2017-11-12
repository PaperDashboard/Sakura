export default {
    async get(req, res, next) {
        try {
            const traffic = await req.service.user.signup(req.user._id);
            res.json({
                status: "success",
                traffic
            })
        } catch (err) {
            res.status(403).json({
                status: "error",
                error: err.message
            })
        }
    }
}
