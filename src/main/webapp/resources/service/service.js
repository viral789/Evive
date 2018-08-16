(function () {

var service = angular.module('Service', []);

service.service('movieTVShowDatabase', ['$http', '$timeout', '$q',  function($http, $timeout, $q){
	//Extracting total pages from discover/movie api
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
	
	//Extracting movie ID and Name from discover/movie api using specific pageNumber
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

	//Extracting total pages from discover/tv api
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

	//Extracting TV Show ID and Name from discover/tv api using specific pageNumber
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

	//Extracting cast for specific movie ID
	this.getMovieCast = function(movieId, counter){
		/*looping for loop for 1000 times if the api count increase 30 count
		 * looping as there is no sleep function in javascript and setTimeout, timeout doesn't work here
		 * as it AJAX call makes async call and there is a x-limit for the movie database API which is 40
		 * per 10 second so using for loop instead of Sleep.
		*/
		if(counter > 30){
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

	//Extracting cast for specific tv ID
	this.getTVShowCast = function(tvShowId, counter){
		/*looping for loop for 1000 times if the api count increase 30 count
		 * looping as there is no sleep function in javascript and setTimeout, timeout doesn't work here
		 * as it AJAX call makes async call and there is a x-limit for the movie database API which is 40
		 * per 10 second so using for loop instead of Sleep.
		*/
		if(counter > 30){
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