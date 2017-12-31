import * as R from 'co-router'
import * as signup from './signup'
import * as invite from './account/invite'
import * as node from './node'
import { Router } from 'express'

const router: Router = R()

router.use('/node', node.default)

router.get('/signup', signup.default.get)
router.get('/invite', invite.default.get)

router.post('/invite', invite.default.post)
export default router
