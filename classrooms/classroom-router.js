const router = require("express").Router();
const Classrooms = require("./classrooms-model.js");
const accountDb = require("../accounts/accounts-model.js");
const { protected } = require("../auth/auth.js");

router.get("/", async (req, res, next) => {
  console.log(req.decodedToken.subject);
  try {
    const id = req.decodedToken.subject;
    const classrooms = await Classrooms.get(id);
    res.status(200).json(classrooms);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const classroom = await Classrooms.getById(id);
    if (classroom) {
      res.status(200).json(classroom);
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/", protected, async (req, res, next) => {
  try {
    const { classroom_name, score, highest_score } = req.body;
    if (classroom_name) {
      const id = req.decodedToken.subject;
      const classroom = await Classrooms.insert(req.body);
      await accountDb.insert({
        classroom_id: classroom,
        user_id: id
      });
      res.status(201).json(classroom);
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", protected, async (req, res, next) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const update = await Classrooms.update(id, change);
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", protected, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Classrooms.remove(id);
    if (deleted) {
      res.status(200).json({ msg: "delete success" });
    } else {
      next({ code: 404 });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
