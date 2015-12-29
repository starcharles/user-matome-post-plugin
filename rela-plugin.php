<?php
/**
 * Plugin Name: Relaunch Post Page with AngularJS
 * Plugin URI: http://example.com
 * Description:This Plugin is made to build variable posting UI
 * Version: 0.0.1
 * Author: Naoto Satoh
 * Author URI: http://www.roysivan.com
 * License: GPL2
 */

define('MYPAGE_TITLE', 'ユーザー投稿用マイページ');
define('MYPAGE_CONTENT', '[rela-postpage]');
define('MYPAGE_POSTNAME', 'relaunch-mypage'); //URL

class RelaPlugin {

	function __construct() {
		add_action('wp_enqueue_scripts', array($this,'set_script_dependencies'),900);
		add_action('wp_enqueue_scripts', array($this, 'loadLibraries'), 1000);
		add_action('admin_init', array($this, 'insertMypage'));
		add_shortcode('rela-postpage', array($this,'my_shortcode'));
	}

	function set_script_dependencies() {
		wp_register_script('angular', plugin_dir_url(__FILE__) . ('js/angular.min.js'));
		wp_register_script('angular-resource', plugin_dir_url(__FILE__) . 'js/angular-resource.min.js');
		wp_register_script('angular-youtube', plugin_dir_url(__FILE__) . 'js/angular-youtube-embed.js',array('angular','angular-resource'));
		wp_register_script('bootstrap', plugin_dir_url(__FILE__) . 'js/bootstrap.min.js');
		wp_register_script('ui-bootstrap-tpls', plugin_dir_url(__FILE__) . 'js/ui-bootstrap-tpls.min.js',array('bootstrap'));
		wp_register_script('main-controller', plugin_dir_url(__FILE__) . 'js/main.js',array('ui-bootstrap-tpls','angular-youtube'));
		wp_register_script('youtube-controller', plugin_dir_url(__FILE__) . 'js/youtube-controller.js',array('main-controller'));
	}

	function loadLibraries() {
		//JS files
		wp_enqueue_script('angular-youtube', plugin_dir_url(__FILE__) . 'js/angular-youtube-embed.js');
//		wp_enqueue_script('ui-bootstrap-tpls', plugin_dir_url(__FILE__) . 'js/ui-bootstrap-tpls.min.js');
//		//AngularJS scripts
		wp_enqueue_script('youtube-controller', plugin_dir_url(__FILE__) . 'js/youtube-controller.js');
		//CSS
		wp_enqueue_style('bootstrap', plugin_dir_url(__FILE__) . 'css/bootstrap.min.css');
		wp_enqueue_style('rela-postpage', plugin_dir_url(__FILE__) . 'css/style.css');
	}


	function insertMypage() {
		if (get_page_by_title(MYPAGE_TITLE)) {
			return;
		}

		$post = array(
			'post_content' => MYPAGE_CONTENT,
			'post_name' => MYPAGE_POSTNAME,
			'post_type' => 'page',
			'post_title' => MYPAGE_TITLE,
			'post_status' => 'publish'
		);

		wp_insert_post($post, false);
	}

	function my_shortcode() {
		$content = file_get_contents(plugin_dir_url(__FILE__) . 'tab.html');
		return $content;
	}

}


new RelaPlugin();

