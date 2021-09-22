const express = require('express')
// const responseController = require('../controllers/response.controller');

const studentControllers = require('../controllers/student.controllers')

const router = express.Router()

router.post('/', studentControllers.addNewStudent) // admin only

// router.post('/login', studentControllers.login)

// router.get('/year/:yid', studentControllers.getAllstudents) // students

router
   .route('/:stid')
   .get(studentControllers.getStudent)
   .patch(studentControllers.editStudent) // edit my profile info

module.exports = router
