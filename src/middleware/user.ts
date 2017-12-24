import { isUndefined, isNull } from "util";

const URL_REGEX = /^\/auth\/(login|register|code)/;

function getUser(req, res, next) {
    const reqKey = req.headers["x-user-token"]
    if ((!isUndefined(reqKey)) && (!isNull(reqKey))
        && (!URL_REGEX.test(req.path))) {
        req.service.user.findFromToken(reqKey).then(user => {
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
