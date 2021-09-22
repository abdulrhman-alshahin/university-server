const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'a subject must have a name'],
      },
      year: {
         type: Number,
         required: true,
         enum: [1, 2, 3, 4, 5, 6],
      },
      semester: {
         type: Number,
         required: true,
         enum: [1, 2],
      },
      professors: [
         {
            type: String,
            required: [true, 'a subject must have a professor'],
         },
      ],
      maxTheoreticalMark: {
         type: Number,
         required: true,
         enum: [70, 80, 100],
         default: 70,
      },
      isOptional:{
         type: Boolean,
         default :false,
      }
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
)
SubjectSchema.virtual('maxPracticalMark').get(function () {
   return 100 - this.maxTheoreticalMark
})

const Subject = mongoose.model('Subject', SubjectSchema)
module.exports = Subject
