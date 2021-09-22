const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const slugify = require('slugify')
const Exam = require('./exam.model')

const studentSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'a student must have a name'],
         trim: true,
      },
      studentID: {
         type: Number,
         required: [true, 'a student must have an ID'],
         trim: true,
         unique: true,
      },
      currentYear: {
         type: Number,
         required: [true, 'a student must have a year'],
         default: 1,
         enum: [1, 2, 3, 4, 5, 6],
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         unique: true,
         validate: {
            validator: function (v) {
               // eslint-disable-next-line no-useless-escape
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  v
               )
            },
            message: 'Please enter a valid email',
         },
      },
      faculty: {
         type: Schema.Types.ObjectId,
         ref: 'Faculty',
         required: true,
      },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
)

studentSchema.pre('save', function (next) {
   this.slug = slugify(this.name, { lower: true })
   next()
})

studentSchema.virtual('exams', {
   ref: 'Exam',
   localField: '_id',
   foreignField: 'examPaper.student',
})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
