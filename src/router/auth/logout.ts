import { isUndefined } from "util";

export default {
    async get(req, res, next) {
        if (!isUndefined(req.user)) {
            await req.service.session.destory(req.reqKey)
        }
        return res.status(204).send()
    }
}
