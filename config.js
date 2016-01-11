module.exports = function() {
  var config;

  switch(process.env.NODE_ENV) {
    case 'production':
      config = {
        env: 'production',
        isProduction: true,
        static: 'dist',
        requirejs: {
          src: '/javascripts/build/libraries/require/require.js',
          main: '/javascripts/build/libraries/require/configs/build'
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
          src: '/javascripts/libraries/require/require.js',
          main: '/javascripts/libraries/require/configs/dev'
        }
      };
  }

  return config;
};