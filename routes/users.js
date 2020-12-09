var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require('../model/model');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("This route in not protected");
});

router.post("/signup", async (req, res, next) => {
  try {
    const {email,password} = req.body;
    const user = await UserModel.create({ email, password });
  } catch (error) {
    throw new Error(error);
  }
  res.json({
    message: "Signup successful",
    user: req.user,
  });
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
