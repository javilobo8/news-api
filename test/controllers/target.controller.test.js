const { expect } = require('chai');
const supertest = require('supertest');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const app = require('../../src/app');
// const config = require('../../config');

/* eslint-disable max-len */
// const authentication = [
//   'Authorization',
//   `Basic ${Buffer.from(`${config.authentication.user}:${config.authentication.pass}`).toString('base64')}`,
// ];

describe('TargetController', () => {
  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('GET /target', () => {
    describe('when it runs', () => {
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

      let response;

      before(async () => {
        await models.Target.create(baseTarget);

        response = await supertest(app)
          .get('/target');
      });

      after(() => models.Target.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send all targets', () => {
        expect(response.body).to.have.lengthOf(1);

        const [target] = response.body;
        expect(target.name).to.be.equal(baseTarget.name);
        expect(target.scrapperName).to.be.equal(baseTarget.scrapperName);
        expect(target.description).to.be.equal(baseTarget.description);
        expect(target.tags).to.be.eql(baseTarget.tags);
        expect(target.http).to.be.eql(baseTarget.http);
      });
    });
  });

  describe('GET /target/:targetId', () => {
    describe('when it runs', () => {
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

      let response;

      before(async () => {
        await models.Target.create(baseTarget);

        response = await supertest(app)
          .get(`/target/${targetId}`);
      });

      after(() => models.Target.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send one target', () => {
        const target = response.body;
        expect(target._id).to.be.equal(String(targetId));
      });
    });

    describe('when it fails', () => {
      let response;

      before(async () => {
        response = await supertest(app)
          .get(`/target/${new models.mongoose.Types.ObjectId()}`);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });

  describe('POST /target', () => {
    describe('when it runs', () => {
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

      let response;

      before(async () => {
        response = await supertest(app)
          .post('/target')
          .send(baseTarget);
      });

      after(() => models.Target.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send all targets', () => {
        expect(response.body).to.have.lengthOf(1);

        const [target] = response.body;
        expect(target.name).to.be.equal(baseTarget.name);
        expect(target.scrapperName).to.be.equal(baseTarget.scrapperName);
        expect(target.description).to.be.equal(baseTarget.description);
        expect(target.tags).to.be.eql(baseTarget.tags);
        expect(target.http).to.be.eql(baseTarget.http);
      });
    });

    describe('when it fails', () => {
      const target = {
        description: 'target description',
      };

      let response;

      before(async () => {
        response = await supertest(app)
          .post('/target')
          .send(target);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });

  describe('DELETE /target/:targetId', () => {
    describe('when it runs', () => {
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

      let response;

      before(async () => {
        await models.Target.create(baseTarget);

        response = await supertest(app)
          .delete(`/target/${targetId}`);
      });

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should response targets left', () => {
        const targets = response.body;
        expect(targets).to.have.lengthOf(0);
      });
    });

    describe('when it fails', () => {
      let response;

      before(async () => {
        response = await supertest(app)
          .delete(`/target/${new models.mongoose.Types.ObjectId()}`);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });
});
