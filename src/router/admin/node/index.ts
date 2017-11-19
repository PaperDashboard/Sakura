import * as R from 'co-router'
import { Router } from 'express'
import * as list from './list'
import * as create from './create'

const router: Router = R()

router.get('/list', list.default.get)

router.post('/create', create.default.post)

export default router
