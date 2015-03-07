var config = {
  noAPI: {
    API  : 'http://localhost:8888/',
    mode : 'dev-local',
    port : 4000
  },
  dev: {
    API  : 'http://paraisapi:8453/',
    mode : 'dev',
    port : 4000
  },
  production: {
    API  : 'http://paraisapi:8888/',
    mode : 'production'
  }
};

module.exports = function ( mode ) {
  return config[ mode || process.argv[ 2 ] || 'dev' ] || config.dev;
};
