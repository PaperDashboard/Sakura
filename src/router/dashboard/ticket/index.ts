import * as R from 'co-router'
import * as create from './create'

const router: Router = R()

router.post('/create', create.default.post)

export default router
