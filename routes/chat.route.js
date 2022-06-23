const { Router } = require('express');
const { getChats } = require('../controllers/chat.controller');
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/getChat/userId/:userId/userIdPakar/:userIdPakar', [verifyLogin, getChats])

module.exports = router;