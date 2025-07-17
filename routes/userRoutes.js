const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
} = require("../controllers/userController");


//  Get all users
router.get("/users", getAllUsers);

// Add a new user
router.post("/users", addUser);

// Claim random points for a user
router.post("/claim", claimPoints);

// Leaderboard
router.get("/leaderboard", getLeaderboard);

// Claim history
router.get("/history", getHistory);




module.exports = router;
