<?php
/**
 * Plugin Name: HM Pro Blocks
 * Description: Professional Gutenberg blocks for HM Pro ecosystem.
 * Version: 0.0.2
 * Author: WisdomRain
 * Text Domain: hm-pro-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HMPB_PATH', plugin_dir_path( __FILE__ ) );
define( 'HMPB_URL', plugin_dir_url( __FILE__ ) );
define( 'HMPB_VER', '0.0.2' );

require_once HMPB_PATH . 'src/init.php';
