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

  getById(taskId) {
    return this.TaskModel.findById(taskId).exec()
      .tap(maybeThrowTaskNotFound);
  }

  deleteById(taskId) {
    return this.getById(taskId)
      .then((task) => task.remove());
  }
}

function maybeThrowTaskNotFound(task) {
  if (!task) {
    throw new Error('Task not found');
  }
}

module.exports = TaskService;
