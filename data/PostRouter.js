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

module.exports = router;
