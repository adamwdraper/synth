module.exports = function() {
  var config;

  switch(process.env.NODE_ENV) {
    case 'production':
      config = {
        env: 'production',
        isProduction: true,
        static: 'dist',
        requirejs: {
          main: '/javascripts/libraries/require/configs/build.js'
        }
      };
      break;
    case 'development':
    default:
      config = {
        env: 'development',
        isProduction: false,
        static: 'src',
        requirejs: {
          main: '/javascripts/libraries/require/configs/dev.js'
        }
      };
  }

  return config;
};