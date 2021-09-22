const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const examDateSchema = new mongoose.Schema({
   subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'exam should be for a subject'],
   },
   date: {
      type: Schema.Types.Date,
      required: true,
   },
})
const ExamDates = mongoose.model('ExamDates', examDateSchema)

module.exports = ExamDates
