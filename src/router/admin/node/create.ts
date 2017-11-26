import { HTTPError } from "../../../utils/error";

export default {
    async post(req, res, next) {
        try {
            const node = await req.service.node.create(req.body);
            res.json({
                status: 'success',
                node
            })
        } catch (err: HTTPError) {
            err.status = 409
            next(err)
        }
    }
}
