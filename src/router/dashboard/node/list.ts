import { Document } from "mongoose";

export default {
    async get(req, res, next) {
        const user = req.user;
        const nodeService = req.service.node
        const nodes: Array<Document> = (await nodeService.getUserAvailAble(user._id)).map(async node => {
            const n = Object.assign({}, node._doc)
            n.link = await nodeService.getLink(node._id, user._id);
            return n
        });

        await res.status(200).send({
            status: 'success',
            nodes: await Promise.all(nodes)
        })
    }
}
