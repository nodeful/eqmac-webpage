
(function(){
	var OverviewCtrl = function(
		RemoteDataService
	){
		var c = this;
		c.downloads = 125000 + Math.random()*10000; //just a fallback if the API is down

		var getDownloads = function(){
			RemoteDataService.getDownloads()
				.then(function (resp) {
					c.downloads = resp.downloads;
				});
		};

		(function onEnter() {
			getDownloads();
		})();

	};

	angular.module('eqMac')
		.controller('OverviewCtrl', [
			'RemoteDataService',
			OverviewCtrl])
})();
