const { Router } = require('express');

const authMiddleware = require('../middlewares/auth');

const TargetController = require('./target');

function buildController(app, container, Controller) {
  const controller = new Controller(container);
  const router = new Router();

  Controller.routes.forEach((route) => {
    const middlewares = [];

    if (!route.skipAuth) {
      middlewares.push(authMiddleware);
    }

    router[route.method](route.path, ...middlewares, controller[route.handler].bind(controller));
  });

  app.use(Controller.domain, router);
}

module.exports = (app, container) => {
  buildController(app, container, TargetController);
};
