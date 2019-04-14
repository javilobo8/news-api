const models = require('../../models');

class TaskService {
  constructor() {
    this.TaskModel = models.Task;
  }

  get(filter = {}) {
    return this.TaskModel.find(filter);
  }
}

module.exports = TaskService;
