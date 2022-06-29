const { Router } = require('express')
const { getQuestion, addQuestion, getQuestionType, getQuestionUser, answerQuestion, checkUserAlreadyAnswer } = require('../controllers/question.controller')
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/', [getQuestion])
router.get('/user', [getQuestionUser])
router.get('/questionType', [getQuestionType])
router.post('/', [verifyLogin, addQuestion])
router.post('/answer', [verifyLogin, answerQuestion])
router.get("/alreadyAnswer/UserId/:UserId", [verifyLogin, checkUserAlreadyAnswer])

module.exports = router;