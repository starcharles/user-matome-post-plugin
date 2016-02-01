/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular,localStorage */
(function () {
    'use strict';

    //var inject=['ngMockE2E','ngResource', 'ngSanitize', 'ui.bootstrap', 'youtube-embed', 'ui.sortable'];
    var inject = ['ngResource', 'ngSanitize', 'ui.bootstrap', 'youtube-embed', 'ui.sortable'];
    var app = angular.module('UserPosts', inject);

    app.config(function ($httpProvider) {
        //ヘッダーにCSRF対策用のnonceを設定
        $httpProvider.defaults.headers.common = {
            'X-WP-Nonce': wpAngularVars.nonce //jshint ignore:line
        };
    });

    app.run(function ($rootScope, $location, dataService, wpPostMeta) {

        var root = $rootScope;
        root.items = [];

        var params = $location.search();
        root.editingPostId=params.edit;


        if (params.edit) {
            root.edit=true;
            root.loading=true;
            var post_id = params.edit;
            wpPostMeta.query({parentId: post_id}, function (result) {
                console.log(result);
                root.head={
                    title:result.title,
                    desc:result.desc
                };
                result.forEach(function (data) {
                    var item = {
                        id: data.id,
                        type: data.key,
                        content: data.value
                    };
                    root.items.push(item);
                });
                root.loading=false;
            });
        }


    });

    app.controller('mainController', mainController);

    function mainController($scope, $rootScope) {
        var vm = $scope;

        vm.content = {};

        vm.setLocalStore = setLocalStore;
        vm.getLocalStore = getLocalStore;

        function setLocalStore(items) {
            localStorage.setItem("items-mypage", JSON.stringify(items));
        }

        function getLocalStore() {
            vm.items = JSON.parse(localStorage.getItem("items-mypage"));
        }
    }
})();
