/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {
	'use strict';


	var app = angular.module('UserPosts');
	app.controller('tabController', tabController);
	function tabController($scope) {
		var vm = $scope;

		//タブ領域のメソッド
		vm.addItem = addItem;
		vm.cancel = cancel;

		function cancel() {
			vm.content = {};
		}

		function addItem(type, content) {
			if (!content) return;
			vm.items.push({
				type: type,
				content: content
			});
			vm.content = {};
		}
	}

})();
