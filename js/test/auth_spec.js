/* jshint undef: true, unused: true, latedef: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true */

/* global inject */
'use strict';


describe('user auth test',function() {
	//スコープを格納する変数
	var scope;
	//モジュール有効化
	beforeEach(module('UserPosts'));
	//サービスをinject,初期化
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		var $rootScope = _$rootScope_;
		var $controller = _$controller_;
		scope = $rootScope.$new();
		$controller('tabController', {$scope: scope});
	}));

	//TODO 認証に関係するテスト
	it('スコープのチェック', function() {
		//初期化チェック

	});

	it('should auth user ', function() {

		var isAuth=userAuth();

		expect(isAuth).toBeTruthy();

	});

});
