const express = require("express");

const {
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/adminController");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();


// Admin → View all users
router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getUsers
);


// Admin → Update user
router.put(
  "/users/:id",
  authenticate,
  authorize("admin"),
  updateUser
);


// Admin → Delete user
router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  deleteUser
);


module.exports = router;