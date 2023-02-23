'use strict';


let courses = [
    { id: 1, name: 'Programming 101', level: 100 },
    { id: 2, name: 'Data Structures', level: 200},
    { id: 3, name: 'Algorithms', level: 300}
]


function getCourses() {
    return courses;
}

function getCourse(id) {
    const course = courses.find(c => c.id === parseInt(id));
    return course;
}

function addCourse(name, level) {
    const nextID = getNextID();

    const course = {
        id: nextID.id,
        name: name,
        level: level
    }

    courses.push(course);

    return course;
}

function updateCourse(course) {

    const { id, name, level } = course;  //deconstruct course object.

    const courseToUpdate = courses.find(c => c.id === parseInt(id));

    if (courseToUpdate) {
        courseToUpdate.name = name;
        courseToUpdate.level = level;
    }

    return courseToUpdate;

}

function deleteCourse(id) {
    courses = courses.filter(c => c.id !== parseInt(id));

    return courses;
}

function getNextID() {
    const maxID = courses.reduce((max, obj) => {
        if (obj.id >= max) {
            return obj.id;
        }

    },0);

    return { id: maxID + 1 };
}


module.exports = {
    courses: courses,
    getCourses: getCourses,
    getCourse: getCourse,
    addCourse: addCourse,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse,
    getNextID: getNextID
}
