describe('itemsViewController.jsのテスト',function() {
	//スコープを格納する変数
	var scope;
	//変数
	var content;
	var items;
	//モジュール有効化
	beforeEach(module('UserPosts'));

	beforeEach(inject(function(_$rootScope_,_$controller_){

		var $rootScope=_$rootScope_;
		var $controller=_$controller_;

		$controller('mainController',{$scope:$rootScope});
		var vm=$rootScope;
		content=vm.content={};
		items=vm.items=[];

		scope=$rootScope.$new();
		$controller('itemsViewController',{$scope:scope});


		//itemsに値をセット
		items=[]

	}));

	//並べ替え、編集のテスト

	it('上の並べ替え',function(){

	});
	it('下の並べ替え',function(){

	});

	it('編集のテスト',function(){

	});

	it('削除のテスト',function(){

	});

	it('途中からの追加のテスト',function(){

	});

});
