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
            draft: []
        };
        var userData = {};
        var post = {};

        return {
            getPublishPosts: function (callback) {
                wpPostResource.query()
                    .$promise.then(function (data) {
                        postData.publish = data;
                        callback(data);
                    }).catch(function (err) {
                        callback(err, 'post get error');
                        throw new Error('Error:failed to get posts.' + err);
                    }).finally(function () {
                    });

            },
            getDraftPosts: function (callback) {
                wpPostResource.query({status: 'draft'})
                    .$promise.then(function (data) {
                        postData.draft = data;
                        callback(data);
                    }).catch(function (err) {
                        throw new Error('Error:failed to get posts.' + err);
                    }).finally(function () {
                    });
            },
            getPostById: function (id,callback) {
                wpPostResource.get({id: id})
                    .$promise.then(function (data) {
                        post = data;
                        callback(post);
                    })
                    .catch(function () {
                        var err='error';
                        callback(err);
                        });
            },
            getMetaField: function (id) {
                wpPostMeta({id:id}, function (data) {

                    console.log(data);

                });

            }
            ,
            getUser: function () {


                return userData;
            }
        }
    }
})();
