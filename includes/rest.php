<?php

/**
 * Created by PhpStorm.
 * User: ns
 * Date: 16/01/12
 * Time: 19:21
 */

class RestAPIEndPoint {

	function __construct() {
		// カスタム投稿タイプを定義
		add_action( 'init', 'register_custom_post_type' );

	}


	//create new Endpoint for WP REST API
	function register_custom_post_type() {
		$post_type = 'user-post';

		$labels = array(
			'name'               => _x( 'まとめ', 'matome' ),
			'singular_name'      => _x( 'まとめ', 'matome' ),
			'add_new'            => _x( '新規追加', 'matome' ),
			'add_new_item'       => _x( '新しいまとめを追加', 'matome' ),
			'edit_item'          => _x( 'まとめを編集', 'matome' ),
			'new_item'           => _x( '新しいまとめ', 'matome' ),
			'view_item'          => _x( 'まとめを見る', 'matome' ),
			'search_items'       => _x( 'まとめ検索', 'matome' ),
			'not_found'          => _x( '投稿が見つかりません', 'matome' ),
			'not_found_in_trash' => _x( 'ゴミ箱に投稿はありません', 'matome' ),
			'parent_item_colon'  => _x( '親まとめ:', 'matome' ),
			'menu_name'          => _x( 'まとめ', 'matome' ),
		);

		$args = array(
			'labels'                => $labels,
			'description'           => __( 'Description.', 'ユーザー投稿専用' ),
			'public'                => true,
			'publicly_queryable'    => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'query_var'             => true,
			'rewrite'               => array( 'slug' => 'userpost' ),
			'capability_type'       => 'post',
			'has_archive'           => true,
			'hierarchical'          => false,
			'menu_position'         => null,
			'show_in_rest'          => true,
			'supports'              => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
//        'rest_base'          => 'user-posts',
//			'rest_controller_class' => 'WP_REST_Posts_Controller',

		);

		register_post_type( $post_type, $args );
	}
}


