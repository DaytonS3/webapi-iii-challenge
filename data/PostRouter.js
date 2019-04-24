const express = require("express");
const router = express.Router();

const db = require("./helpers/postDb");

router.get("/", (req, res) => {
  db.get()
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/:id", (req, res) => {
  const PostId = req.params.id;
  db.getById(PostId)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const { text } = req.body;
  const { user_id } = req.body;
  console.log(text, user_id);
  if (!text || !user_id) {
    res.status(400).json({
      errorMessage: "Please provide text and user_id for the post."
    });
  } else {
    db.insert({ text, user_id })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  db.remove(postId)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.end();
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;
