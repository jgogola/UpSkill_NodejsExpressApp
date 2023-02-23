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

function addCourse(course) {

    course.id = getNextID().id;

    courses.push(course);

    return course;
}

function updateCourse(course) {

    const { id, name, level } = course;  //destruct course object.

    const courseToUpdate = courses.find(c => c.id === parseInt(id));

    if (courseToUpdate) {
        courseToUpdate.name = name;
        courseToUpdate.level = level;
    }

    return courseToUpdate;

}

function deleteCourse(id) {
    //courses = courses.filter(c => c.id !== parseInt(id));

    const index = courses.findIndex(course => course.id === parseInt(id));

    if (index !== -1) { 
        courses.splice(index, 1);
    }

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
