const Student = require('../models/student.model')
const AppError = require('../util/appError')
const catchAsync = require('../util/catchAsync')

exports.getAllstudents = catchAsync(async (req, res, next) => {
   const students = await Student.find({
      currentYear: req.params.yid,
   }).select('name')
   res.json({ numberOfResults: students.length, students })
})

exports.login = catchAsync(async (req, res, next) => {
   const { body } = req
   const { id } = body
   const student = await Student.find({ studentID: id })
   if (!student) return next(new AppError('404', 'sad'))
   res.json({ student })
})

exports.addNewStudent = catchAsync(async (req, res, next) => {
   let newStudent = { ...req.body }
   const student = await Student.create(newStudent)
   res.json({ student })
})

exports.getStudent = catchAsync(async (req, res, next) => {
   let studentID = req.params.stid
   const _student = await Student.findOne({ studentID }).populate({
      path: 'exams',
   })

   if (!_student)
      return next(
         new AppError('no student found for the prvided id'),
         404
      )
   const { _id } = _student

   _student.exams = _student.exams.map(({ examPaper, subject }) => ({
      papers: examPaper
         .filter(({ student }) => {
            return _id.toString() == student.toString()
         })
         .map(({ practicalMark, theoreticalMark }) => ({
            practicalMark,
            theoreticalMark,
         })),
      subject,
   }))
   res.json({ student: _student })
})

exports.editStudent = catchAsync(async (req, res, next) => {
   let _id = req.params.stid
   let { email, slug } = { ...req.body }
   let student = await Student.findByIdAndUpdate(
      _id,
      { email, slug },
      { runValidators: true }
   )
   if (!student)
      return next(
         new AppError('no student found for the prvided id'),
         404
      )
   res.json({ student })
})
