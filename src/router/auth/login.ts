export default {
    async post(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await req.service.user.login(email, password)
            const userToken = await req.service.session.create(user._id)
            return res.json({
                "status": "suceess",
                "token": userToken
            })
        } catch (error) {
            return res.status(401).json({
                "status": "error",
                "error": error.message
            })
        }
    }
}
