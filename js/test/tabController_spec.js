/* jshint undef: true, unused: true, latedef: true */
/* jshint quotmark: single, eqeqeq: true, camelcase: true */
/* jshint node: true */

/* global inject */
'use strict';


describe('tabControllerのテスト',function(){
	//スコープを格納する変数
	var scope;
	var scope2;

	//変数
	var content;
	var items;

	//モジュール有効化
	beforeEach(module('UserPosts'));

	//サービスをinject,初期化
	beforeEach(inject(function(_$rootScope_,_$controller_){
		var $rootScope=_$rootScope_;
		var $controller=_$controller_;


		scope=$rootScope.$new();

		$controller('mainController',{$scope:scope});
		content=scope.content={};
		items=scope.items=[];

		scope2=scope.$new();
		$controller('tabController',{$scope:scope2});

	}));

	it('スコープのチェック',function(){
		//初期化チェック
		expect(content).toEqual({});
		expect(items).toEqual([]);
	});

	it('should add new item and reset "content" value',function(){
		var item1={text:'test',field2:'field2'};
		scope2.addItem('testType',item1);

		expect(content).toEqual({});
		expect(items.length).toEqual(1);
		expect(items[0].type).toEqual('testType');
		expect(items[0].content.text).toEqual('test');
		expect(items[0].content.field2).toEqual('field2');
	});

	it('should cancel and clear inputs', function() {
		scope2.content={field1:'field1'};
		scope2.cancel();
		expect(content).toEqual({});
	});

});
