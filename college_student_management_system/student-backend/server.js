const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Rahul", rollNo: "CSE101", branch: "CSE" },
  { id: 2, name: "Priya", rollNo: "CSE102", branch: "CSE" },
];
let nextId = students.length + 1;

function validateStudent(body) {
  body = body || {};
  const fields = ["name", "rollNo", "branch"];
  const student = {};

  for (const field of fields) {
    if (typeof body[field] !== "string" || body[field].trim() === "") {
      return { error: `${field} is required and must be a non-empty string.` };
    }
    student[field] = body[field].trim();
  }

  return { student };
}

app.get("/api/students", (_req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find((item) => item.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }
  return res.json(student);
});

app.post("/api/students", (req, res) => {
  const { student, error } = validateStudent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  if (students.some((item) => item.rollNo.toLowerCase() === student.rollNo.toLowerCase())) {
    return res.status(409).json({ message: "A student with that roll number already exists." });
  }

  const createdStudent = { id: nextId++, ...student };
  students.push(createdStudent);
  return res.status(201).json(createdStudent);
});

app.put("/api/students/:id", (req, res) => {
  const index = students.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Student not found." });
  }

  const { student, error } = validateStudent(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  if (students.some((item) =>
    item.id !== Number(req.params.id) &&
    item.rollNo.toLowerCase() === student.rollNo.toLowerCase()
  )) {
    return res.status(409).json({ message: "A student with that roll number already exists." });
  }

  students[index] = { id: Number(req.params.id), ...student };
  return res.json(students[index]);
});

app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex((item) => item.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Student not found." });
  }

  const [deletedStudent] = students.splice(index, 1);
  return res.json(deletedStudent);
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Request body must contain valid JSON." });
  }
  console.error(err);
  return res.status(500).json({ message: "An unexpected server error occurred." });
});

app.listen(port, () => {
  console.log(`Student API is running at http://localhost:${port}`);
});
