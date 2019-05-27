const router = require("express").Router();
const Users = require("./users-model.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../auth/auth.js");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.getFullById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/classrooms", async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.id);
    const user = await Users.getById(user_id);
    const userClassrooms = await Users.getClassroomsByUser(user_id);
    console.log(user);
    if (user) {
      const data = { ...user, classrooms: userClassrooms };
      res.status(200).json(data);
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 10);
    const user = await Users.insert(creds);
    const token = generateToken(user);
    res.status(201).json({ id: user.id, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ id: user.id, token });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
