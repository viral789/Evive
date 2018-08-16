(function () {

var controller = angular.module('Controller', ['Service']);

controller.controller('indexController', ['$scope', '$state', function($scope, $state){

	$state.go("cast");

}]);


controller.controller('castController', ['$scope', '$state', 'movieTVShowDatabase', '$timeout',  '$http' ,function($scope, $state, movieTVShowDatabase, $timeout, $http){

	$scope.movieData = {};
	$scope.movieCast = {};
	$scope.movieTVShowCast = {};
	$scope.allMovies = [];
	$scope.allTVShows = [];
	$scope.allMovieCast = [];
	$scope.allMovieTVShowCast = [];
	$scope.tvShowData = {};
	$scope.counter = 1;
	$scope.loading = true;
	movieTVShowDatabase.getTotalPagesForMovies().then(function(response){
		$scope.totalPages = response.data.total_pages;
		$scope.counter++;
		for (var moviePageNumber = 1; moviePageNumber <= $scope.totalPages; moviePageNumber++) {
			$scope.counter++;
			movieTVShowDatabase.getMovieData(moviePageNumber).then(function(response){
				for (var i in response.data.results){
					$scope.counter++;
					$scope.movieData.movieId = response.data.results[i].id;
					$scope.movieData.movieName = response.data.results[i].title;
					$scope.allMovies.push($scope.movieData);
					getMovieCast($scope.movieData);
					$scope.movieData = {};
				}
			});	
		};
		getTVShowData();
	});
	
	var getMovieCast = function(movieData){
		movieTVShowDatabase.getMovieCast(movieData.movieId, $scope.counter).then(function(response){
			if(response.data.cast != null){
				for(var i in response.data.cast){
					$scope.movieCast.castId = response.data.cast[i].id;
					$scope.movieCast.castName = response.data.cast[i].name;
					$scope.movieCast.movieName = movieData.movieName;
					$scope.allMovieCast.push($scope.movieCast);
					$scope.movieCast = {};
				}	
			}
			$scope.counter = response.headers()["x-ratelimit-remaining"];
		});
	}
	
	var getTVShowData = function(){
		movieTVShowDatabase.getTotalPagesForTVShows().then(function(response){
			$scope.counter++;
			$scope.totalPagesForTVShows = response.data.total_pages;
			for(var tvShowPageNumber = 1; tvShowPageNumber <= $scope.totalPagesForTVShows; tvShowPageNumber++){
				console.log("Controller TVSHow Data Counter: "+$scope.counter);
				$scope.counter++;
				movieTVShowDatabase.getTVShowData(tvShowPageNumber).then(function(response){
					for (var i in response.data.results){
						$scope.counter++;
						$scope.tvShowData.tvShowId = response.data.results[i].id;
						$scope.tvShowData.tvShowName = response.data.results[i].name;
						$scope.allTVShows.push($scope.tvShowData);
						getTVShowCast($scope.tvShowData);
						$scope.tvShowData = {};
					}
				});
			};
		});
	}
	
	var getTVShowCast = function(tvShowData){
		movieTVShowDatabase.getTVShowCast(tvShowData.tvShowId, $scope.counter).then(function(response){
			if(response.data.cast != null){
				for(var cast in $scope.allMovieCast){
					for(var i in response.data.cast){
						if($scope.allMovieCast[cast].castId == response.data.cast[i].id){
							$scope.movieTVShowCast.movieName = $scope.allMovieCast[cast].movieName;
							$scope.movieTVShowCast.castName = response.data.cast[i].name;
							$scope.movieTVShowCast.tvShowName = tvShowData.tvShowName;
							$scope.allMovieTVShowCast.push($scope.movieTVShowCast);
							$scope.movieTVShowCast = {};
						}
					}	
				}
			}
		});
	}
	$scope.loading = false;

}]);

}());