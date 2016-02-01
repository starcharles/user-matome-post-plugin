<?php

/**
 * Created by PhpStorm.
 * User: Naoto Satoh
 * Date: 16/01/12
 * Time: 19:21
 */

define( 'POST_TYPE', 'userpost' );

class RestAPIEndPoint {

	function __construct() {
		// カスタム投稿タイプを追加
		add_action( 'init', array( $this, 'add_custom_post_type' ), 30 );
		add_action( 'rest_insert_' . POST_TYPE, array( $this, 'add_custom_field' ), 10, 3 );
//		add_action( 'rest_insert_post', array( $this, 'update_custom_field' ), 10, 3 );
//		add_action( 'rest_insert_post', array( $this, 'delete_custom_field' ), 10, 3 );
	}

	//create new Endpoint for WP REST API
	function add_custom_post_type() {

		global $wp_post_types;

		//be sure to set this to the name of your post type!
		$post_type = POST_TYPE;

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

		$capabilities = array(
			'create_posts'           => 'create_userposts',
			// 自分の投稿を編集する権限
			'edit_posts'             => 'edit_userposts',
			// 他のユーザーの投稿を編集する権限
//			'edit_others_posts' => 'edit_others_userposts',
			// 投稿を公開する権限
			'publish_posts'          => 'publish_userposts',
			// プライベート投稿を閲覧する権限
			'read_private_posts'     => 'read_private_userposts',
			// 自分の投稿を削除する権限
			'delete_posts'           => 'delete_userposts',
			// プライベート投稿を削除する権限
			'delete_private_posts'   => 'delete_private_userposts',
			// 公開済み投稿を削除する権限
			'delete_published_posts' => 'delete_published_matomes',
			// 他のユーザーの投稿を削除する権限
			'delete_others_posts'    => 'delete_others_userposts',
			// プライベート投稿を編集する権限
			'edit_private_posts'     => 'edit_private_userposts',
			// 公開済みの投稿を編集する権限
			'edit_published_posts'   => 'edit_published_userposts',
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
			'capability_type'    => 'userpost',
//			'capabilities'    => $capabilities,
			'map_meta_cap'       => true,
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'show_in_rest'       => true,
			'supports'           => array(
				'title',
				'editor',
				'author',
				'thumbnail',
				'excerpt',
				'custom-fields',
				'comments'
			)
		);

		if ( ! isset( $wp_post_types[ $post_type ] ) ) {
			register_post_type( $post_type, $args );
		}
	}

	//カスタムフィールドを一括で追加
	function add_custom_field( $post, $request, $creating ) {
		$parameters = $request->get_body();
		$json       = json_decode( $parameters );
		$unique     = false;

		if ( true == $creating ) {
			//creating new
			foreach ( $json->items as $item ) {
				$key   = $item->type;
				$value = $item->content;
				$id    = add_post_meta( $post->ID, $key, $value, $unique );

				if ( false == $id ) {
					return new WP_Error( 'cannot_create_custom_field', 'カスタムフィールド投稿エラー', array( 'status' => 400 ) );
				}
			}
		}
	}


//	function update_custom_field( $post, $request, $flag ) {
//
//		$parameters = $request->get_body();
//		$json       = json_decode( $parameters );
//
//		//updating
//		foreach ( $json->items as $item ) {
//			$key   = $item->type;
//			$value = $item->content;
//			$types = array( 'text', 'citation', 'youtube', 'headline', 'link', 'amazon' );
//
//			foreach ( $types as $type ) {
//				$storedVal = get_post_meta( $post->ID, $type );
//				if ( isset( $storedVal ) ) {
//					foreach ( $storedVal as $prev ) {
//						$result = update_post_meta( $post->ID, $type, $meta_value, $prev );
//
//						if ( false == $result ) {
//							return new WP_Error( '120', 'カスタムフィールド投稿エラー' );
//						}
//					}
//				}
//			}
//		}
//
//	}

}

