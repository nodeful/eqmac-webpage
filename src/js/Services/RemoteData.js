(function () {
  var RemoteDataService = function (
    $http,
    $q,
    CONST,
    $window
  ) {
    var RemoteDataService = {}

    RemoteDataService.getDownloads = function () {
      return get('https://api.github.com/repos/nodeful/eqMac2/releases', true)
        .then(function (releases) {
          var downloads = CONST.LEGACY_DOWNLOADS
          releases.forEach(function (release) {
            release.assets.forEach(function (asset) {
              downloads += asset.download_count
            })
          })
          return $q.resolve(downloads)
        })
    }

    RemoteDataService.processStripeDonation = function (token) {
      return post('/donate/stripe', token)
    }

    RemoteDataService.processPayPalDonation = function (token) {
      return post('/donate/paypal', token)
    }

    RemoteDataService.getRepoInfo = function () {
      return get('https://api.github.com/repos/nodeful/eqMac2', true)
    }

    RemoteDataService.getLatestRelease = function () {
      return get('https://api.github.com/repos/nodeful/eqmac2/releases/latest', true)
    }

    var get = function (url, urlOverride) {
      var q = $q.defer()
      $http.get(urlOverride ? url : CONST.API_URL + url)
        .then(function (resp) {
          if (resp.status === 200) {
            q.resolve(resp.data)
          } else {
            q.reject(resp.data)
          }
        }, function (err) {
          console.error(err)
          q.reject(err)
        })
      return q.promise
    }

    var post = function (url, body) {
      var q = $q.defer()
      $http.post(CONST.API_URL + url, body)
        .then(function (resp) {
          if (resp.status === 200) {
            q.resolve(resp.data)
          } else {
            q.reject(resp.data)
          }
        }, function (err) {
          q.reject(err)
        })
      return q.promise
    }
    return RemoteDataService
  }

  window.angular.module('eqMac')
    .service('RemoteDataService', [
      '$http',
      '$q',
      'CONST',
      '$window',
      RemoteDataService
    ])
})()
