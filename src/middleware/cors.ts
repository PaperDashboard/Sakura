function addCorsHeader(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-User-Token, X-Requested-With, Content-Type, Accept");
    next()
}

export default addCorsHeader
