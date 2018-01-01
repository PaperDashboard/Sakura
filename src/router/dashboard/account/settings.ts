export default {
    async post(req, res, next): Promise<void> {
        const query = req.body;
        const user = await req.service.user.findById(req.user._id);
        for (const item in query) {
            user[item] = query[item]
        }
        await user.save()
        return res.json({
            status: 'success'
        })
    }
}
