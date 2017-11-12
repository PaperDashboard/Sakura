import * as R from 'co-router'
import * as auth from './auth'
import * as dashboard from './dashboard'
import { Router } from 'express';

const router: Router = R()

router.get("/", async (req: any, res, next) => {
    const users = await req.service.invite.getByCode("878f485e-7c95-48fd-b766-4deee38fae7b")
    // console.log(req.service)
    res.send(users)
})

router.use('/auth', auth.default)
router.use('/dashboard', dashboard.default)

export default router
