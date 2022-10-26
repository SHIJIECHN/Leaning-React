const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const app = new express()

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    next();
})

app.get('/getTeachers', function (req, res) {
    const teacherData = JSON.parse(readFileSync(resolve(__dirname, './data/teacher.json'), 'utf-8'));
    res.send(teacherData);
})

app.get('/getStudents', function (req, res) {
    const studentData = JSON.parse(readFileSync(resolve(__dirname, './data/student.json'), 'utf-8'));
    res.send(studentData);
})

app.get('/v2/get_course_fields', function (req, res) {
    const courseFieldsData = JSON.parse(readFileSync(resolve(__dirname, './data/course_fields.json')));
    res.send({
        result: courseFieldsData,
        code: 200
    });
})
app.get('/v2/get_courses/all', function (req, res) {
    const courseData = JSON.parse(readFileSync(resolve(__dirname, './data/course_all.json')));
    res.send({
        result: courseData,
        code: 200
    });
})

app.listen(8888, function () {
    console.log("Welcome to use Express!")
});