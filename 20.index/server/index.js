const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const app = new express()

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET')
})

app.get('/getTeachers', function (req, res) {
  const teacherData = JSON.parse(readFileSync(resolve(__dirname, './data/teacher.json'), 'utf-8'));
  res.send(teacherData);
})

app.get('/getStudents', function (req, res) {
  const studentData = JSON.parse(readFileSync(resolve(__dirname, './data/student.json'), 'utf-8'));
  res.send(studentData);
})

app.listen(8888, function () {
  console.log("Welcome to use Express!")
})
