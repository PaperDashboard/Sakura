import * as Router from 'co-router'

const router = Router()

router.get("/", async (req, res, next) => {
    const users = await req.model.user.find()
    res.send(users)
})

export default router
