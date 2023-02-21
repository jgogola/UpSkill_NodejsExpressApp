'use strict';
var express = require('express');
var router = express.Router();

const coursesAPI = require('../modules/courses-api');




/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/courses', (req, res) => {
    const courses = coursesAPI.getCourses();

    res.send(courses);
});

router.get('/coursesid', (req, res) => {
    const nextID = coursesAPI.getNextID();

    res.send(nextID);
});

router.get('/courses/:id', (req, res) => {

    const course = coursesAPI.getCourse(req.params.id);

    if (!course) res.status(404).send(`The course with the id of ${req.params.id} was not found.`);

    res.send(course);
});

router.post('/courses', (req, res) => {
    const course = coursesAPI.addCourse(req.body.name);

    res.send(course);
});

router.put('/courses/', (req, res) => {

    const courses = coursesAPI.updateCourse(req.body.id, req.body.name);

    res.send(courses);
});

router.delete('/courses/:id', (req, res) => {

    const courses = coursesAPI.deleteCourse(req.params.id);

    res.send(courses);
});


module.exports = router;
