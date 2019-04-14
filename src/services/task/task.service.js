const models = require('../../models');

class TaskService {
  constructor() {
    this.TaskModel = models.Task;
  }

  create(task) {
    return new this.TaskModel(task).save();
  }

  get(filter = {}) {
    return this.TaskModel.find(filter);
  }
}

module.exports = TaskService;
