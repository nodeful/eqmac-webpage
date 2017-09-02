/**
 * Created by romanskisils on 12/03/2017.
 */
(function () {
  var Utils = function (
    $q,
    $window
  ) {
    var Utils = {}

    Utils.injectScript = function (url) {
      var q = $q.defer()
      var script = $window.document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', url)

      script.onerror = function () {
        q.reject()
      }

      script.onload = function () {
        q.resolve()
      }

      $window.document.head.appendChild(script)
      return q.promise
    }

    Utils.globalObjectExists = function (name) {
      return ($window.hasOwnProperty(name) && typeof $window[name] === 'object')
    }

    Utils.formatLargeInt = function (int) {
      return Math.round(int).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return Utils
  }

  window.angular.module('eqMac')
    .factory('Utils', [
      '$q',
      '$window',
      Utils
    ])
})()
