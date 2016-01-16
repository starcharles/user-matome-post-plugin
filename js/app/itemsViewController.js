/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {

	//youtubeのタブのコントローラー
	angular.module('UserPosts')
		.controller('itemsViewController', function($scope) {
			var vm = $scope;
			vm.editItem = editItem;
			vm.deleteItem = deleteItem;
			vm.moveItem = moveItem;

			//////////////////////
			function editItem(index) {
				console.log(index);

			}

			function deleteItem() {

			}

			function moveItem() {

			}

		});
})();
