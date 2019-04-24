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

module.exports = router;
