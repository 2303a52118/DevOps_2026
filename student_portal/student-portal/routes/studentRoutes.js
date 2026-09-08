const express = require("express");

const {
  getStudents,
  updateStudent
} = require("../controllers/studentController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


// GET /students
// Faculty + Admin
router.get(
  "/students",
  authenticate,
  authorize("faculty", "admin"),
  getStudents
);


// PUT /students/:id
// Faculty + Admin
router.put(
  "/students/:id",
  authenticate,
  authorize("faculty", "admin"),
  updateStudent
);


module.exports = router;