var express  = require('express');
var userView = require(__dirname + '/../views/userView');

var User = require(__dirname + '/../models/user');

var app = module.exports = express.createServer();

app.get('/?:username', function (req, res, next) {
  var username = req.params.username;

  User.getPublicUserProfileByName(username, function (err, user) {
    if (err) throw err;

    res.json(userView.formatUserObject(user));
  });
});

app.get('/?:username/info', function (req, res, next) {
  var username = req.params.username;

  User.getUserInfo(username, function (err, user) {
    if (err) throw err;

    res.json(user);
  });
});

app.post('/users/:username', function (req, res, next) {
  var username = req.params.username,
      body = req.body;

  User.createNewUserByName(username, body, function (err, response) {
    if (err) throw err;

    res.json(response);
  });
});
