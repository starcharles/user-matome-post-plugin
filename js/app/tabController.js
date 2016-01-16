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

		//グローバル変数 content,items


		//タブ領域のメソッド
		vm.addItem = addItem;
		vm.cancel = cancel;


		//追加された要素内のメソッド
		//vm.deleteItem = deleteItem;
		//vm.updateItem = updateItem;
		//vm.editItem = updateItem;
		//vm.moveItem = updateItem;


		function cancel() {
			vm.content = {};
		}

		function addItem(type, content) {
			if (!content) return;
			vm.$parent.items.push({
				type: type,
				content: content
			});
			vm.content = {};
		}
	}

})();
