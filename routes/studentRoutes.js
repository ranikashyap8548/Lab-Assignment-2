const express = require("express");
const router = express.Router();
let students = require("../data/students");

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }
  res.status(200).json(student);
});

router.post("/", (req, res) => {
  const { name, course } = req.body;
  if (!name || !course) {
    return res.status(400).json({ message: "Name and Course are required" });
  }
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student Not Found" });
  }
  const { name, course } = req.body;
  if (!name || !course) {
    return res.status(400).json({ message: "Name and Course are required" });
  }
  student.name = name;
  student.course = course;
  res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }
  const deleted = students.splice(index, 1);
  res.status(200).json({ message: "Student Deleted", student: deleted[0] });
});

module.exports = router;