import * as R from 'co-router'
import { Router } from 'express'
import * as list from './list'
import * as create from './create'
import * as info from './info'

const router: Router = R()

router.get('/list', list.default.get)
router.get('/info/:id', info.default.get)

router.post('/create', create.default.post)

router.delete('/:id', info.default.delete)
router.put('/:id', info.default.put)


export default router
