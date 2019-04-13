const ErrorHandler = require('../../utils/error-handler');

class TargetController {
  constructor({ services }) {
    this.targetService = services.targetService;

    this.errorHandler = new ErrorHandler(this.constructor.name, { logging: true });
  }

  listTargets(req, res) {
    this.targetService.get()
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  getTarget(req, res) {
    this.targetService.getById(req.params.targetId)
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  addTarget(req, res) {
    this.targetService.create(req.body)
      .then(() => this.targetService.get())
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  deleteTarget(req, res) {
    this.targetService.deleteById(req.params.targetId)
      .then(() => this.targetService.get())
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }
}

TargetController.domain = '/target';
TargetController.routes = [
  {
    method: 'get',
    path: '/',
    handler: 'listTargets',
    skipAuth: true,
  },
  {
    method: 'get',
    path: '/:targetId',
    handler: 'getTarget',
    skipAuth: true,
  },
  {
    method: 'post',
    path: '/',
    handler: 'addTarget',
    skipAuth: true,
  },
  {
    method: 'delete',
    path: '/:targetId',
    handler: 'deleteTarget',
    skipAuth: true,
  },
];

module.exports = TargetController;
