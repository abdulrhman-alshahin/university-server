const mongoose = require('mongoose')

const universitySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'a student must have a university name'],
   },
   faculties: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Faculty',
         required: true,
      },
   ],
})

const University = mongoose.model('University', universitySchema)
module.exports = University
