export default {
    async post(req, res, next) {
        try {
            const node = await req.service.node.create(req.body);
            res.json({
                status: 'success',
                node
            })
        } catch (err) {
            res.status(409).json({
                status: 'error',
                error: err.message
            })
        }
    }
}
