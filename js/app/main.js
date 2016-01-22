/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular,localStorage */
(function() {
	'use strict';

	//var inject=['ngResource', 'ngSanitize', 'ngMockE2E', 'ui.bootstrap', 'youtube-embed', 'ui.sortable'];
	var inject=['ngResource', 'ngSanitize', 'ui.bootstrap', 'youtube-embed', 'ui.sortable','ui.bootstrap.modal'];
	var app = angular.module('UserPosts',inject);

	app.config(function($httpProvider) {
		//ヘッダーにCSRF対策用のnonceを設定
		$httpProvider.defaults.headers.common = {
			'X-WP-Nonce': wpAngularVars.nonce //jshint ignore:line
		};
	});

	app.run(function($rootScope) {
		$rootScope.isLoggedIn=true;

		//isLoggedIn;
		//isAuth=true or false;
		//userResource.get({
		//	id: 'myself'
		//}, function(data) {
		//	$rootScope.myself = data;
		//});
	});
	app.controller('mainController', mainController);
	/**
	 *
	 * @param $scope
	 */
	function mainController($scope) {
		var vm = $scope;
		vm.content = {};
		vm.items = [];

		vm.setLocalStore=setLocalStore;
		vm.getLocalStore=getLocalStore;

		function setLocalStore(items){
			localStorage.setItem("items-mypage", JSON.stringify(items));
		}
		function getLocalStore(){
			vm.items= JSON.parse(localStorage.getItem("items-mypage"));
		}
	}
})();
