export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  saltOrRounds: process.env.SALT || 10,
  database: {
    host: process.env.MONGO_URL,
  },
  google: {
    oauth: {
      id: process.env.OAUTH_ID || '1',
      secret: process.env.OAUTH_SECRET || 'googlesecret',
      redirecturl: `http://localhost:3001/auth/google/redirect`,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwtsecret',
    expiresin: process.env.JWT_EXPIRES_IN || '1d',
  },
});
