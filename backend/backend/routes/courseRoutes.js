const express = require('express')
const router = express.Router()
const {getCourses, setCourse, updateCourse, deleteCourse, getCourseByCode} = require('../controller/courseController')

router.get('/', getCourses)

router.post('/',setCourse) 

router.get('/:course_id',getCourseByCode)

router.put('/:course_id', updateCourse)

router.delete('/:course_id', deleteCourse)



module.exports = router