<?php

/**
 * Created by PhpStorm.
 * User: ns
 * Date: 16/01/12
 * Time: 19:21
 */
class RestAPIEndPoint {

	function __construct() {
		// カスタム投稿タイプを追加
		add_action( 'init', array($this,'add_custom_post_type'),30 );
	}

	//create new Endpoint for WP REST API
	function add_custom_post_type() {

		global $wp_post_types;

		//be sure to set this to the name of your post type!
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
			'labels'             => $labels,
			'description'        => __( 'Description.', 'ユーザー投稿専用' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'userpost' ),
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'show_in_rest'       => true,
			'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
		);

		if( !isset( $wp_post_types[ $post_type] ) ) {
			register_post_type( $post_type, $args );
		}
	}
}

