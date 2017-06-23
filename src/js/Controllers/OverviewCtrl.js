
(function(){
	var OverviewCtrl = function(
		RemoteDataService,
	    $window
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
			// getDownloads();
		})();

		c.download = function(){
			RemoteDataService.getDownloadLink()
				.then(function(resp){
					$window.location = resp.download_link;
				});
		}
	};

	angular.module('eqMac')
		.controller('OverviewCtrl', [
			'RemoteDataService',
			'$window',
			OverviewCtrl])
})();
