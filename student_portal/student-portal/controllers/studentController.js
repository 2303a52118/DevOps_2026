const User = require("../models/User");

// GET STUDENTS
const getStudents = async (req, res) => {
  try {

    const students = await User.find({
      role: "student"
    }).select("-password");

    res.status(200).json({
      success: true,
      count: students.length,
      students
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};


// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      email,
      department
    } = req.body;

    const student = await User.findOne({
      userId: id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    if (name) {
      student.name = name;
    }

    if (email) {
      student.email = email;
    }

    if (department) {
      student.department = department;
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: {
        userId: student.userId,
        name: student.name,
        email: student.email,
        role: student.role,
        department: student.department
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};


module.exports = {
  getStudents,
  updateStudent
};