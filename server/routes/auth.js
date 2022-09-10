const express = require("express");
const router = express.Router();
const User = require("../models/User");
const _ = require("lodash"); // ???? buscar
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Login Route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email, password });
  if (!user) return res.status(400).send("Invalid email or password");

  const jwtData = { _id: user._id, name: user.name };
  const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });

  res.status(200).send(token);
});

module.exports = router;
