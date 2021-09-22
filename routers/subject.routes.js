const express = require('express')

const subjectControllers = require('../controllers/subject.controllers')

const router = express.Router()

router
   .route('/')
   .get(subjectControllers.getAllsubject)
   .post(subjectControllers.addNewSubject) // admin only

router
   .route('/:sid')
   .get(subjectControllers.getSubject)
   .patch(subjectControllers.editSubject) // admin only
 
//  .delete(subjectControllers.deleteSubject)

module.exports = router
