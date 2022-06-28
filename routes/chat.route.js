const { Router } = require('express');
const { getChats, getUserList } = require('../controllers/chat.controller');
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/getChat/userId/:userId/userIdPakar/:userIdPakar', [verifyLogin, getChats])
router.get('/getUserList/userId/:userId', [verifyLogin, getUserList])

module.exports = router;