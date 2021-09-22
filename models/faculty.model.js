const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'a student must have a faculty name'],
   },
   subjects: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Subject',
      },
   ],
})

const Faculty = mongoose.model('Faculty', facultySchema)
module.exports = Faculty
