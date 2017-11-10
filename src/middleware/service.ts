import * as fs from 'async-file'
import * as path from 'path'

function loadSerice(req, res, next): void {
    req.service = {}
    const serviceDir = path.resolve(__dirname + "/../service");
    const files = fs.readdir(serviceDir).then(files => {
        for (const item of files) {
            const service = require(serviceDir + "/" + path.parse(item).name).default
            Object.assign(req.service, {
                [path.parse(item).name]: new service(req)
            })
        }
        next()
    }).catch(err => console.log(err));
}

export default loadSerice;
