<?php
/**
* Plugin Name: Postaga
* Plugin URI: https://postaga.com
* Description: Automated link building and outreach with the help of a smart AI assistant.
* Version: 0.9
* Requires at least: 5.2
* Requires PHP:      5.3
* Author: Postaga
* License: GPLv2
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain: postaga
* Domain Path: /languages
*
* @package Postaga
*/

if ( ! defined( 'ABSPATH' ) ) {
    die( 'Access denied.' );
}

define( 'POSTAGA_NODE_NAME', 'Postaga' );

if ( ! class_exists( 'Postaga_Node' ) ) {

    class Postaga_Node {
        /**
         * Const storing the version to be used when enqueuing/registering assets.
         *
         * @since 1.0.0
         * @var String contains the version to be used when enqueing assets.
         */
        const VERSION = '1.0';

        /**
         * Constructor
         *
         * @since 1.0.0
         */
        function __construct() {
            $this->register_hook_callbacks();
        }

        /**
         * Register callbacks for actions and filters
         *
         * @since 1.0.0
         */
        /*public function register_hook_callbacks() {
            add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
        }*/

        /**
         * Registers Scripts related to Gutenberg/Block Editor.
         *
         * @since 1.0.0
         */
        /*public function enqueue() {
            wp_register_script(
                'postaga-node-script',
                plugin_dir_url( __FILE__ ) . 'js/postaga.js',
                ['jquery']
            );

            wp_enqueue_script('postaga-node-script');
        }*/

        /**
         * Register callbacks for actions and filters
         *
         * @since 1.0.0
         */
        public function register_hook_callbacks() {
            add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue' ) );
        }

        /**
         * Registers Scripts related to Gutenberg/Block Editor.
         *
         * @since 1.0.0
         */
        public function enqueue() {
            wp_enqueue_script(
                'postaga-node-script',
                plugin_dir_url( __FILE__ ) . 'js/postaga.js',
                ['wp-editor', 'wp-element', 'wp-i18n', 'wp-edit-post', 'wp-plugins', 'wp-element', 'wp-data', 'wp-url', 'lodash']
            );
            wp_localize_script(
                'postaga-node-script',
                'POSTAGA',
                array(
                    'icon' => plugins_url( 'assets/postaga-icon.png', __FILE__ )
                )
            );
        }


    } // end Postaga_Node

    new Postaga_Node();
}