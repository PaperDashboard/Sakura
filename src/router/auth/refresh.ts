export default {
    async get(req, res, next) {
        let token = req.headers["x-user-token"]
        try {
            const user = await req.service.session.get(token)
            await req.service.session.destory(token)
            token = await req.service.session.create(user)
            res.json({
                "status": "success",
                "token": token
            })
        } catch (err) {
            res.status(401).json({
                "status": "error",
                "error": err.message
            })
        }
    }
}
