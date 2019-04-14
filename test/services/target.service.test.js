const { expect } = require('chai');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const TargetService = require('../../src/services/target/target.service');

describe('TargetService', () => {
  it('should be defined', () => {
    expect(TargetService).to.exist;
  });

  const targetService = new TargetService();

  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('create', () => {
    const baseTarget = {
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

    after(() => models.Target.deleteMany());

    it('should create a target', async () => {
      await targetService.create(baseTarget);

      const targets = await models.Target.find();
      const target = targets[0].toObject();
      expect(target.name).to.be.equal(baseTarget.name);
      expect(target.scrapperName).to.be.equal(baseTarget.scrapperName);
      expect(target.description).to.be.equal(baseTarget.description);
      expect(target.tags).to.be.eql(baseTarget.tags);
      expect(target.http).to.be.eql(baseTarget.http);
      expect(target.createdAt).to.exist;
      expect(target.updatedAt).to.exist;
    });
  });

  describe('get', () => {
    const baseTarget = {
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

    before(() => models.Target.create(baseTarget));

    after(() => models.Target.deleteMany());

    it('should return all targets', async () => {
      const targets = await targetService.get();
      expect(targets).to.have.lengthOf(1);

      const target = targets[0].toObject();
      expect(target.name).to.be.equal(baseTarget.name);
      expect(target.scrapperName).to.be.equal(baseTarget.scrapperName);
      expect(target.description).to.be.equal(baseTarget.description);
      expect(target.tags).to.be.eql(baseTarget.tags);
      expect(target.http).to.be.eql(baseTarget.http);
      expect(target.createdAt).to.exist;
      expect(target.updatedAt).to.exist;
    });
  });

  describe('getById', () => {
    const targetId = new models.mongoose.Types.ObjectId();
    const baseTarget = {
      _id: targetId,
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

    before(async () => {
      await models.Target.create(baseTarget);
    });

    after(() => models.Target.deleteMany());

    it('should return one target', async () => {
      const target = await targetService.getById(targetId);
      expect(target._id).to.be.eql(baseTarget._id);
    });

    it('should throw an error if target not found', async () => {
      let error;
      try {
        await targetService.getById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Target not found');
    });
  });

  describe('deleteById', () => {
    const targetId = new models.mongoose.Types.ObjectId();
    const baseTarget = {
      _id: targetId,
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

    before(async () => {
      await models.Target.create(baseTarget);
    });

    after(() => models.Target.deleteMany());

    it('should delete a target', async () => {
      await targetService.deleteById(targetId);

      const targets = await models.Target.find();
      expect(targets).to.have.lengthOf(0);
    });

    it('should throw an error if target not found', async () => {
      let error;
      try {
        await targetService.deleteById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Target not found');
    });
  });
});
