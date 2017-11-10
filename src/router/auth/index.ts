import * as R from 'co-router'
import * as register from './register'
import { Router } from 'express';

const router: Router = R()

router.post("/register", register.default.post)

export default router
