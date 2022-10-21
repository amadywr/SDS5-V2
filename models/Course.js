const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  atar: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Course', CourseSchema)
