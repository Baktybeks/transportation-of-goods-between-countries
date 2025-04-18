const Router = require('express')
const router = new Router()
const countryController = require('../controllers/countryController')

router.post('/', countryController.create)
router.get('/', countryController.getAll)
router.get('/:id', countryController.getOne)
router.delete('/:id', countryController.deleteOne)

module.exports = router
