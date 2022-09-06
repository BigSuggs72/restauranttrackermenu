const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')

// add controllers
router.get('/', indexController.getHome)
router.post('/q', indexController.getSearch)

const { ensureAuth, ensureGuest } = require('../middleware/auth')


module.exports = router