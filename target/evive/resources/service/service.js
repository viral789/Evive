(function () {

var service = angular.module('Service', []);

service.service('movieTVShowDatabase', ['$http', '$timeout', '$q', function($http, $timeout, $q){
	this.getTotalPagesForMovies = function(){
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&region=US&sort_by=release_date.asc&page=1&release_date.gte=2017-12-01&release_date.lte=2017-12-31&with_release_type=1'
		})
		.then(function(data){
			return data;
		});
		return promise;
	};

	this.getMovieData = function(moviePageNumber){
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/discover/movie?api_key=606aaffd7ca10f0b80804a1f0674e4e1&region=US&sort_by=release_date.asc&page='+moviePageNumber+'&release_date.gte=2017-12-01&release_date.lte=2017-12-31&with_release_type=1'
		})
		.then(function(data){
			return data;
		});
		return promise;
		
	};

	this.getTotalPagesForTVShows = function(){
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/discover/tv?api_key=606aaffd7ca10f0b80804a1f0674e4e1&sort_by=first_air_date.asc&first_air_date.gte=2017-12-01&first_air_date.lte=2017-12-31&with_original_language=en'
		})
		.then(function(data){
			return data;
		});
		return promise;
	};


	this.getTVShowData = function(tvPageNumber){
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/discover/tv?api_key=606aaffd7ca10f0b80804a1f0674e4e1&sort_by=first_air_date.asc&first_air_date.gte=2017-12-01&first_air_date.lte=2017-12-31&page='+tvPageNumber+'&with_original_language=en'
		})
		.then(function(data){
			return data;
		});
		return promise;
	};

	this.getMovieCast = function(movieId, counter){
		if(counter > 30){
			//console.log("Service Movie Cast Counter: "+counter);
			for(var j=0;j<1000;j++){
				console.log("counter");
			}
		}
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=606aaffd7ca10f0b80804a1f0674e4e1'
		})
		.then(function(data){
			return data;
		});
		return promise;
	};

	this.getTVShowCast = function(tvShowId, counter){
		if(counter > 30){
			//console.log("Service TVSHow Cast Counter: "+counter);
			for(var j=0;j<1000;j++){
				console.log("counter");
			}
		}
		var promise = $http({
			method : 'GET',
	        url : 'https://api.themoviedb.org/3/tv/'+tvShowId+'/credits?api_key=606aaffd7ca10f0b80804a1f0674e4e1'
		})
		.then(function(data){
			return data;
		});
		return promise;
	}
}]);

}());