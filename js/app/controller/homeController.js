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
     * @param wpPostResource: $resource
     * @param dataService :データ取得関連メソッド
     */
    homeController.$inject = ['$scope', '$window', '$location', 'wpPostResource', 'dataService','sharedService'];
    function homeController($scope, $window, $location, wpPostResource, dataService,sharedService) {
        var vm = $scope;
        var posts = dataService.mockData().getData();
        vm.$parent.postData = vm.postData = {
            publish: posts.publish,
            draft: posts.draft
        };
        console.log(vm.postData);


        vm.shareData = function (mode,post) {
            //vm.$parent.sharedPost = post;
            if(mode==='edit'){
                sharedService.setData(post);
                $location.path('/mypage/edit');
            }else if(mode==='preview'){
                sharedService.setData(post);
                $location.path('/preview');

            }
        };

        vm.delete = function (post_id) {
            if ($window.confirm('削除してよろしいですか？')) {
                deletePost(post_id, function (result) {
                    var trashed = result.trashed;
                    if (trashed) $window.alert('削除しました。')
                });
            }
        };

        ///////////////////////////////////
        // //functions definitions below

        function fetchPosts() {
            vm.spinner = true;

            dataService.getPublishPosts(function (data) {
                vm.$parent.postData.publish = data;
                vm.spinner = false;
                console.log(data);
            });

            dataService.getDraftPosts(function (data) {
                vm.$parent.postData.draft = data;
                console.log(data);
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
