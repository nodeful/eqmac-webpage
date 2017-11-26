/**
 * Created by romanskisils on 21/02/2017.
 */

(function () {
  var FeaturesCtrl = function (

  ) {
    var c = this

    c.features = [{
      text: 'System Audio EQ',
      availableOn: {
        v1: true,
        v2: true
      }
    }, {
      text: 'Built-In Speaker Support',
      availableOn: {
        v1: true,
        v2: true
      }
    }, {
      text: '3.5mm Line-out Support',
      availableOn: {
        v1: true,
        v2: true
      }
    }, {
      text: 'New Design & Stable Build',
      availableOn: {
        v2: true
      }
    }, {
      text: 'Future Updates',
      availableOn: {
        v2: true
      }
    }, {
      text: 'All Devices Support',
      specialText: 'Bluetooth, USB, AirPlay, HDMI and more.',
      availableOn: {
        v2: true
      },
      attention: true
    }, {
      text: '31 Band EQ',
      availableOn: {
        v2: true
      },
      fullNote: 'Coming Soon'
    }]
  }

  window.angular.module('eqMac')
    .controller('FeaturesCtrl', [
      FeaturesCtrl
    ])
})()
