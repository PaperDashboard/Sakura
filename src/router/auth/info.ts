import { isUndefined } from "util";

export default {
    async get(req, res, next) {
        if (isUndefined(req.user)) {
            return res.status(401).json({
                status: "error",
                error: "Unauthorized"
            })
        }
        const traffic = await req.service.user.getTrafficDetail(req.user._id);

        const user = { ...req.user._doc };
        Object.assign(user, {
            traffic
        })
        return res.status(200).send(user);
    }
}
