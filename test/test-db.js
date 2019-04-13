const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = (models) => {
  const mongod = new MongoMemoryServer();

  return {
    connect: async () => {
      const connectionString = await mongod.getConnectionString('test');
      await models.connect(connectionString);
    },
    disconnect: async () => {
      await models.disconnect();
      await mongod.stop();
    },
  };
};
