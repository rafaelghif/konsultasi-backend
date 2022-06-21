const { Router } = require('express')
const { authentication, addUser, getUsers, updateUser } = require('../controllers/user.controller')
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.post('/auth', [authentication])
router.get('/', [verifyLogin, getUsers])
router.post('/', [verifyLogin, addUser])
router.post('/register', [addUser])
router.put('/', [verifyLogin, updateUser])

module.exports = router