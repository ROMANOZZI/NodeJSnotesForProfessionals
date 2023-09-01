const express = require("express");
/** 
module.exports = function (options = {}) {
  const router = express.Router();
  router.get("/greet", (req, res, next) => {
    res.end(options.greeting);
  });
  return router;
};
*/
module.exports = function (options = {}) {
  const router = express.Router();
  const { service } = options;
  router.get("/greet", (req, res, next) => {
    res.end(service.createGreeting(req.query.name || "stranger "));
  });
  return router;
};
