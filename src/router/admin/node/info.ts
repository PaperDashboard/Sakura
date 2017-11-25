import { isNull } from "util";

export default {
    async get(req, res, next) {
        const nodeId = req.params.id;
        try {
            const node = await req.service.node.findById(nodeId);
            if (isNull(node)) {
                throw new Error("Node is not found")
            }
            res.json({
                status: 'success',
                node
            })
        } catch (e) {
            res.status(404).json({
                status: 'error',
                error: e.message
            })
        }
    },
    async delete(req, res, next) {
        const nodeId = req.params.id;
        req.service.node.destory(nodeId);
        res.status(204).send();
    }
}
