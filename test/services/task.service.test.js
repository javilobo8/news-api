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

  describe('create', () => {
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

    after(() => models.Task.deleteMany());

    it('should create a task', async () => {
      await taskService.create(baseTask);

      const tasks = await models.Task.find();
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

  describe('getWithTargets', () => {
    const targetId1 = new models.mongoose.Types.ObjectId();
    const targetId2 = new models.mongoose.Types.ObjectId();

    const baseTarget1 = {
      _id: targetId1,
      name: 'target 1',
      scrapperName: 'scrapper name',
      description: 'description 1',
      tags: ['news', 'games'],
      http: {
        client: models.Target.HttpClients.AXIOS,
        clientOptions: {
          maxRetries: 10,
          timeout: 20,
          waitPageLoad: 3000,
        },
        host: 'http://some-url.com',
        path: '/test',
        method: 'get',
        params: {
          param1: '1',
          param2: '2',
        },
        body: {
          field1: '1',
          field2: '2',
        },
      },
    };

    const baseTarget2 = {
      _id: targetId2,
      name: 'target 2',
      scrapperName: 'scrapper name',
      description: 'description 2',
      tags: ['news', 'games'],
      http: {
        client: models.Target.HttpClients.PUPPETEER,
        clientOptions: {
          maxRetries: 10,
          timeout: 20,
          waitPageLoad: 3000,
        },
        host: 'http://some-url.com',
        path: '/test',
        method: 'get',
        params: {
          param1: '1',
          param2: '2',
        },
        body: {
          field1: '1',
          field2: '2',
        },
      },
    };

    const baseTask = {
      name: 'Task 1',
      description: 'Task 1',
      cron: '* * * * *',
      active: true,
      startOnCreate: false,
      targets: [
        targetId1,
        targetId2,
      ],
      emails: ['email@email.com'],
    };

    before(() => Promise.all([
      models.Target.create(baseTarget1),
      models.Target.create(baseTarget2),
      models.Task.create(baseTask),
    ]));

    after(() => Promise.all([
      models.Target.deleteMany(),
      models.Task.deleteMany(),
    ]));

    it('should return all tasks with populated targets', async () => {
      const tasks = await taskService.getWithTargets();
      expect(tasks).to.have.lengthOf(1);

      const task = tasks[0].toObject();
      expect(task.name).to.be.equal(baseTask.name);
      expect(task.description).to.be.equal(baseTask.description);
      expect(task.cron).to.be.equal(baseTask.cron);
      expect(task.active).to.be.equal(baseTask.active);
      expect(task.startOnCreate).to.be.equal(baseTask.startOnCreate);
      expect(task.emails).to.be.eql(baseTask.emails);
      expect(task.createdAt).to.exist;
      expect(task.updatedAt).to.exist;

      const target1 = task.targets[0];
      expect(target1._id).to.be.eql(targetId1);

      const target2 = task.targets[1];
      expect(target2._id).to.be.eql(targetId2);
    });
  });

  describe('getById', () => {
    const taskId = new models.mongoose.Types.ObjectId();
    const baseTask = {
      _id: taskId,
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

    before(async () => {
      await models.Task.create(baseTask);
    });

    after(() => models.Task.deleteMany());

    it('should return one task', async () => {
      const task = await taskService.getById(taskId);
      expect(task._id).to.be.eql(baseTask._id);
    });

    it('should throw an error if task not found', async () => {
      let error;
      try {
        await taskService.getById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Task not found');
    });
  });

  describe('deleteById', () => {
    const taskId = new models.mongoose.Types.ObjectId();
    const baseTask = {
      _id: taskId,
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

    before(async () => {
      await models.Task.create(baseTask);
    });

    after(() => models.Task.deleteMany());

    it('should delete a task', async () => {
      await taskService.deleteById(taskId);

      const tasks = await models.Task.find();
      expect(tasks).to.have.lengthOf(0);
    });

    it('should throw an error if task not found', async () => {
      let error;
      try {
        await taskService.deleteById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Task not found');
    });
  });
});
