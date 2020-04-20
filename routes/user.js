const { authJwt } = require("../middleware");
const controller = require("../controller/user");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
      "/api/test/operator_pemukiman",
      [authJwt.verifyToken, authJwt.isOperatorPermukiman],
      controller.operatorPemukimanBoard
  );

  app.get(
      "/api/test/operator_pertamanan",
      [authJwt.verifyToken, authJwt.isOperatorTaman],
      controller.operatorTamanBoard
  );

  app.get(
      "/api/test/operator_perumahan",
      [authJwt.verifyToken, authJwt.isOperatorRumah],
      controller.operatorRumahBoard
  );

  app.get(
      "/api/test/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
  );
};
