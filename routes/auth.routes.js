const { Router, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = Router();

//  /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: "This user already exists " });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User creared" });
  } catch (e) {
    res.status(500).json({ message: "Somethhing went wrong ..." });
  }
});

//  /api/auth/login
router.post("/login", async (req, res) => {});

module.exports = router;
