import * as R from 'co-router'
import { Router } from 'express'
import * as node from './node'

const router: Router = R()

router.use((req: any, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    if (!req.user.isAdmin) {
        return res.status(403).send({
            status: 'error',
            message: 'User no permission'
        })
    } else {
        next()
    }
})

router.use('/node', node.default)

export default router
