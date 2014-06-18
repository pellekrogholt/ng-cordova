angular.module('ngCordova.plugins.network', [])

  // todo: probably move to a more central spot - or get ridth of it ?
  .factory('Cordova', ['$q', '$ionicPlatform', function ($q, $ionicPlatform) {
      var q = $q.defer();
      if (window.navigator) {
        q.resolve(window.navigator);
      } else {
        // #60 ensure device is 100% ready
        $ionicPlatform.ready(q.resolve(navigator));
      }
      return {
        navigator: function() {
          return q.promise;
        }
      };
    }])


  .factory('$cordovaNetwork', ['$q', 'Cordova', function ($q, Cordova) {

    var cordovaNetwork = {

      getNetwork: function () {
        var q = $q.defer();
        Cordova.navigator().then(function(navigator) {
          q.resolve(navigator.connection.type)
        });
        
        return q.promise;
      },

      isOnline: function () {
        var q = $q.defer();
        cordovaNetwork.getNetwork().then(function (networkState) {
          q.resolve(networkState !== Connection.UNKNOWN && networkState !== Connection.NONE);
        });
        
        return q.promise;
      },

      isOffline: function () {
        var q = $q.defer();
        cordovaNetwork.getNetwork().then(function (networkState) {
          q.resolve(networkState === Connection.UNKNOWN || networkState === Connection.NONE);
        });

        return q.promise;                        
      }
    }

    return cordovaNetwork;
    
}]);
