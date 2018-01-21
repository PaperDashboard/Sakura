export default {
    async post(req, res, next) {
        const { title, context } = req.body;
        const ticket = await req.service.ticket.create(req.user, title, context)

        return res.json({
            status: 'success',
            ticket
        })
    }
}
