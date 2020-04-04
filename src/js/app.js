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

  const onRun = (
    $rootScope,
    $timeout,
    $document,
    RemoteDataService,
    $window
  ) => {
    const rs = $rootScope

    rs.animateToDiv = function (id) {
      $timeout(function () {
        var someElement = window.angular.element(document.getElementById(id))
        $document.scrollToElement(someElement, 0, 1000)
      })
    }

    if (window.location.hash === '#/donate') {
      rs.animateToDiv('donate')
    }

    rs.releaseTag = null
    rs.downloadLink = null
    rs.releaseDate = null

    RemoteDataService.getLatestRelease()
      .then(release => {
        rs.releaseTag = release.tag_name
        rs.downloadLink = release.assets[0].browser_download_url
        rs.releaseDate = new Date(release.published_at).toISOString().slice(0, 10)
      }).catch(err => {
        rs.releaseTag = 'V2.2'
        rs.downloadLink = `https://github.com/bitgapp/eqMac/releases/download/${$rootScope.releaseTag}/eqMac2.dmg`
        rs.releaseDate = new Date('2017-12-02T18:56:41Z').toISOString().slice(0, 10)
        console.error(err)
      })
  }

  app.run([
    '$rootScope',
    '$timeout',
    '$document',
    'RemoteDataService',
    '$window',
    onRun
  ])
})()
