var revManifest = require('./rev-manifest.json');

module.exports = function(config) {
  return {
    get: function(path) {
      var key;
      var versionedPath;
      
      // only change if we are getting files from dist
      if (config.static !== 'dist') {
        return path;
      }

      versionedPath = revManifest[path[0] === '/' ? path.substr(1) : path];

      return versionedPath ? '/' + versionedPath : path;
    }
  };
};