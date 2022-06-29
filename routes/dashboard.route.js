const { Router } = require('express');
const { getChartCategory } = require('../controllers/dashboard.controller');
const { verifyLogin } = require('../middlewares/auth.middleware')
const router = Router()

router.get('/category', [getChartCategory])

module.exports = router;