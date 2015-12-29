<?php
/**
 * Plugin Name: AngularJS for WordPress
 * Plugin URI: http://www.roysivan.com/angularjs-for-wordpress
 * Description: This plugin will allow you to easily load WordPress content client-side using AngularJS. JSON REST API required.
 * Version: 3.0.0
 * Author: Roy Sivan
 * Author URI: http://www.roysivan.com
 * License: GPL2
 */

require_once('plugins/angularjs');
//require_once('includes/contentFilter.php');
//require_once('includes/shortcodes.php');


class WordPressAngularJS {

    function __init(){

        global $wpdb;
        add_action( 'wp_enqueue_scripts', array( $this, 'angularScripts' ) );

    }

    function angularScripts() {
        // Angular Core
        wp_enqueue_script('angular-core', plugin_dir_url( __FILE__ ).'js/angular.min.js', array('jquery'), null, false);
        wp_enqueue_script('angular-resource', plugin_dir_url( __FILE__ ).'js/angular-resource.min.js', array('jquery'), null, false);

        $angularjs_for_wp_localize = array(
            'site' => get_bloginfo('wpurl'),
            'nonce' => wp_create_nonce( 'wp_rest' ),
//            'template_directory' => $template_directory
        );

        if( function_exists( 'json_url' ) ) {
            $angularjs_for_wp_localize['base'] = json_url();
        }

        if( function_exists( 'rest_get_url_prefix' ) ) {
            $angularjs_for_wp_localize['base'] = get_bloginfo( 'wpurl') . '/' . rest_get_url_prefix() . '/wp/v2';
        }

        // Localize Variables
        wp_localize_script(
            'angular-core',
            'wpAngularVars',
            $angularjs_for_wp_localize
        );
    }

/** LOAD PLUGIN **/

$wpNG = new WordPressAngularJS();
add_action( 'init', array( $wpNG, '__init' ), 1000 );



?>
