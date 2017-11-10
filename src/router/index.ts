import * as Router from 'co-router'

const router = Router()

router.get("/", async (req, res, next) => {
    res.send(req.service.user.sayHello())
})

export default router;
