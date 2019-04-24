const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const postsRoutes = require("./data/PostRouter");
const usersRoutes = require("./data/UserRouter");

server.use(express.json());
server.use(morgan("Dev"));
server.use(helmet());
server.use(cors());

// routes - users
server.use("/users", usersRoutes);
// routes - posts
server.use("/posts", postsRoutes);

module.exports = server;
