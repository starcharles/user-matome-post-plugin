/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';

    var app = angular.module('UserPosts');


    app.controller('postController', function ($scope, wpPostResource, wpPostMeta) {
        //スコープを変数に代入
        var vm = $scope;

        //メソッド一覧
        vm.getPosts = getPosts;
        vm.sendPost = sendPostTest;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

        function getPosts() {
            wpPostResource.query({}, function (data) {
                vm.posts = data;
                console.log(data);
            });
        }

        function sendPostTest(status, items) {
            //入力チェック
            if (items.length === 0) return;

            console.log('send post');
            console.log(vm.items);

            var items = vm.items;
            var post_id;

            //var post;
            //items.forEach(function (item){
            //
            //});
            //create new Post
            wpPostResource.save({
                status: status,
                title: 'カスタムフィールドテスト',
                content: 'テスト', //jshint ignore:line
            }, function (result) {
                //get post_id from response
                post_id = result.id;
                console.log(result.id);

                items.forEach(function (item){
                    wpPostMeta.save({
                        id: post_id,
                        //id: 283,
                        key: item.type,
                        value: item.content,
                    }, function (result) {
                        console.log(result);
                    });
                });
            });
        }

        function updatePost() {
        }

        function deletePost() {
        }

    });

        app.factory('wpPostResource', function ($resource) {
            var resource = 'http://192.168.33.10';
            return $resource(resource + '/wp-json/wp/v2/user-post');
            //return $resource(resource + '/vender/v1/route');
            //return $resource(resource + '/wp-json/rela/v1/user-post');
            //return $resource(resource + '/wp-json/rela/v1/user-post');
            //return $resource(resource + '/wp-json/wp/v2/posts/268/meta');
        });

        app.factory('wpPostMeta', function ($resource) {
            var resource = 'http://192.168.33.10';
            return $resource(resource + '/wp-json/wp/v2/user-post/:id/meta',{id:'@id'});
            //return $resource(resource + '/wp-json/wp/v2/posts/:id/meta',{id:'@id'});
        });
        //入力のチェック、バリデーション
        app.factory('checkInputs', function () {
            //return $resource('http://192.168.33.10/wp-json/wp/v2/posts');
            return {
                check: function () {
                }
            };
        });
    })();
