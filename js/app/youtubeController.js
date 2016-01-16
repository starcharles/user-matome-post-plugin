/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {

	//youtubeのタブのコントローラー
	angular.module('UserPosts')
		.controller('youtubeController', function($scope, youtubeEmbedUtils) {
			var ytb = youtubeEmbedUtils;
			$scope.hideYoutube = true;

			$scope.check = function(link) {
				$scope.hideYoutube = false;
				$scope.youtubeUrl = link;

			};
			$scope.cancel = function() {
				$scope.hideYoutube = true;
				$scope.content.youtubeUrl = '';
			};
			$scope.addYoutubeItem = function(type, content) {
				if (!content.youtubeUrl) return;
				var id = ytb.getIdFromURL(content.youtubeUrl);
				content.youtubeId = id;
				$scope.$parent.items.push({
					type: type,
					content: content
				});
				$scope.$parent.content = {};
				$scope.hideYoutube = true;
			};
		});
})();
