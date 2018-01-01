import * as R from 'co-router'
import * as signup from './signup'
import * as account from './account'
import * as node from './node'
import { Router } from 'express'

const router: Router = R()

router.use('/node', node.default)
router.use('/account', account.default)

router.get('/signup', signup.default.get)

export default router
