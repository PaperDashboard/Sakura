import { IConfig } from "config";
import * as util from 'util'
import * as redis from 'ioredis'
import config from '../config'
import { Redis } from "ioredis";

class RedisServer{
    public static redis: Redis
    constructor() {
        RedisServer.redis = new redis(config.get("redis.url"))
    }
}

new RedisServer()

function loadRedis(req, res, next) {
    Object.assign(req, {
        db: {
            redis: RedisServer.redis
        }
    })
    next()
}

export default loadRedis;
