const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something Went Wrong!" });
  }
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  post.username = username;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED!");
});

module.exports = router;
