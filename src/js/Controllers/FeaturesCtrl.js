/**
 * Created by romanskisils on 21/02/2017.
 */

(function(){
	var FeaturesCtrl = function(

	){
		var c = this;

		c.features = [{
			text: 'System Audio EQ',
			availableOn: {
				v1: true,
				v2: true,
				pro: true
			}
		},{
			text: 'Built-In Speaker Support',
			availableOn: {
				v1: true,
				v2: true,
				pro: true
			}
		},{
			text: '3.5mm Line-out Support',
			availableOn: {
				v1: true,
				v2: true,
				pro: true
			}
		},{
			text: 'New Design & Stable Build',
			availableOn: {
				v2: true,
				pro: true
			}
		},{
			text: 'Future Updates',
			availableOn: {
				v2: true,
				pro: true
			}
		},{
			text: 'All Devices Support',
			specialText: 'Bluetooth, USB, AirPlay, HDMI and more.',
			availableOn: {
				v2: true,
				pro: true
			},
			attention: true
		},{
			text: '31 Band EQ',
			availableOn:{
				pro: true
			},
			fullNote: 'Coming Soon'
		}
		// , {
		// 	text: 'Multi-Output Device',
		// 	availableOn:{
		// 		pro: true
		// 	}
		// },{
		// 	text: 'Per-App Audio Processing',
		// 	availableOn:{
		// 		pro: true
		// 	}
		// },{
		// 	text: 'Independent Audio Routing',
		// 	availableOn:{
		// 		pro: true
		// 	}
		// }
		];

	};

	angular.module('eqMac')
		.controller('FeaturesCtrl', [
			FeaturesCtrl])
})();
