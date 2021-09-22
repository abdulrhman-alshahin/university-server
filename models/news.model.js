const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'news must have a title'],
      trim: true,
   },
   subTitle: {
      type: String,
      trim: true,
   },
   blog: {
      type: String,
      trim: true,
      maxlength: [180, "a blog shuldn't be more then 180 charector"],
   },
   target: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
   },
   date: {
      type: Date,
      default: new Date(),
   },
})

const News = mongoose.model('News', newsSchema)
module.exports = News
