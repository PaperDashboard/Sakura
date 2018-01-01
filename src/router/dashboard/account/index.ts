import * as R from 'co-router'
import { Router } from 'express'
import * as invite from './invite'
import * as settings from './settings'

const router: Router = R()

router.get('/invite', invite.default.get)
router.post('/invite', invite.default.post)

router.post('/settings', settings.default.post)

export default router
