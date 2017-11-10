import * as fs from 'async-file'
import * as path from 'path'

function loadModel(req, res, next): void {
    const modelDir = path.resolve(__dirname + "/../model");
    const files = fs.readdir(modelDir).then(files => {
        for (const item of files) {
            const model = require(modelDir + "/" + path.parse(item).name)
            Object.assign(req, {
                model: {
                    [path.parse(item).name]: model["default"].getModel()
                }
            })
        }
        next()
    }).catch(err => console.log(err));
}

export default loadModel;
