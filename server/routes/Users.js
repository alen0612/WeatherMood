const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await Users.findOne({
    where: { username: username },
  });

  if (checkUser) {
    res.status(401);
    res.json({ error: "Username has already been created!" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json("SUCCESS");
    });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  // user not exist
  if (!user) {
    res.status(401);
    res.json({ error: "User Doesn't Exist!" });
  }

  // compare hash value
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.status(402);
      res.json({ error: "Wrong Username and Password!" });
    }

    res.json("Login Success!");
  });
});

module.exports = router;
