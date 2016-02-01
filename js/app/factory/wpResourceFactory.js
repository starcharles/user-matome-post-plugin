/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';

    var app = angular.module('UserPosts');

    //var resource = 'http://192.168.33.10';
    var resource = 'http://vccw.dev';

    app.factory('wpPostResource', function ($resource) {
        return $resource(resource + '/wp-json/wp/v2/userpost/:id',{id:'@id'});
        //return $resource(resource + '/wp-json/wp/v2/userpost/');
        //return $resource(resource + '/wp-json/wp/v2/posts/');
    });

    app.factory('wpPostMeta', function ($resource) {
        return $resource(resource + '/wp-json/wp/v2/userpost/:id/meta', {id: '@id'});
        //return $resource(resource + '/wp-json/wp/v2/posts/:id/meta',{id:'@id'});
    });

    app.factory('wpUserResource', function ($resource) {
        //return $resource(resource + '/wp-json/wp/v2/userpost/:id/meta', {id: '@id'});
    });
})();
