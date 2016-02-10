/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */

(function () {
    'use strict';
    var app = angular.module('UserPosts');

    app.factory('sharedService', sharedService);

    function sharedService() {
        var data = {};
        data.post = null;

        return {
            setData: setData,
            getData: getData,
        };

        function setData(post) {
            data.post=post;
        }

        function getData() {
            return data.post;
        }
    }
})();
