'use strict';
var express = require('express');
var router = express.Router();

const Joi = require('joi');
const courseData = require('../modules/courses-data');


// Validate course object via npm joi package
function validateCourse(course) {

    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().min(3).required(),
        level: Joi.number().required()
    });

    return schema.validate(course, { abortEarly: false });

}


/* API Home. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});


// GET /api/courses - returns all classes.
router.get('/courses', (req, res) => {
    const courses = courseData.getCourses();

    res.send(courses);
});


// Get Next Id.
router.get('/coursesid', (req, res) => {
    const nextID = courseData.getNextID();

    res.send(nextID);
});


// GET /api/courses/:id -  returns one course by ID.
router.get('/courses/:id', (req, res) => {

    const course = courseData.getCourse(req.params.id);

    if (!course) res.status(404).send(`The course with the id of ${req.params.id} was not found.`);

    res.send(course);
});


// POST /api/courses - Adds a course
router.post('/courses', (req, res) => {

    const course = { id: 0, name: req.body.name, level: req.body.level };


    const { error } = validateCourse(course);
    if (error) return res.status(400).send(error.details.map(obj => obj.message).join(','));  // Join all error messages and return.


    const newCourse = courseData.addCourse(course);

    res.send(newCourse);
});


// PUT /api/courses/:id -  Updates a course
router.put('/courses/:id', (req, res) => {

    const courseToUpdate = { id: parseInt(req.params.id), name: req.body.name, level: req.body.level };

    const idExists = courseData.courses.some(course => course.id === courseToUpdate.id);
    if (!idExists) return res.status(404).send("Warning: Course ID not found. Update canceled!");


    const { error } = validateCourse(courseToUpdate);
    if (error) return res.status(400).send(error.details.map(obj => obj.message).join(',')); // Join all error messages and return.
           

    const course = courseData.updateCourse(courseToUpdate);

    res.send(course);
});


// DELETE /api/courses/:id -  Deletes a course
router.delete('/courses/:id', (req, res) => {

    const idExists = courseData.courses.some(course => course.id === parseInt(req.params.id));
    if (!idExists) return res.status(404).send("Warning: Course ID not found. Delete canceled!");
       
    
    const courses = courseData.deleteCourse(req.params.id);

    res.send(courses);
});


module.exports = router;
