export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    host: process.env.MONGO_URL,
  },
  google: {
    oauth: {
      id: '1',
      secret: 'googlesecret',
      redirecturl: 'localhost',
    },
  },
  jwt: {
    secret: 'jwtsecret',
    expiresin: '1d',
  },
});
