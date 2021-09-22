const express = require('express')

const examControllers = require('../controllers/exam.controllers')

const router = express.Router()

router
   .route('/')
   .get(examControllers.getAllExams)
   .post(examControllers.addExam)

router
   .route('/:stid')
   .get(examControllers.getStudentExams)
   .post(examControllers.addStudentExam)

module.exports = router
