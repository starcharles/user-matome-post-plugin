/* jshint undef: true, unused: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true , latedef: nofunc */

/* global angular */

(function () {
    'use strict';
    var app = angular.module('UserPosts');

    dataService.$inject = ['wpPostResource', 'wpPostMeta'];
    app.factory('dataService', dataService);

    function dataService(wpPostResource, wpPostMeta) {
        return {
            getAllPosts: getAllPosts,
            getPublishPosts: getPublishPosts,
            getDraftPosts: getDraftPosts,
            getPostById: getPostById,
            getMetaField: getMetaField,
            updateMetaField: updateMetaField,
            getUser: getUser,
            mockData: mockData,

        };


        ////////////////////////////////////////
        //function definitions are below

        function getAllPosts(callback) {
            wpPostResource.query()
                .$promise.then(function (data) {
                    callback(data);
                }).catch(function (err) {
                    callback(err, 'post get error');
                    throw new Error('Error:failed to get posts.' + err);
                }).finally(function () {
                });

        }

        function getPublishPosts(callback) {
            wpPostResource.query({status: 'publish'})
                .$promise.then(function (data) {
                    callback(data);
                }).catch(function (err) {
                    callback(err, 'post get error');
                    throw new Error('Error:failed to get posts.' + err);
                }).finally(function () {
                });

        }

        function getDraftPosts(callback) {
            wpPostResource.query({status: 'draft'})
                .$promise.then(function (data) {
                    callback(data);
                }).catch(function (err) {
                    throw new Error('Error:failed to get posts.' + err);
                }).finally(function () {
                });
        }

        function getPostById(id, callback) {
            wpPostResource.get({id: id})
                .$promise.then(function (data) {
                    callback(data);
                })
                .catch(function (err) {
                    throw new Error('Error:failed to get posts by Id.' + err);
                });
        }

        function getMetaField(id, callback) {
            wpPostMeta.query({parentId: id})
                .$promise.then(function (data) {
                    callback(data);
                })
                .catch(function (err) {
                    throw new Error('Error:failed to get PostMeta. :' + err);
                });
        }

        function updateMetaField(postId, metaId, item, callback) {

            wpPostMeta.query({parentId: id})
                .$promise.then(function (data) {
                    callback(data);
                })
                .catch(function (err) {
                    throw new Error('Error:failed to get PostMeta. :' + err);
                });
        }

        function getUser() {

            return userData;
        }

        function mockData() {
            var data = {
                publish: [{
                    "id": 367,
                    "date": "2016-02-01T12:18:44",
                    "date_gmt": "2016-02-01T12:18:44",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsaf-2"},
                    "modified": "2016-02-01T12:18:44",
                    "modified_gmt": "2016-02-01T12:18:44",
                    "slug": "fsaf-2",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsaf-2",
                    "title": {"rendered": "fsaf"},
                    "content": {"rendered": "<p>fasfas<\/p>\n"},
                    "excerpt": {"rendered": "<p>fasfas<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/367"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=367"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=367"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/367\/meta"
                        }]
                    }
                }, {
                    "id": 366,
                    "date": "2016-02-01T11:52:51",
                    "date_gmt": "2016-02-01T11:52:51",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsf"},
                    "modified": "2016-02-01T11:52:51",
                    "modified_gmt": "2016-02-01T11:52:51",
                    "slug": "fsf",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsf",
                    "title": {"rendered": "fsf"},
                    "content": {"rendered": "<p>fasfs<\/p>\n"},
                    "excerpt": {"rendered": "<p>fasfs<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/366"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=366"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=366"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/366\/meta"
                        }]
                    }
                }, {
                    "id": 365,
                    "date": "2016-02-01T11:48:47",
                    "date_gmt": "2016-02-01T11:48:47",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsaf"},
                    "modified": "2016-02-01T11:48:47",
                    "modified_gmt": "2016-02-01T11:48:47",
                    "slug": "fsaf",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsaf",
                    "title": {"rendered": "fsaf"},
                    "content": {"rendered": "<p>fasf<\/p>\n"},
                    "excerpt": {"rendered": "<p>fasf<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/365"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=365"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=365"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/365\/meta"
                        }]
                    }
                }, {
                    "id": 364,
                    "date": "2016-02-01T11:41:50",
                    "date_gmt": "2016-02-01T11:41:50",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsfa-3"},
                    "modified": "2016-02-01T11:41:50",
                    "modified_gmt": "2016-02-01T11:41:50",
                    "slug": "fsfa-3",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsfa-3",
                    "title": {"rendered": "fsfa"},
                    "content": {"rendered": "<p>fsaf<\/p>\n"},
                    "excerpt": {"rendered": "<p>fsaf<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/364"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=364"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=364"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/364\/meta"
                        }]
                    }
                }, {
                    "id": 363,
                    "date": "2016-02-01T11:40:05",
                    "date_gmt": "2016-02-01T11:40:05",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsfa-2"},
                    "modified": "2016-02-01T11:40:05",
                    "modified_gmt": "2016-02-01T11:40:05",
                    "slug": "fsfa-2",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsfa-2",
                    "title": {"rendered": "fsfa"},
                    "content": {"rendered": "<p>fsaf<\/p>\n"},
                    "excerpt": {"rendered": "<p>fsaf<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/363"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=363"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=363"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/363\/meta"
                        }]
                    }
                }, {
                    "id": 362,
                    "date": "2016-02-01T11:38:46",
                    "date_gmt": "2016-02-01T11:38:46",
                    "guid": {"rendered": "http:\/\/vccw.dev\/archives\/userpost\/fsfa"},
                    "modified": "2016-02-01T11:38:46",
                    "modified_gmt": "2016-02-01T11:38:46",
                    "slug": "fsfa",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/archives\/userpost\/fsfa",
                    "title": {"rendered": "fsfa"},
                    "content": {"rendered": "<p>fsaf<\/p>\n"},
                    "excerpt": {"rendered": "<p>fsaf<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/362"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=362"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=362"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/362\/meta"
                        }]
                    }
                }],
                draft: [{
                    "id": 369,
                    "date": "2016-02-05T23:04:46",
                    "date_gmt": null,
                    "guid": {"rendered": "http:\/\/vccw.dev\/?post_type=userpost&p=369"},
                    "modified": "2016-02-05T23:04:46",
                    "modified_gmt": null,
                    "slug": "",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/?post_type=userpost&p=369",
                    "title": {"rendered": "fsafa"},
                    "content": {"rendered": "<p>dfasfa<\/p>\n"},
                    "excerpt": {"rendered": "<p>dfasfa<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/369"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=369"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=369"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/369\/meta"
                        }]
                    }
                }, {
                    "id": 368,
                    "date": "2016-02-01T12:45:20",
                    "date_gmt": null,
                    "guid": {"rendered": "http:\/\/vccw.dev\/?post_type=userpost&p=368"},
                    "modified": "2016-02-01T12:45:20",
                    "modified_gmt": null,
                    "slug": "",
                    "type": "userpost",
                    "link": "http:\/\/vccw.dev\/?post_type=userpost&p=368",
                    "title": {"rendered": "fsaf"},
                    "content": {"rendered": "<p>fasfas<\/p>\n"},
                    "excerpt": {"rendered": "<p>fasfas<\/p>\n"},
                    "author": 2,
                    "featured_media": 0,
                    "comment_status": "open",
                    "ping_status": "closed",
                    "_links": {
                        "self": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/368"}],
                        "collection": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost"}],
                        "about": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/types\/userpost"}],
                        "author": [{"embeddable": true, "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/users\/2"}],
                        "replies": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/comments?post=368"
                        }],
                        "https:\/\/api.w.org\/attachment": [{"href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/media?parent=368"}],
                        "https:\/\/api.w.org\/meta": [{
                            "embeddable": true,
                            "href": "http:\/\/vccw.dev\/wp-json\/wp\/v2\/userpost\/368\/meta"
                        }]
                    }
                }]
            };
            return {
                getData: function () {
                    return data;
                }
            };
        }
    }
})();
