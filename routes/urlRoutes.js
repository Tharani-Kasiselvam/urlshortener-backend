const express = require('express')

const urlshortController = require('../controllers/urlshortController')

const router = express.Router()

router.put('/:urlId',urlshortController.accessShortUrl)
router.post('/short',urlshortController.generateShortUrl)

//export router
module.exports = router