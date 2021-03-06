import * as R from 'co-router'
import * as register from './register'
import * as login from './login'
import * as info from './info'
import * as refresh from './refresh'
import * as code from './code'
import * as logout from './logout'
import { Router } from 'express'

const router: Router = R()

router.post("/register", register.default.post)
router.post("/login", login.default.post)

router.get('/getInfo', info.default.get)
router.get('/refresh', refresh.default.get)
router.get('/logout', logout.default.get)
router.get('/code', code.default.get)

export default router
