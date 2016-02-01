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
        return $resource(resource + '/wp-json/wp/v2/userpost/:id',
            {id: '@id'}, {
                //'update': {method: 'PUT'}
            });
        //return $resource(resource + '/wp-json/wp/v2/userpost/');
    });

    app.factory('wpPostMeta', function ($resource) {
        return $resource(resource + '/wp-json/wp/v2/userpost/:parentId/meta/:id',
            {parentId: '@parentId',
            id:'@id'}
        );
    });

    app.factory('wpUserResource', function ($resource) {
        //return $resource(resource + '/wp-json/wp/v2/userpost/:id/meta', {id: '@id'});
    });
})();
