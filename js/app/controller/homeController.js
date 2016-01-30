/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';
    var app = angular.module('UserPosts');


    app.controller('homeController', homeController);

    /**
     *
     * @param $scope
     * @param $window
     * @param wpPostResource
     * @param dataService
     */
    function homeController($scope, $window, wpPostResource, dataService) {
        var vm = $scope;

        //メソッド一覧
        vm.fetchPosts = fetchPosts;
        vm.delete = function (post_id) {
            if ($window.confirm('削除してよろしいですか？')) {
                deletePost(post_id, function (result) {
                    var trashed = result.trashed;
                    if (trashed) $window.alert('削除しました。')
                    console.log(result);
                });
            }
        };


        fetchPosts();

        //////////////

        function fetchPosts() {
            vm.spinner = true;
            vm.postData= {
                publish: [],
                draft: []
            };

            dataService.getPublishPosts(function (status,data) {
                console.log(status);
                vm.postData.publish = data;
                vm.spinner = false;
            });

            dataService.getDraftPosts(function (status,data) {
                console.log(status);
                vm.postData.draft = data;
                vm.spinner = false;
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
