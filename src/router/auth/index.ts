import * as R from 'co-router'
import * as register from './register'
import * as login from './login'
import { Router } from 'express';

const router: Router = R()

router.post("/register", register.default.post)
router.post("/login", login.default.post)

export default router
