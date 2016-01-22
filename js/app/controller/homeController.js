/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';
    var app = angular.module('UserPosts');


    app.controller('homeController', homeController);

    function homeController($scope, $window, wpPostResource) {
        var vm = this;
        //メソッド一覧
        vm.fetchPosts = fetchPosts;
        vm.delete = function (post_id) {
            if ($window.confirm('削除してよろしいですか？')) {
                deletePost(post_id, function (result){
                    var trashed=result.trashed;
                    if(trashed) $window.alert('削除しました。')
                    console.log(result);
                });
            }
        };


        fetchPosts();
        //fetchPosts('publish');
        //fetchPosts('draft');
        //////////////

        function fetchPosts() {
            wpPostResource.query(function (data) {
                console.log(data);
                vm.publishPosts = data;
            });

            wpPostResource.query({status: 'draft'}, function (data) {
                vm.draftPosts = data;
            });
        }

        function deletePost(post_id) {
            console.log('delete');

            wpPostResource.delete({id: post_id}, function (result) {
                console.log(result);
            });
        }
    }
})();
