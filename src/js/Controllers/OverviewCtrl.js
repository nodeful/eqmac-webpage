
(function(){
	var OverviewCtrl = function(
		RemoteDataService
	){
		var c = this;

		//just a fallback if the API is down
		c.downloads = 125000 + Math.random()*10000;
		c.stargazers = 43;
		c.forks = 6;

		var getDownloads = function(){
			RemoteDataService.getDownloads()
				.then(function (resp) {
					c.downloads = resp.downloads;
				});
		};

		var getRepoInfo = function () {
			RemoteDataService.getRepoInfo()
				.then(function (repoInfo) {
					c.stargazers = repoInfo.stargazers_count;
					c.forks = repoInfo.forks;
				})
		}

		c.getFormattedInt = function (int) {
			return Math.round(int).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};

		(function onEnter() {
			getRepoInfo();
			getDownloads();
		})();

	};

	angular.module('eqMac')
		.controller('OverviewCtrl', [
			'RemoteDataService',
			OverviewCtrl])
})();
