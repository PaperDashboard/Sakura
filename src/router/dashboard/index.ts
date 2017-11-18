import * as R from 'co-router'
import * as signup from './signup'
import * as invite from './invite'
import { Router } from 'express'

const router: Router = R()

router.get('/signup', signup.default.get)
router.get('/invite', invite.default.get)

router.post('/invite', invite.default.post)
export default router
