const Exam = require('../models/exam.model')
const AppError = require('../util/appError')
const catchAsync = require('../util/catchAsync')
const crud = require('./crud.controller')

exports.getStudentExams = catchAsync(async (req, res, next) => {
   const student = req.params.stid
   const exam = await Exam.find({})
   if (!exam)
      return next(
         new AppError('no student  found for the prvided id'),
         404
      )
   res.json({ exam })
})

exports.addStudentExam = catchAsync(async (req, res, next) => {
   const exam = { ...req.body }
   let student = req.params.stid
   exam = await Exam.create({ ...exam, student })
   if (!exam)
      return next(
         new AppError('no student found for the prvided id'),
         404
      )
   res.json({ exam })
})

exports.getAllExams = crud.findAllWithPopulate({
   Model: Exam,
   name: 'exams',
   populate: [
      {
         path: 'subject',
         select: 'name year maxTheoreticalMark semester',
      },
      {
         path: 'examPaper.student',
         select: 'name studentID',
      },
   ],
})
exports.addExam = crud.createOne({ Model: Exam, name: 'exams' })
