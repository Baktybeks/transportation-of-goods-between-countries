const Router = require('express')
const router = new Router()
const countryRouter = require('./countryRouter')
const applicationRouter = require('./applicationRouter')
const userRouter = require('./userRouter')

router.use('/country', countryRouter)
router.use('/application', applicationRouter)
router.use('/user', userRouter)



module.exports = router
