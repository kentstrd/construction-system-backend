module.exports = {
  development: {
    port: 3000, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/construction-system',
    logs: 'dev'
  },
  production: {
    port: 4000, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/construction-system',
    logs: 'combined'
  },
  test: {
    port: 4202, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/construction-system',
    logs: 'dev'
  }
};
