/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';

    var app = angular.module('UserPosts');


    app.controller('postController', function ($scope, wpPostResource) {
        //スコープを変数に代入
        var vm = $scope;
        vm.title = null;
        vm.desc=null;

        //メソッド一覧
        vm.getPosts = getPosts;
        vm.sendPost = sendPost;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

        function getPosts() {
            wpPostResource.query({}, function (data) {
                vm.posts = data;
                console.log(data);
            });
        }

        function sendPost(status,items,title,desc) {
            //入力チェック
            if (items.length === 0 && title===null && desc ===null ) return;

            console.log('send post');
            console.log(title);
            console.log(desc);
            console.log(vm.items);

            var items = vm.items;

            wpPostResource.save({
                status: status,
                title: title,
                content: desc, //jshint ignore:line
                items: items
            }, function (result) {
                console.log(result);
            });
            //wpPostResource.save({
            //    status: status,
            //    title: 'カスタムフィールドテスト',
            //    content: 'テスト', //jshint ignore:line
            //    items: items
            //}, function (result) {
            //    console.log(result);
            //});
        }

        function updatePost() {
        }

        function deletePost() {
        }
    });
})();