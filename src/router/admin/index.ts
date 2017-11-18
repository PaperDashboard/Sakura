import * as R from 'co-router'
import { Router } from 'express'
import * as node from './node'

const router: Router = R()

router.use('/node', node.default)

export default router
