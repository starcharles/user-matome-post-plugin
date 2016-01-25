/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';

    var resource = 'http://vccw.dev';
    var app = angular.module('UserPosts');

    app.factory('wpPostResource', function ($resource) {
        //var resource = 'http://192.168.33.10';
        return $resource(resource + '/wp-json/wp/v2/user-post/:id',{id:'@id'});
    });

    app.factory('wpPostMeta', function ($resource) {
        //var resource = 'http://192.168.33.10';
        return $resource(resource + '/wp-json/wp/v2/user-post/:id/meta', {id: '@id'});
        //return $resource(resource + '/wp-json/wp/v2/posts/:id/meta',{id:'@id'});
    });

    app.factory('wpUserResource', function ($resource) {
        //var resource = 'http://192.168.33.10';
        return $resource(resource + '/wp-json/wp/v2/user-post/:id/meta', {id: '@id'});
        //return $resource(resource + '/wp-json/wp/v2/posts/:id/meta',{id:'@id'});
    });
})();
