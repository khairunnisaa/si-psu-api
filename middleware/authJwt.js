const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isOperatorRumah = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "operator_perumahan") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Operator Perumahan Role!"
      });
    });
  });
};

const isOperatorTaman = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "operator_pertamanan") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Operator Pertamanan Role!"
      });
    });
  });
};

const isOperatorPermukiman = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "operator_pemukiman") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Operator Pemukiman Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isOperatorTaman: isOperatorTaman,
  isOperatorRumah : isOperatorRumah,
  isOperatorPermukiman : isOperatorPermukiman,
};
module.exports = authJwt;
