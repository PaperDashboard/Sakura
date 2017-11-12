import * as R from 'co-router'
import * as signup from './signup'
import { Router } from 'express'

const router: Router = R()

router.get('/signup', signup.default.get)

export default router
