const express = require('express')

const newsControllers = require('../controllers/news.controllers')

const router = express.Router()

router
   .route('/')
   .get(newsControllers.getNews)
   .post(newsControllers.addNews)

router
   .route('/:nid')
   .get(newsControllers.getNew)
   .delete(newsControllers.deleteNew)
   .patch(newsControllers.editNew)

module.exports = router
