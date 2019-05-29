const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./users/users-router.js");
const classroomsRouter = require("./classrooms/classroom-router.js");
const accountsRouter = require("./accounts/account-router.js");
const { errorHandler } = require("./errorHandler.js");
// const { protected } = require("./auth/auth.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
// server.use("/api/classrooms", protected, classroomsRouter);
server.use("/api/classrooms", classroomsRouter);
server.use("/api/accounts", accountsRouter);

server.use(errorHandler);

server.get("/", (req, res) => {
  res.send("It's alive 🔥");
});

module.exports = server;
