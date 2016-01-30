/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';
    var app = angular.module('UserPosts');
    app.controller('previewController', previewController);

    function previewController($scope, wpPostResource) {

    }
    //function homeController($scope, $window, wpPostResource) {
    //	var vm = this;
    //	//メソッド一覧
    //	vm.fetchPosts = fetchPosts;
    //	vm.delete = function(post_id) {
    //		if ($window.confirm('削除してよろしいですか？')) {
    //			deletePost(post_id, function(result) {
    //				var trashed = result.trashed;
    //				if (trashed) $window.alert('削除しました。')
    //				console.log(result);
    //			});
    //		}
    //	}
    //}
})();