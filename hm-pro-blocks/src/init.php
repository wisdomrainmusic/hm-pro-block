<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block category (top priority)
 */
add_filter( 'block_categories_all', function( $categories, $post ) {
	$hm = [
		'slug'  => 'hm-pro',
		'title' => 'HM Pro',
		'icon'  => null,
	];

	foreach ( $categories as $cat ) {
		if ( isset( $cat['slug'] ) && $cat['slug'] === 'hm-pro' ) {
			return $categories;
		}
	}

	array_unshift( $categories, $hm );
	return $categories;
}, 5, 2 );

require_once HMPB_PATH . 'src/blocks/index.php';

/**
 * Editor assets (placeholder-ready)
 */
add_action( 'enqueue_block_editor_assets', function () {
	$asset_file = HMPB_PATH . 'build/editor.asset.php';

	if ( file_exists( $asset_file ) ) {
		$asset = include $asset_file;
		wp_enqueue_script(
			'hmpb-editor',
			HMPB_URL . 'build/editor.js',
			$asset['dependencies'],
			$asset['version']
		);
	}

	wp_enqueue_style(
		'hmpb-editor',
		HMPB_URL . 'src/styles/editor.css',
		[],
		HMPB_VER
	);
}, 20 );

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'hmpb-frontend',
		HMPB_URL . 'src/styles/frontend.css',
		[],
		HMPB_VER
	);
}, 20 );
