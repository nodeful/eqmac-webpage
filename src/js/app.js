/**
 * Created by romanskisils on 30/11/2016.
 */

(function () {
  var dependencies = [
    'duScroll',
    'rzModule'
  ]

  var app = window.angular.module('eqMac', dependencies)

  app.config([
    '$locationProvider',
    function (
      $locationProvider
    ) {
      $locationProvider.hashPrefix('')
    }
  ])

  app.run(['$rootScope', '$timeout', '$document', 'RemoteDataService', function ($rootScope, $timeout, $document, RemoteDataService) {
    $rootScope.animateToDiv = function (id) {
      $timeout(function () {
        var someElement = window.angular.element(document.getElementById(id))
        $document.scrollToElement(someElement, 0, 1000)
      })
    }

    console.log(window.location.hash)
    if (window.location.hash === '#/donate') {
      $rootScope.animateToDiv('donate')
    }

    $rootScope.releaseTag = null
    $rootScope.downloadLink = null
    $rootScope.releaseDate = null

    RemoteDataService.getLatestRelease()
      .then(release => {
        $rootScope.releaseTag = release.tag_name
        $rootScope.downloadLink = release.assets[0].browser_download_url
        $rootScope.releaseDate = new Date(release.published_at).toISOString().slice(0, 10)
      }).catch(err => {
        $rootScope.releaseTag = 'v2.0.6'
        $rootScope.downloadLink = `https://github.com/romankisil/eqMac2/releases/download/${$rootScope.releaseTag}/eqMac2.dmg`
        $rootScope.releaseDate = new Date('2017-08-02T20:56:41Z').toISOString().slice(0, 10)
        console.error(err)
      })
  }])
})()
