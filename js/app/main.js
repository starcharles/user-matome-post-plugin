/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {
	'use strict';
	//var app = angular.module('UserPosts', ['ngResource', 'ngSanitize', 'ngMockE2E', 'ui.bootstrap', 'youtube-embed']);
	var app = angular.module('UserPosts', ['ngResource', 'ngSanitize', 'ui.bootstrap', 'youtube-embed']);

	app.config(function($httpProvider) {
		//ヘッダーにCSRF対策用のnonceを設定
		$httpProvider.defaults.headers.common = {
			'X-WP-Nonce': wpAngularVars.nonce
		};
	});

	app.run(function($rootScope) {
		//
		//isLoggedIn;
		//isAuth=true or false;
		//userResource.get({
		//	id: 'myself'
		//}, function(data) {
		//	$rootScope.myself = data;
		//});
	});

	app.controller('mainController', mainController);
	function mainController($scope) {
		var vm = $scope;
		//variables
		vm.content = {};
		vm.items = [];
	}
})();
