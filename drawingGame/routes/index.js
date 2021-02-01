var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {});
});

router.get('/lobby', function(req, res, next) {
  if (req.query.lobby) {
    res.render('lobby', {lobbyCode: req.query.lobby});
  } else {
    res.redirect(`/lobby?lobby=${"AAAA"}&username=${req.query.username}`);
  }
});

router.get('/test', function(req, res, next) {
  res.render('test', {});
});

module.exports = router;
