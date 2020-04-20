const db = require("../models/index");
const ROLES = db.ROLES;
const User = db.users;

const checkDuplicateNik = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      nik: req.body.nik
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "GAGAL, NIK sudah digunakan!"
      });
      return;
    }
      next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateNik: checkDuplicateNik,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
