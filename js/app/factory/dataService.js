/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */
(function () {
    'use strict';
    var app = angular.module('UserPosts');
    app.factory('dataService', dataService);

    function dataService(wpPostResource) {
        var postData = {
            publish: [],
            draft: [],
        };
        var userData = {};
        var selectedPost = {};

        return {
            getPublishPosts: function (callback) {
                wpPostResource.query()
                    .$promise.then(function (data) {
                        postData.publish = data;
                        callback('success',data);
                    }).catch(function (err) {
                        callback(err,'post get error');
                        throw new WP_Error('Error:failed to get posts.' + err);
                    }).finally(function () {
                    });

            },
            getDraftPosts: function (callback) {
                wpPostResource.query()
                    .$promise.then(function (data) {
                        postData.draft = data;
                        callback(data);
                    }).catch(function (err) {
                        throw new WP_Error('Error:failed to get posts.' + err);
                    }).finally(function () {
                    });
            },
            getSelectedPost: function () {
                return selectedPost;
            }
            ,
            getUser: function () {


                return userData;
            }
        }
    }
})();
