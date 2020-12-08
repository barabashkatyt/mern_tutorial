const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config/default.json");
const User = require("../models/User");
const router = Router();

//  /api/auth/register
router.post(
  "/register",
  [
    check("email", "Wrong email").isEmail(),
    check("password", "Min password length is 6 symbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      console.log("Body:", req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Not correct data for registration",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists " });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await user.save();
      const user = new User({ email: email, password: hashedPassword });
      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Somethhing went wrong ..." });
    }
  }
);

//  /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Not correct data for login",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "No such user" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Somethhing went wrong ..." });
    }
  }
);

module.exports = router;
