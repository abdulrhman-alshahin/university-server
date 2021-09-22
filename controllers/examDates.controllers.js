const ExamDates = require('../models/examDates.model')
const AppError = require('../util/appError')
const catchAsync = require('../util/catchAsync')

exports.getAllExamDates = catchAsync(async (req, res, next) => {
   const dates = await ExamDates.find().populate({
      path: 'subject',
      select: 'year semester name',
   })
   res.json({ dates })
})

exports.addNewExamDate = catchAsync(async (req, res, next) => {
   let dates = { ...req.body }
   dates = await ExamDates.create(dates)
   res.json({ dates })
})
