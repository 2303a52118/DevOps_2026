const express = require("express");

const {
  register,
  login,
  getProfile
} = require("../controllers/authController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

console.log("register:", typeof register);
console.log("login:", typeof login);
console.log("getProfile:", typeof getProfile);
console.log("authenticate:", typeof authenticate);

// POST /register
router.post("/register", register);

// POST /login
router.post("/login", login);

// GET /profile
router.get("/profile", authenticate, getProfile);

module.exports = router;