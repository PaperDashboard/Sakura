import { isNull, isUndefined } from "util";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default {
    async post(req, res, next) {
        const { email, password, username, code } = req.body;
        if (!EMAIL_REGEX.test(email)) {
            return res.status(403).json({
                "status": "error",
                "error": "email address is invalid"
            });
        }

        if (username.length <= 3) {
            return res.status(403).json({
                "status": "error",
                "error": "username is too short"
            })
        }

        if (password.length <= 6) {
            return res.status(403).json({
                "status": "error",
                "error": "password is too short"
            })
        }

        const codeItem = await req.service.invite.getByCode(code)
        if (isNull(codeItem)) {
            return res.status(401).json({
                "status": "error",
                "error": "Invalid invite code"
            })
        }

        if (codeItem.used) {
            return res.status(403).json({
                "status": "error",
                "error": "Invite code is used"
            })
        }
        try {
            const user = await req.service.user.register(req.body)
        } catch (error) {
            if (!isUndefined(error.name) && error.name === 'ValidationError') {
                return res.status(409).json({
                    "status": "error",
                    "error": "DuplicateKey",
                    "message": error.errors
                })
            }
            return res.status(400).json({
                "status": "error",
                "error": error.message
            })
        }

        await req.service.invite.use(codeItem)
        res.status(204).send();
    }
}
