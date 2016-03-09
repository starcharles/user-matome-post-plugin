/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular,localStorage */
(function () {
    'use strict';

    //var inject = ['ngMockE2E','ngResource', 'ngSanitize','ngRoute', 'ui.bootstrap', 'youtube-embed', 'ui.sortable'];
    var inject = ['ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'youtube-embed', 'ui.sortable'];
    var app = angular.module('UserPosts', inject);

    app.config(function ($httpProvider) {
        //ヘッダーにCSRF対策用のnonceを設定
        $httpProvider.defaults.headers.common = {
            'X-WP-Nonce': wpAngularVars.nonce //jshint ignore:line
        };
    });

    app.config(function ($routeProvider) {
        //ルーティング
        $routeProvider
            .when('/index', {
                templateUrl: myLocalizedViews.views + 'index.html',
            })
            .when('/mypage/:mode/', {
                templateUrl: myLocalizedViews.views + 'mypage.html',
                controller: 'mainController'
            })
            .when('/home', {
                templateUrl: myLocalizedViews.views + 'partials/home.html',
                controller: 'mainController'
            })
            .when('/preview', {
                templateUrl: myLocalizedViews.views + 'partials/preview.html',
                controller: 'mainController'
            })
            .otherwise({
                redirectTo: '/'
            });

    });

    app.controller('mainController', mainController);

    mainController.$inject = ['$scope', '$routeParams', 'dataService', 'sharedService'];

    function mainController($scope, $routeParams, dataService, sharedService) {
        var vm = $scope;

        vm.items = [];
        vm.content = {};
        vm.sharedPost = {};

        vm.setLocalStore = setLocalStore;
        vm.getLocalStore = getLocalStore;


        // URLが/mypage/editの時に編集モード
        var params = $routeParams;
        //console.log(params);
        if (params.mode === 'edit') {
            var post=sharedService.getData();
            console.log(post);
            vm.head={
                title:post.title.rendered,
                desc:post.content.rendered
            };

            //vm.items = getMetaById(post.id);
            //console.log(vm.items);
            getMetaById(post.id,function(data){
                vm.items=data;
            });
        }

        ///////////////////////////////

        function getMetaById(postId,callback) {
            vm.edit = true;
            vm.loading = true;
            var items=[];

            dataService.getMetaField(postId, function (results) {
                results.forEach(function (data) {
                    var item = {
                        id: data.id,
                        type: data.key,
                        content: data.value
                    };
                    items.push(item);
                });
                vm.loading = false;
                callback(items);
                //return items;
            });
        }

        function setLocalStore(items) {
            localStorage.setItem("items-mypage", JSON.stringify(items));
        }

        function getLocalStore() {
            vm.items = JSON.parse(localStorage.getItem("items-mypage"));
        }
    }
})();
