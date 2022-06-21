const { Router } = require('express')
const { addPakar, getPakars } = require('../controllers/pakar.controller')
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/', [getPakars])
router.post('/', [verifyLogin, addPakar])

module.exports = router;