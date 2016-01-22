<?php

/**
 * Created by PhpStorm.
 * User: Naoto Satoh
 * Date: 16/01/12
 * Time: 19:21
 */

define( 'POST_TYPE', 'user-post' );

class RestAPIEndPoint {

	function __construct() {
		// カスタム投稿タイプを追加
		add_action( 'init', array( $this, 'add_custom_post_type' ), 30 );
		add_action( 'rest_insert_post', array($this,'add_custom_field'),10,3);
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
			'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt','custom-fields', 'comments' )
		);

		if ( ! isset( $wp_post_types[ $post_type ] ) ) {
			register_post_type( $post_type, $args );
		}
	}

	function create_item( $request ) {
		if ( ! empty( $request['id'] ) ) {
			return new WP_Error( 'rest_post_exists', __( 'Cannot create existing post.' ), array( 'status' => 400 ) );
		}

		$post = $this->prepare_item_for_database( $request );
		if ( is_wp_error( $post ) ) {
			return $post;
		}

		$post->post_type = $this->post_type;
		$post_id = wp_insert_post( $post, true );

		if ( is_wp_error( $post_id ) ) {

			if ( in_array( $post_id->get_error_code(), array( 'db_insert_error' ) ) ) {
				$post_id->add_data( array( 'status' => 500 ) );
			} else {
				$post_id->add_data( array( 'status' => 400 ) );
			}
			return $post_id;
		}
		$post->ID = $post_id;

		$schema = $this->get_item_schema();

		if ( ! empty( $schema['properties']['sticky'] ) ) {
			if ( ! empty( $request['sticky'] ) ) {
				stick_post( $post_id );
			} else {
				unstick_post( $post_id );
			}
		}

		if ( ! empty( $schema['properties']['featured_image'] ) && isset( $request['featured_image'] ) ) {
			$this->handle_featured_image( $request['featured_image'], $post->ID );
		}

		if ( ! empty( $schema['properties']['format'] ) && ! empty( $request['format'] ) ) {
			set_post_format( $post, $request['format'] );
		}

		if ( ! empty( $schema['properties']['template'] ) && isset( $request['template'] ) ) {
			$this->handle_template( $request['template'], $post->ID );
		}

		$this->update_additional_fields_for_object( get_post( $post_id ), $request );

		/**
		 * Fires after a single post is created or updated via the REST API.
		 *
		 * @param object          $post      Inserted Post object (not a WP_Post object).
		 * @param WP_REST_Request $request   Request object.
		 * @param bool            $creating  True when creating post, false when updating.
		 */
		do_action( 'rest_insert_post', $post, $request, true );

		$get_request = new WP_REST_Request;
		$get_request->set_param( 'id', $post_id );
		$get_request->set_param( 'context', 'edit' );
		$response = $this->get_item( $get_request );
		$response = rest_ensure_response( $response );
		$response->set_status( 201 );
		$response->header( 'Location', rest_url( '/wp/v2/' . $this->get_post_type_base( $post->post_type ) . '/' . $post_id ) );

		return $response;
	}


	//カスタムフィールドを追加
	function add_custom_field($post, $request,$creating){
		$parameters = $request->get_body();
		$json=json_decode($parameters);

		$unique=false;

		foreach($json->items as $item){
			$key=$item->type;
			$value=$item->content;
			$id =add_post_meta( $post->ID, $key, $value, $unique );

			if(false==$id){
				return new WP_Error('100','カスタムフィールド投稿エラー');
			}
		}

//		return $result;
		return;
	}


}

