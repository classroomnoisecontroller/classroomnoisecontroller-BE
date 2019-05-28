const router = require("express").Router();
const Accounts = require("./accounts-model.js");

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.get();
    console.log(accounts);
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
