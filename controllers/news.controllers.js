const News = require('../models/news.model')
const Student = require('../models/student.model')
const emailController = require('../util/emailHandler')
const catchAsync = require('../util/catchAsync')
const AppError = require('../util/appError')

exports.addNews = catchAsync(async (req, res, next) => {
   let news = { ...req.body }
   let targetedStudents = {}
   let targetedEmails = []
   //news = await News.create(news)
   news.target
      ? (targetedStudents = Student.find({ currentYear: news.target }))
      : (targetedStudents = Student.find())
   targetedStudents = await targetedStudents.select('email')
   targetedStudents.forEach(({ email }) => {
      targetedEmails.push(email)
   })
   targetedEmails = targetedEmails.join(', ')
   emailController(targetedEmails, news)
   next()
})

exports.getNews = catchAsync(async (req, res, next) => {
   let news
   news = await News.find()
   res.json({ news })
})

exports.getNew = catchAsync(async (req, res, next) => {
   let _id = req.params.nid
   const news = await News.findById(_id)
   if (!news)
      return next(new AppError('no news found for the prvided id'), 404)
   res.json({ news })
})

exports.editNew = catchAsync(async (req, res, next) => {
   let _id = req.params.nid
   let news = await News.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
         runValidators: true,
         new: true,
      }
   )
   if (!news)
      return next(new AppError('no news found for the prvided id'), 404)
   res.json({ news })
})

exports.deleteNew = catchAsync(async (req, res, next) => {
   let _id = req.params.nid
   const news = await News.findByIdAndDelete(_id)
   if (!news)
      return next(new AppError('no news found for the prvided id'), 404)
   res.json({ status: 'done' })
})
