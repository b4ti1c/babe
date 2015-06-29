import * as http from 'http'

sampleApp.services.factory('exampleGetMyIPService', ['$q', function($q){
	var lookup = (sitename) => {
		var deferred = $q.defer();
		http.get('http://httpbin.org/ip', (res) => res.on('data', (data) => deferred.resolve(JSON.parse(data).origin)))
		.on('error', () => deferred.reject());

		return deferred.promise;
	};

	return {
		lookup: lookup
	};
}]);