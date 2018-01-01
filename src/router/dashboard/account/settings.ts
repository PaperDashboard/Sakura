export default {
    async post(req, res, next): Promise<void> {
        const user = await req.service.user.updateSettings(
            req.user._id, req.body);

        return res.json({
            status: 'success'
        })
    }
}
