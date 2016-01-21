describe('postControllerのテスト',function() {
	//スコープを格納する変数
	var scope;
	//変数
	var content;
	var items;

	//モジュール有効化
	//beforeEach(module('relaApp.controller'));
	beforeEach(module('UserPosts'));
	//サービスをinject,初期化
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		var $rootScope = _$rootScope_;
		var $controller = _$controller_;

		$controller('postController', {$scope: $rootScope});
		var rscope=$rootScope;
		var data=[{type:'text',content:'aaasss'},{type:'text',content:'aaasss'},{type:'text',content:'aaasss'}];

		content=rscope.content={};
		items=rscope.items=data;

		scope = $rootScope.$new();
		$controller('postController', {$scope: scope});

	}));

	//methods

	//vm.getPosts = getPosts;
	//vm.sendPost = sendPost;
	//vm.updatePost = updatePost;
	//vm.deletePost = deletePost;

	it('should get inputs', function() {
		//TODO 入力データのチェック
		var items=rscope.$parent.items;
		expect(items.length).toBeGreaterThan(1);

	});

	it('should validate inputs', function() {
		//TODO 入力データのバリデーション


	});

	it('should add Post', function() {
		//TODO 入力データのwordpressへのPOST
		var draftPost={};
		var postType=['draft','public'];
		scope.addPost(post,type);
		expect(result).toBe('success');

		var posts=scope.fetchUserPosts(user);
		expect(posts.newPost).toEqual(draftPost);

	});

	it('should get posts', function() {
		//TODO 入力データのwordpressからの取得
		var posts=scope.getPosts();

		expect(posts.length).toBeGreaterThan(0);

	});


	it('should update posts', function() {
		//TODO 入力データのwordpressへのupdate
		var postContent;
		var postId;
		scope.updatePost(postContent,postId);
		expect(result).toBe('success');

		var posts=scope.fetchUserPosts(user,postId);
		expect(posts.postId).toBe(postContent);
	});
	it('should delete posts', function() {
		//TODO 入力データのwordpressでdelete

	});

	it('should delete posts', function() {
		//TODO 入力逐次保存(local storrage)

	});

});
