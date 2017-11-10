import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as logger from 'morgan'
import service from './utils/service'
import router from './router'

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
        this.express.use(service)
    }

    private router(): void {
        this.express.use(router)
    }
}

export default new App().express
