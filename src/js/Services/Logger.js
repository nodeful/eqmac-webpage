
(function(){
	var Logger = function(){
		var Logger = {};
		Logger.error = function (error) {
			console.log(error);
		};
		return Logger;
	};
	angular.module('eqMac')
		.factory('Logger',[
			Logger
		])
})();

