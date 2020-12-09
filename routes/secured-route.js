var express = require("express");
var router = express.Router();

router.get("/profile", (req, res, next) => {
  res.json({
    message: "This is a secret route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.get('/', function(req, res, next) {
  res.send('This route is a protected route');
});

module.exports = router;
