'use strict';


let courses = [
    { id: 1, name: 'course A' },
    { id: 2, name: 'course B' },
    { id: 3, name: 'course C' }
]


function getCourses() {
    return courses;
}

function getCourse(id) {
    const course = courses.find(c => c.id === parseInt(id));
    return course;
}

function addCourse(name) {
    const nextID = getNextID();

    const course = {
        id: nextID.id,
        name: name
    }

    courses.push(course);

    return course;
}

function updateCourse(id, name) {
    const courseToUpdate = courses.find(c => c.id === parseInt(id));
    if (courseToUpdate) {
        courseToUpdate.name = name;
    }

    return courses;

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
    getCourses: getCourses,
    getCourse: getCourse,
    addCourse: addCourse,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse,
    getNextID: getNextID
}
