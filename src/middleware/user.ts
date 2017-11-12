import { isUndefined } from "util";

const URL_REGEX = /^\/auth\/(login|register)/;

function getUser(req, res, next) {
    if (!isUndefined(req.headers["x-user-token"])
        && (!URL_REGEX.test(req.path))) {
        const reqKey = req.headers["x-user-token"]
        req.service.user.getFromToken(reqKey).then(user => {
            req.user = user
            req.reqKey = reqKey
            next()
        }).catch(error => {
            res.status(401).json({
                "status": "error",
                "error": error.message
            })
        })
    } else {
        next()
    }
}

export default getUser;
