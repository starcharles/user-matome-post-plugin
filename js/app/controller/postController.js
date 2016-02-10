/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';

    var app = angular.module('UserPosts');


    app.controller('postController', function ($scope, wpPostResource, wpPostMeta,dataService) {
        //スコープを変数に代入
        var vm = $scope;
        vm.title = null;
        vm.desc = null;

        //メソッド一覧
        vm.getPosts = dataService.getAllPosts;
        //vm.getPosts = getPosts;
        vm.sendPost = sendPost;
        //vm.updatePost = updatePost;
        vm.updateMetaField = updateMetaField;

        //TODO：個別削除
        //vm.deleteMetaField = deleteMetaField;
        //TODO：投稿全体の削除
        //vm.deletePost = deletePost;

        function sendPost(status, head) {
            var items = vm.items;

            //入力チェック
            if (items.length === 0 && head.title === null && head.desc === null) return;

            console.log('send post');
            console.log(head);
            console.log(items);

            wpPostResource.save({
                status: status,
                title: head.title,
                content: head.desc,
                items: items
            }, function (result) {
                console.log(result);
            });
        }

        function updateMetaField(parentId, metaId, item) {
            console.log(parentId);
            console.log(metaId);
            console.log(item);

            parentId = parseInt(parentId, '10');

            vm.loadBtn = true;
            wpPostMeta.save({
                parentId: parentId,
                id: metaId,
                key: item.type,
                value: item.content
            }, function (result) {
                vm.loadBtn = false;
                vm.show = false;

                console.log(result);
            });
        }

        //TODO deleteの実装
        function deletePost() {
        }
    });
})();
