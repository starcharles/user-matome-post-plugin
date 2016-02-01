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
     * @param $rootScope
     * @param $window
     * @param wpPostResource:
     * @param dataService :データ取得関連メソッド
     */
    function homeController($scope,$rootScope, $window, wpPostResource, dataService) {
        var vm = $scope;
        var root=$rootScope;
        root.postData= {
            publish: [],
            draft: []
        };

        //メソッド一覧
        vm.fetchPosts = fetchPosts;
        vm.delete = function (post_id) {
            if ($window.confirm('削除してよろしいですか？')) {
                deletePost(post_id, function (result) {
                    var trashed = result.trashed;
                    if (trashed) $window.alert('削除しました。')
                });
            }
        };


        fetchPosts();

        //////////////

        function fetchPosts() {
            vm.spinner = true;

            dataService.getPublishPosts(function (data) {
                root.postData.publish=data;
                vm.spinner = false;
                console.log(data);
            });

            //dataService.getDraftPosts(function (data) {
            //    root.postData.draft=data;
            //    vm.spinner = false;
            //    console.log(data);
            //});

        }

        function deletePost(post_id) {
            console.log('delete');
            wpPostResource.delete({id: post_id}, function (result) {
                console.log(result);
            });
        }
    }
})();
