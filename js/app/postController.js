/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function() {
	'use strict';

	var app = angular.module('UserPosts');


	app.controller('postController', function($scope, wpPostResource) {
		//スコープを変数に代入
		var vm = $scope;

		//メソッド一覧
		vm.getPosts = getPosts;
		vm.sendPost = sendPost;
		vm.updatePost = updatePost;
		vm.deletePost = deletePost;

		function getPosts() {
			wpPostResource.query({}, function(data) {
				vm.posts = data;
			});
		}

		function sendPost(status, items) {
			//入力チェック
			//if (items.length === 0) return;

			console.log('send post');
			console.log(vm.items);
			wpPostResource.save({
				title: 'test',
				content: 'matome-test', //jshint ignore:line
				status: status
			}, function(result) {
				console.log(result);
			});
			//var items=vm.items;
			//var items=[{type:'text',content:'meta-test'}];
            //
			//wpPostResource.save({
			//	key: items[0].type,
			//	value: items[0].content, //jshint ignore:line
			//}, function(result) {
			//	console.log(result);
			//});
		}

		function updatePost() {
		}
		function deletePost() {
		}

	});

	app.factory('wpPostResource', function($resource) {
		var resource = 'http://192.168.33.10';
		return $resource(resource + '/wp-json/wp/v2/user-post');
		//return $resource(resource + '/wp-json/wp/v2/posts');
		//return $resource(resource + '/wp-json/wp/v2/posts/268/meta');
	});

	//入力のチェック、バリデーション
	app.factory('checkInputs', function() {
		//return $resource('http://192.168.33.10/wp-json/wp/v2/posts');
		return {
			check: function() {
			}
		};
	});
})();
