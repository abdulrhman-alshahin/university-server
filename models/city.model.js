const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
   city: {
      name: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, 'a student must be on a city'],
      },
      universities: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University',
            required: true,
         },
      ],
   },
})

const City = mongoose.model('City', citySchema)

module.exports = City
