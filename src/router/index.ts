import * as R from 'co-router'
import * as auth from './auth'
import * as dashboard from './dashboard'
import { Router } from 'express';

const router: Router = R()

router.get("/", async (req: any, res, next) => {
    // await req.service.invite.createPublicCode()
    res.json({
        meta: {
            version: '0.0.0-develop',
            ping: true
        }
    })
})

router.use('/auth', auth.default)
router.use('/dashboard', dashboard.default)

export default router
