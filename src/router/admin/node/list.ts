export default {
    async get(req, res, next) {
        const nodes = await req.service.node.getAllNodes()
        res.json({
            'status': 'success',
            nodes
        })
    }
}
