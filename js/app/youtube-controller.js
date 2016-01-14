/* jshint undef: true, unused: true, latedef: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint devel: true, globalstrict: true */

/* global angular */
'use strict';

//var app = angular.module('mainModule', ['youtube-embed']);

//app.config(function ($logProvider) {
//	//$logProvider.debugEnabled(true);
//});

app.controller('youtubeController', function ($scope) {
   //$scope.theBestVideo = 'sMKoNBRZM1M';
	$scope.hideYoutube=true;
	$scope.items = [];

  $scope.check = function (link) {
    $scope.hideYoutube=false;
    $scope.youtubeUrl = link;
    // $scope.isFound='';//動画チェックで見つかれば表示。見つからなければエラー
  };

  $scope.cancel = function () {
    $scope.hideYoutube=true;
    $scope.content.link='';
  };

	$scope.addItem=function(type,content){
		//$log.debug('degug');
		if(!content.link) return;
		$scope.$parent.items.push({
			type:type,
			content:content
		});
		$scope.$parent.content={};

		$scope.hideYoutube=true;
		//console.log($scope.items);
	};
});
