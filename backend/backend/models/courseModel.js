const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
    {
        course_id: {
          type: String,
          unique: true
        },
        course_title: {
          type: String,
          required: [true, 'Please add a course title']
        },
        credits: {
          type: String,
          required: [true, 'Please add credits field']
        },
        faculty: {
            type: String,
            required: [true, 'Please add faculty']
        },
        overview: {
            type: String,
            required: [true, 'Please add course overview']
        },
        terms: {
          type: [String],
          required: [true, 'Please add terms']
        },
        instructors: {
          type: [String],
          required: [true, "Please add instructors"]
        },
        prerequisites: {
          type: [String],
          required: [true, "Please add prerequisites"]
        },
        corequisites: {
          type: Array,
          required: [true, "Please add corequisites"]
        }
      },
      { collection: 'Course Information'}
)


module.exports = mongoose.model("Course", courseSchema)