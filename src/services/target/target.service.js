const models = require('../../models');

class TargetService {
  constructor() {
    this.TargetModel = models.Target;
  }

  create(target) {
    return new this.TargetModel(target).save();
  }

  get(filter = {}) {
    return this.TargetModel.find(filter);
  }

  getById(targetId) {
    return this.TargetModel.findById(targetId).exec()
      .tap(maybeThrowTargetNotFound);
  }

  deleteById(targetId) {
    return this.getById(targetId)
      .then((target) => target.remove());
  }
}

function maybeThrowTargetNotFound(target) {
  if (!target) {
    throw new Error('Target not found');
  }
}

module.exports = TargetService;
