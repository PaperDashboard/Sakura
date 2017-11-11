import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as logger from 'morgan'
import service from './middleware/service'
import model from './middleware/model'
import redis from './middleware/redis'
import mongo from './middleware/mongo'
import user from './middleware/user'
import cors from './middleware/cors'
import router from './router'
import config from './config'

class App {
    public express: express.Application;

    constructor() {
        this.express = express()
        this.middleware()
        this.router()
    }

    private middleware(): void {
        this.express.use(
            logger('[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')
        )
        this.express.use(cookieParser())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))

        /**
         *
         * Custom middleware load stage
         * stage0 -> Load config
         * stage1 -> Init database
         * stage2 -> Load model
         * stage3 -> Load service
         * stage4 -> Fetch user (if set X-User-Token)
         *
         */
        this.express.use(cors)

        this.express.use(function (req, res, next) {
            Object.assign(req, { config })
            next();
        })

        this.express.use(mongo)
        this.express.use(redis)
        this.express.use(model)

        this.express.use(service)
        this.express.use(user)
    }

    private router(): void {
        this.express.use(router)
    }
}

export default new App().express
