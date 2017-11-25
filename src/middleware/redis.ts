import { IConfig } from "config";
import * as util from 'util'
import * as redis from 'ioredis'

function loadRedis(req, res, next) {
    const config: IConfig = req.config

    let client = new redis(config.get("redis.url"))

    Object.assign(req, {
        db: {
            redis: client
        }
    })
    next()
}

export default loadRedis;
