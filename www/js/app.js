// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.appLin', {
        url: '/appLin',
        views: {
          'menuContent': {
            templateUrl: 'templates/appLin.html'
          }
        }
      })
      .state('app.lin_sfz', {
        url: '/lin_sfz',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_sfz.html'
          }
        }
      })
      .state('app.lin_szt', {
        url: '/lin_szt',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_szt.html'
          }
        }
      })
      .state('app.lin_xz', {
        url: '/lin_xz',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_xz.html'
          }
        }
      })
      .state('app.lin_xzpd', {
        url: '/lin_xzpd',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_xzpd.html'
          }
        }
      })
      .state('app.lin_sjgsd', {
        url: '/lin_sjgsd',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_sjgsd.html'
          }
        }
      })
      .state('app.lin_cp', {
        url: '/lin_cp',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_cp.html'
          }
        }
      })
      .state('app.lin_ysyx', {
        url: '/lin_ysyx',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_ysyx.html'
          }
        }
      })
      .state('app.lin_cy', {
        url: '/lin_cy',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_cy.html'
          }
        }
      })
      .state('app.lin_zgjm', {
        url: '/lin_zgjm',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_zgjm.html'
          }
        }
      }).state('app.lin_hl', {
        url: '/lin_hl',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_hl.html'
          }
        }
      })
      .state('app.lin_gx', {
        url: '/lin_gx',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_gx.html'
          }
        }
      })
      .state('app.lin_tq', {
        url: '/lin_tq',
        views: {
          'menuContent': {
            templateUrl: 'templates/lin_tq.html'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/appLin');
  });
