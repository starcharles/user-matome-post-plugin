<?php
/**
 * Plugin Name: Relaunch Post Page with AngularJS
 * Plugin URI: http://example.com
 * Description:This Plugin is made to build variable posting UI
 * Version: 0.0.1
 * Author: Naoto Satoh
 * Author URI:
 * License: GPL2
 */

define( 'MYPAGE_TITLE', 'ユーザー投稿用マイページ' );
define( 'MYPAGE_CONTENT', '[rela-postpage]' );
define( 'MYPAGE_POSTNAME', 'relaunch-mypage' ); //URL

define( 'HOME_TITLE', 'HOME' );
define( 'HOME_CONTENT', '[rela-home]' );
define( 'HOME_POSTNAME', 'relaunch-home' ); //URL


require_once( 'includes/rest.php' );

//register_activation_hook( __FILE__, array( 'RelaPlugin', 'activation_hook' ) );

class RelaPlugin {
	function activation_hook() {
		//	register_activation_hook();
		//依存プラグインのチェック、バージョン
	}

	function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'set_script_dependencies' ), 900 );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadLibraries' ), 900 );
		add_action( 'wp_enqueue_scripts', array( $this, 'localize_nonce' ), 1000 );
		add_action( 'wp_enqueue_scripts', array( $this, 'localize_angular_templates' ), 1000 );
		add_action( 'admin_init', array( $this, 'insertMypage' ) );
		add_shortcode( 'rela-postpage', array( $this, 'my_shortcode' ) );
		add_shortcode( 'rela-home', array( $this, 'add_shortcode_mypage' ) );
		add_shortcode( 'rela-preview', array( $this, 'add_shortcode_preview' ) );

	}

	/**
	 * ih     *
	 *
	 *
	 */
	function set_script_dependencies() {
		//ライブラリーファイル
		wp_register_script( 'jquery', plugin_dir_url( __FILE__ ) . 'js/lib/jquery-1.12.0.min.js' );
		wp_register_script( 'angular', plugin_dir_url( __FILE__ ) . ( 'js/lib/angular.min.js' ), array( 'jquery' ) );
		wp_register_script( 'angular-resource', plugin_dir_url( __FILE__ ) . 'js/lib/angular-resource.min.js', array( 'angular' ) );
		wp_register_script( 'angular-sanitize', plugin_dir_url( __FILE__ ) . 'js/lib/angular-sanitize.min.js', array( 'angular' ) );
		wp_register_script( 'angular-youtube', plugin_dir_url( __FILE__ ) . 'js/lib/angular-youtube-embed.js', array(
			'angular',
			'angular-resource',
			'angular-sanitize'
		) );
		wp_register_script( 'iframe-api', plugin_dir_url( __FILE__ ) . 'js/app/iframe_api.js' );
		wp_register_script( 'jquery-ui', plugin_dir_url( __FILE__ ) . 'js/lib/jquery-ui/jquery-ui.min.js', array( 'jquery' ) );
		wp_register_script( 'bootstrap', plugin_dir_url( __FILE__ ) . 'js/lib/bootstrap.min.js' );
		wp_register_script( 'ui-bootstrap-tpls', plugin_dir_url( __FILE__ ) . 'js/lib/ui-bootstrap-tpls.min.js', array( 'bootstrap' ) );
		wp_register_script( 'ui-sortable', plugin_dir_url( __FILE__ ) . 'js/lib/sortable.min.js' );


		//コード
		wp_register_script( 'main', plugin_dir_url( __FILE__ ) . 'js/app/main.js', array(
			'ui-bootstrap-tpls',
			'ui-sortable',
			'angular-youtube'
		) );
		wp_register_script( 'data-service', plugin_dir_url( __FILE__ ) . 'js/app/factory/dataService.js', array(
			'main',
			'wp-resource-factory'
		) );
		wp_register_script( 'post-controller', plugin_dir_url( __FILE__ ) . 'js/app/controller/postController.js', array( 'main' ) );
		wp_register_script( 'tab-controller', plugin_dir_url( __FILE__ ) . 'js/app/controller/tabController.js', array( 'main' ) );
		wp_register_script( 'youtube-controller', plugin_dir_url( __FILE__ ) . 'js/app/controller/youtubeController.js', array(
			'main',
			'tab-controller'
		) );
		wp_register_script( 'img-upload', plugin_dir_url( __FILE__ ) . 'js/app/controller/imgUpload.js', array(
			'main',
			'tab-controller'
		) );
		wp_register_script( 'items-view-controller', plugin_dir_url( __FILE__ ) . 'js/app/controller/itemsViewController.js', array(
			'main',
			'tab-controller'
		) );
		wp_register_script( 'home-controller', plugin_dir_url( __FILE__ ) . 'js/app/controller/homeController.js', array(
			'main',
			'wp-resource-factory',
			'data-service'
		) );
		wp_register_script( 'wp-resource-factory', plugin_dir_url( __FILE__ ) . 'js/app/factory/wpResourceFactory.js', array(
			'main',
			'tab-controller'
		) );
	}

	function loadLibraries() {
		//JS library files
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'jquery-ui' );
		wp_enqueue_script( 'angular' );
		wp_enqueue_script( 'angular-satitaize' );
		wp_enqueue_script( 'angular-resource' );
		wp_enqueue_script( 'angular-youtube' );
		wp_enqueue_script( 'bootstrap' );
		wp_enqueue_script( 'ui-bootstrap-tpls' );
		wp_enqueue_script( 'ui-sortable' );
		wp_enqueue_script( 'iframe_api' );

		//AngularJS scripts
		wp_enqueue_script( 'main' );
		wp_enqueue_script( 'img-upload' );
		wp_enqueue_script( 'tab-controller' );
		wp_enqueue_script( 'youtube-controller' );
		wp_enqueue_script( 'post-controller' );
		wp_enqueue_script( 'items-view-controller' );
		wp_enqueue_script( 'home-controller' );
		wp_enqueue_script( 'wp-resource-factory' );
		wp_enqueue_script( 'data-service' );

		//CSS
		wp_enqueue_style( 'bootstrap', plugin_dir_url( __FILE__ ) . 'css/bootstrap.min.css' );
		wp_enqueue_style( 'rela-mypage-style', plugin_dir_url( __FILE__ ) . 'css/style.css' );
	}

