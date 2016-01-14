/* jshint undef: true, unused: true, latedef: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint devel: true, globalstrict: true */

/* global angular */
'use strict';

var app=angular.module('app', ['ui.bootstrap','youtube-embed']);
	//.controller('tabController',function($scope){
app.controller('tabController',function($scope){
	$scope.content={text:""}
	$scope.items=[];

	$scope.cancel = function () {
		$scope.content={};
	};

	$scope.addItem=function(type,content,user){
		if(!content) return;
		$scope.items.push({
			type:type,
			content:content
		});
		$scope.content={};
		//console.log($scope.items);
	};
});

