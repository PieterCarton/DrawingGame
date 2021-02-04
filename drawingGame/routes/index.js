var express = require('express');
var router = express.Router();
const lobbyManager = require("../lobbyManager");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {});
});

router.get('/lobby', function(req, res, next) {
  if (req.query.lobby) {
    if (lobbyManager.lobbyExists(req.query.lobby)) {
      res.render('lobby', {lobbyCode: req.query.lobby});
    } else {
      res.redirect('/');
    }
  } else {
    if (req.query.username) {
      let code = lobbyManager.createLobby();
      if (code == false) {
        res.render('home', {});
        return;
      };
      res.redirect(`/lobby?lobby=${code}&username=${req.query.username}`);
    } else {
      let code = lobbyManager.createLobby();
      if (code == false) {
        res.redirect('/');
      };
      res.redirect(`/lobby?lobby=${code}`);
    }
  }
});

router.get('/test', function(req, res, next) {
  res.render('test', {});
});

module.exports = router;
