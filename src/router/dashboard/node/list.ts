export default {
    async get(req, res, next) {
        const user = req.user;
        const nodes = await req.service.node.getUserAvailAble(user._id);
        res.status(200).send({
            status: 'success',
            nodes
        })
    }
}
