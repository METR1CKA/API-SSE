const express = require('express')

const router = express.Router()

const { streamTime } = require('../controllers/timeController')

router.get('/', streamTime)

module.exports = router
