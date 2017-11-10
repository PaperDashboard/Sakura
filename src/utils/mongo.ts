import * as mongoose from 'mongoose'
import { IConfig } from 'config';

function loadMongo(req, res, next) {
    const config: IConfig = req.config;
    mongoose.connect(config.get("mongo.url"), {
        useMongoClient: true
    })
    const mongo = mongoose.connection

    mongo.once('open', () => {
        Object.assign(req, { db: { mongo } })
        next()
    })
}

export default loadMongo
