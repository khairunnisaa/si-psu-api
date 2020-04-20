var express = require('express');
var router = express.Router();
const model = require('../models/index');
const Role = model.roles;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
