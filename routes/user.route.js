const { Router } = require('express')
const { authentication } = require('../controllers/user.controller')
const router = Router()

router.post('/auth', [authentication])

module.exports = router