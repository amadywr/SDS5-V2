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
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Course', CourseSchema)
