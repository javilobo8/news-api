const { expect } = require('chai');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const TaskService = require('../../src/services/task/task.service');

describe('TaskService', () => {
  it('should be defined', () => {
    expect(TaskService).to.exist;
  });

  const taskService = new TaskService();

  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('get', () => {
    const baseTask = {
      name: 'Task 1',
      description: 'Task 1',
      cron: '* * * * *',
      active: true,
      startOnCreate: false,
      targets: [
        new models.mongoose.Types.ObjectId(),
      ],
      emails: ['email@email.com'],
    };

    before(() => models.Task.create(baseTask));

    after(() => models.Task.deleteMany());

    it('should return all tasks', async () => {
      const tasks = await taskService.get();
      expect(tasks).to.have.lengthOf(1);

      const task = tasks[0].toObject();
      expect(task.name).to.be.equal(baseTask.name);
      expect(task.description).to.be.equal(baseTask.description);
      expect(task.cron).to.be.equal(baseTask.cron);
      expect(task.active).to.be.equal(baseTask.active);
      expect(task.startOnCreate).to.be.equal(baseTask.startOnCreate);
      expect(task.targets).to.be.eql(baseTask.targets);
      expect(task.emails).to.be.eql(baseTask.emails);
      expect(task.createdAt).to.exist;
      expect(task.updatedAt).to.exist;
    });
  });
});