//	function angular_views(){
//		wp_localize_script(
//			'angular-views',
//			'myLocalized',
//			array(
//				'partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'
//			)
//		);
//	}


	//create a page when this plugin is activated
	function insertMypage() {
		if ( get_page_by_title( MYPAGE_TITLE ) ) {
			return;
		}

		$post = array(
			'post_content' => MYPAGE_CONTENT,
			'post_name'    => MYPAGE_POSTNAME,
			'post_type'    => 'page',
			'post_title'   => MYPAGE_TITLE,
			'post_status'  => 'publish'
		);

		wp_insert_post( $post, false );
	}

	//shortcode to render inserted page views

	/**
	 * @return string
	 */
	function my_shortcode() {
		$content = file_get_contents( plugin_dir_path( __FILE__ ) . '/views/mypage.html' );

		return $content;
	}

	function add_shortcode_mypage() {
		$content = file_get_contents( plugin_dir_path( __FILE__ ) . '/views/partials/home.html' );

		return $content;
	}

	function add_shortcode_preview() {
		$content = file_get_contents( plugin_dir_path( __FILE__ ) . '/views/partials/preview.html' );

		return $content;
	}

	function localize_nonce() {

		wp_localize_script(
			'main',
			'wpAngularVars',
			array( 'nonce' => wp_create_nonce( 'wp_rest' ) )
		);
	}

	//  /views/*htmlをAngularから読み込むため
	function localize_angular_templates() {

		//main.jsに適用する
		wp_localize_script( 'main',
			'myLocalizedViews',
			array(
				'views' =>  plugin_dir_url( __FILE__ ). '/views'
			)
		);
	}
}

new RelaPlugin();
new RestAPIEndPoint();
