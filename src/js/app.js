/**
 * Created by romanskisils on 30/11/2016.
 */

(function(){

	var dependencies = [
		'countTo',
		'duScroll',
		'rzModule'
	];

	var app = angular.module('eqMac', dependencies);

	app.config([
		'$locationProvider',
		function (
		    $locationProvider
		) {
			$locationProvider.hashPrefix('');
		}
	]);

	app.run(['$rootScope', '$timeout', '$document', 'RemoteDataService', function($rootScope, $timeout, $document, RemoteDataService) {
		$rootScope.animateToDiv = function (id) {
			$timeout(function () {
				var someElement = angular.element(document.getElementById(id));
				$document.scrollToElement(someElement, 0, 1000);
			})
		};

		$rootScope.download = function () {
			RemoteDataService.download();
		}
	}]);
})();


