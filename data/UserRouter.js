const express = require("express");
const router = express.Router();

const db = require("./helpers/userDb");
const upperCase = require("../middleware/Uppercase");

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

router.get("/:id", (req, res) => {
  const UserId = req.params.id;
  db.getById(UserId)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.post("/", upperCase, (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide name for the post."
    });
  } else {
    db.insert({ name })
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
  const userId = req.params.id;
  db.remove(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.end();
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put("/:id", upperCase, (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  if (!updateUser.name) {
    res.status(400).json({
      errorMessage: "Please provide name for the user."
    });
  } else {
    db.update(userId, updateUser)
      .then(post => {
        if (!post) {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "The user information could not be modified."
        });
      });
  }
});

module.exports = router;
