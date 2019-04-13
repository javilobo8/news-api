module.exports = {
  port: 8000,

  authentication: {
    user: 'test-user',
    pass: 'test-random-password',
  },

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/news',
  },
};
