import { isUndefined } from "util";

export default {
    async get(req, res, next) {
        if (isUndefined(req.user)) {
            return res.status(401).json({
                status: "error",
                error: "Unauthorized"
            })
        } else {
            return res.status(200).send(req.user);
        }
    }
}
