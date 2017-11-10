import { IConfig } from "config";
import * as util from 'util'
import * as redis from 'redis'

util.promisify(redis.RedisClient.prototype)
util.promisify(redis.Multi.prototype)

function loadRedis(req, res, next) {
    const config: IConfig = req.config

    let client = redis.createClient(config.get("redis.port"), config.get("redis.host"))

    if (config.get("redis.auth") && config.get("redis.auth") != "REDIS_AUTH") {
        client.auth(config.get("redis.auth"))
    }

    Object.assign(req, {
        db: {
            redis: client
        }
    })
    next()
}

export default loadRedis;
