import { isUndefined } from "util";

const URL_REGEX = /^\/auth\/(login|register)/;

function getUser(req, res, next) {
    if (!isUndefined(req.headers["x-user-token"])
        && (!URL_REGEX.test(req.path))) {
        req.service.user.getFromToken(req.headers["x-user-token"]).then(user => {
            req.user = user
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
