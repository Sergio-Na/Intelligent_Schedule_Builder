const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')

// @desc Get courses
// @route GET /api/courses
// @access Public 
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find()
    res.status(200).json(courses)
})


// @desc Get course info with course code 
// @route GET /api/course/course_id
// @access Public
const getCourseByCode = asyncHandler(async (req, res) => {
    Course.findOne({ course_id : req.params.course_id}, function(err, result){
        if(err) {
            res.status(400)
            throw new Error('Course not found, identifier must be in format comp-123')
        }else{
            res.status(200).json(result)
            
        }
    })
})

// @desc Set course
// @route POST /api/courses
// @access Private 
const setCourse = asyncHandler(async (req, res) => {
    if(!req.body.course_id){
        console.log(req.body)
        res.status(400)
        throw new Error('please add a text field')
    }

    const course = await Course.create({
        course_id: req.body.course_id,
        course_title: req.body.course_title,
        credits: req.body.credits,
        faculty: req.body.faculty,
        overview: req.body.overview,
        terms: req.body.terms,
        instructors: req.body.instructors,
        prerequisites: req.body.prerequisites,
        corequisites: req.body.corequisites
    })
    res.status(200).json(course)
})


// @desc Update course
// @route PUT /api/courses/:course_id
// @access Private 
const updateCourse = asyncHandler(async (req, res) => {
    Course.findOne({ course_id : req.params.course_id}, async function(err, result){
        if(err) {
            res.status(400)
            throw new Error('Course not found, identifier must be in format comp-123')
        }else{
            const updatedCourse = await Course.findByIdAndUpdate(result._id, req.body, {new:true})
            res.status(200).json(updatedCourse)
            
        }
    })
})

// @desc delete goal
// @route DELETE /api/courses/:course_id
// @access Private 
const deleteCourse = asyncHandler(async (req, res) => {
    Course.findOne({ course_id : req.params.course_id}, async function(err, result){
        if(err) {
            res.status(400)
            throw new Error('Course not found, identifier must be in format comp-123')
        }else{
            const course = await Course.findById(result._id, req.body, {new:true})
            course.remove()
            res.status(200).json(course)
            
        }
    })
})



module.exports = {
    getCourses,
    setCourse,
    updateCourse,
    deleteCourse,
    getCourseByCode,
}