const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  // user not exist
  if (!user) res.json({ error: "User Doesn't Exist!" });

  // compare hash value
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Password!" });

    res.json("Login Success!");
  });
});

module.exports = router;
