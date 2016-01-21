describe('imgUploadのテスト',function(){
	//スコープを格納する変数
	var scope;
	//変数

	//モジュール有効化
	beforeEach(module('UserPosts'));

	//サービスをinject,初期化
	beforeEach(inject(function(_$rootScope_,_$controller_){
		var $rootScope=_$rootScope_;
		var $controller=_$controller_;

		scope=$rootScope.$new();
		$controller('imgController',{$scope:scope});
	}));

	//TODO手動テストでいいか？

	it('スコープのチェック',function(){
		//初期化チェック
		//expect(scope.imageFileSrc).toBeUndefined();
	});

	it('fileReaderのテスト', function() {
		//expect().toEqual('test need here');

	});
	it('directiveのテスト', function() {
		//expect().toEqual('test need here');

	});

});
