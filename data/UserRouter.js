const express = require("express");
const router = express.Router();

const db = require("./helpers/userDb");

router.get("/", (req, res) => {
  db.get()
    .then(User => {
      res.json(User);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

module.exports = router;
