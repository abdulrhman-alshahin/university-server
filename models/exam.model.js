const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const examPaperSchema = new mongoose.Schema({
   student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
   },
   practicalMark: {
      type: Number,
      required: true,
   },
   theoreticalMark: {
      type: Number,
      required: true,
   },
})

const examSchema = new mongoose.Schema(
   {
      examPaper: [examPaperSchema],
      subject: {
         type: Schema.Types.ObjectId,
         ref: 'Subject',
         required: [true, 'exam should be for a subject'],
      },
      examDate: {
         type: Date,
      },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
)

examSchema.pre(/find/, function () {
   this.populate({
      path: 'subject',
      select: 'name year semester',
   })
})

const Exam = mongoose.model('Exam', examSchema)
const ExamPaper = mongoose.model('ExamPaper', examPaperSchema)

module.exports.ExamPaper = ExamPaper

module.exports = Exam
