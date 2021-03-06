import * as mongoose from 'mongoose'
import config from '../config'
class MongoServer {
    public static mongo: mongoose.Connection
    public static loaded: boolean
    constructor() {
        mongoose.connect(config.get("mongo.url"), {
            useMongoClient: true,
            promiseLibrary: global.Promise
        })
        const mongo = mongoose.connection
        MongoServer.loaded = false
        mongo.once('open', () => {
            MongoServer.loaded = true
            MongoServer.mongo = mongo
        })
    }
}

new MongoServer()

function loadMongo(req, res, next) {
    if (MongoServer.loaded) {
        Object.assign(req, { db: { mongo: MongoServer.mongo } })
        next()
    } else {
        const tick = () => {
            setTimeout(() => {
                if (!MongoServer.loaded) {
                    tick()
                } else {
                    Object.assign(req, { db: { mongo: MongoServer.mongo } })
                    next()
                }
            }, 1)
        }
        tick()
    }
}

export default loadMongo
