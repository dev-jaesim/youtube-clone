const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/userModel");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userInfo,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).send(err);

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "No matched email found",
      });
    }

    user.comparePassword(req.body.password, (err, isMatched) => {
      if (err) return res.status(400).send(err);

      if (!isMatched) {
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

module.exports = router;
