describe('youtubeControllerのテスト',function(){
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
		var vm=$rootScope;
		content=vm.content={};
		items=vm.items=[];

		scope=$rootScope.$new();
		$controller('tabController',{$scope:scope});
		scope2=scope.$new();
		$controller('youtubeController',{$scope:scope2});
	}));

	it('スコープのチェック',function(){
		//初期化チェック
		expect(content).toEqual({});
		expect(items).toEqual([]);
		expect(scope2.hideYoutube).toBeTruthy();
	});

	it('should check the input youtube link as valid', function() {
		//TODO:リンクのバリデーションチェック
		var link='https://www.youtube.com/watch?v=NuNvCOUy1Ts';
		expect(scope2.check(link)).toBeTruthy();

		expect(scope2.hideYoutube).not.toBeTruthy();


	});

	it('should cancel and clear inputs', function() {
		scope2.content={link:'https://www.youtube.com/watch?v=NuNvCOUy1Ts'};
		scope2.cancel();
		expect(content).toEqual({});
	});

	it('should add new item and then reset "content" value',function(){
		var item1={field1:'field2'};
		var item2={youtubeUrl:'https://www.youtube.com/watch?v=NuNvCOUy1Ts'};

		//key!=youtubeUrl の場合
		scope2.addYoutubeItem('youtube',item1);
		expect(items).toEqual([]);
		expect(content).toEqual({});

		scope2.addYoutubeItem('youtube',item2);
		expect(items.length).toEqual(1);
		expect(content).toEqual({});

		expect(scope2.hideYoutube).toBeTruthy();
	});
	
	it('should call addItem of parent scope', function() {
		var item2={youtubeUrl:'https://www.youtube.com/watch?v=NuNvCOUy1Ts'};
		scope.addItem('youtube',item2);
		expect(items.length).toEqual(1);
		expect(content).toEqual({});
	});

});
