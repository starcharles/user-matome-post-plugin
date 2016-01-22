/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {

	//youtubeのタブのコントローラー
	angular.module('UserPosts')
		.controller('itemsViewController',itemsViewController);

		function itemsViewController($scope) {
			var vm = $scope;
			vm.editItem = editItem;
			vm.deleteItem = deleteItem;
			vm.moveItem = moveItem;

			//////////////////////

			function editItem(){
			}

			function deleteItem($index) {
				vm.items.splice($index,1);
			}


			function moveItem(moveTo, $index,$first,$last) {
				if (moveTo === 'Up' && $first) return;
				if (moveTo === 'Down' && $last) return;

				if (moveTo === 'Up') {
					var _item = vm.items[$index-1];
					vm.items.splice($index-1,1);
					vm.items.splice($index,0,_item);
				}

				if (moveTo === 'Down') {
					var _item = vm.items[$index+1];
					vm.items.splice($index+1,1);
					vm.items.splice($index,0,_item);
				}
			}

			$scope.showPopover = function() {
				$scope.popoverIsVisible = true;
			};

			$scope.hidePopover = function () {
				$scope.popoverIsVisible = false;
			};

			function cancel(){
				vm.show=false;
				vm.content={};
			}
		}
})
();
