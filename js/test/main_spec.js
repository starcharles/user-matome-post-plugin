/* jshint undef: true, unused: true, latedef: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true */

/* global inject */
'use strict';


describe('mainControllerのテスト',function(){
	//スコープを格納する変数
	var scope;
	//変数
	var content;
	var items;

	//モジュール有効化
	beforeEach(module('UserPosts'));

	//サービスをinject,初期化
	beforeEach(inject(function(_$rootScope_,_$controller_){
		var $rootScope=_$rootScope_;
		var $controller=_$controller_;

		$controller('mainController',{$scope:$rootScope});
		scope=$rootScope.$new();

		content=scope.content;
		items=scope.items;
	}));

	it('ユーザーログイン状態のテスト', function() {
		// TODO ログイン状態の確認と、リダイレクト

		///////

	});

	it('ユーザーログアウトのテスト', function() {
		// TODO ログアウト

		///////

	});


	it('スコープのチェック',function(){
		//初期化チェック
		expect(content).toEqual({});
		expect(items).toEqual([]);
	});


});
