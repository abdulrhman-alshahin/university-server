const Subject = require('../models/subject.model')
const AppError = require('../util/appError')
const catchAsync = require('../util/catchAsync')

exports.getAllsubject = catchAsync(async (req, res, next) => {
   const subjects = await Subject.find()
   res.json({ subjects })
})

exports.addNewSubject = catchAsync(async (req, res, next) => {
   let subject = { ...req.body }
   subject = await Subject.create(subject)
   res.json({ subject })
})

exports.getSubject = catchAsync(async (req, res, next) => {
   const _id = req.params.sid
   const subject = await Subject.findById(_id)
   if (!subject)
      return next(
         new AppError('no subject found for the prvided id'),
         404
      )
   res.json({ subject })
})

// TODO admin only
exports.editSubject = catchAsync(async (req, res, next) => {
   let _id = req.params.sid
   let { professors, maxTheoreticalMark, isOptional } = { ...req.body }
   let subject = await Subject.findByIdAndUpdate(
      _id,
      { professors, maxTheoreticalMark, isOptional },
      {
         runValidators: true,
      }
   )
   if (!subject)
      return next(
         new AppError('no subject found for the prvided id'),
         404
      )
   res.json({ subject })
})
