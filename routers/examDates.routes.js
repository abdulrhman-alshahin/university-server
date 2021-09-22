const express = require('express')
const examDatesControllers = require('../controllers/examDates.controllers')

const router = express.Router()

router
   .route('/')
   .get(examDatesControllers.getAllExamDates)
   .post(examDatesControllers.addNewExamDate)

module.exports = router
