const User = require("../models/users");
const ClaimHistory = require("../models/claimHistory");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//  Add a new user
const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
};

//  Claim points
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1; // 1 to 10

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += points;
    await user.save();

    const history = new ClaimHistory({ userId, points });
    await history.save();

    res.json({ message: "Points claimed", user, points });
  } catch (err) {
    res.status(500).json({ error: "Failed to claim points" });
  }
};

//  Leaderboard (sorted users)
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to get leaderboard" });
  }
};

// 📜 Claim History
const getHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to get history" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  claimPoints,
  getLeaderboard,
  getHistory,
};
