import * as R from 'co-router'
import * as auth from './auth'
import { Router } from 'express';

const router: Router = R()

router.get("/", async (req: any, res, next) => {
    const users = await req.model.user.find()
    res.send(users)
})

router.post("/auth", auth.default)

export default router
