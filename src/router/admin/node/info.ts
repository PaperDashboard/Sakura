import { isNull } from "util";
import { makeError } from "../../../utils/error";

export default {
    async get(req, res, next) {
        const nodeId = req.params.id;
        try {
            const node = await req.service.node.findById(nodeId);
            if (isNull(node)) {
                throw makeError("Node is not found", 404)
            }
            res.json({
                status: 'success',
                node
            })
        } catch (e) {
            next(e)
        }
    },
    async delete(req, res, next) {
        const nodeId = req.params.id;
        req.service.node.destory(nodeId);
        res.status(204).send();
    },
    async put(req, res, next) {
        const nodeId = req.params.id;
        await req.service.node.upadte(nodeId, req.body)
        res.status(204).send();
    }
}
