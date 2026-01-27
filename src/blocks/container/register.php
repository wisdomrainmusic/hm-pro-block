<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', function () {
	$dir = HMPB_PATH . 'src/blocks/container';

	if ( file_exists( $dir . '/block.json' ) ) {
		register_block_type_from_metadata(
			$dir,
			[
				'render_callback' => function ( $attrs, $content ) {
					$classes = [ 'hmpb-container' ];
					if ( ! empty( $attrs['isFullWidth'] ) ) {
						$classes[] = 'is-fullwidth';
					}

					$style = '';
					// basic padding support (desktop only in render; editor can be responsive)
					if ( isset( $attrs['padding'] ) && is_array( $attrs['padding'] ) ) {
						$p      = $attrs['padding'];
						$top    = isset( $p['top'] ) ? intval( $p['top'] ) : 0;
						$right  = isset( $p['right'] ) ? intval( $p['right'] ) : 0;
						$bottom = isset( $p['bottom'] ) ? intval( $p['bottom'] ) : 0;
						$left   = isset( $p['left'] ) ? intval( $p['left'] ) : 0;
						$style  = sprintf( 'style="padding:%dpx %dpx %dpx %dpx;"', $top, $right, $bottom, $left );
					}

					return sprintf(
						'<div class="%s" %s>%s</div>',
						esc_attr( implode( ' ', $classes ) ),
						$style,
						$content
					);
				},
			]
		);
	}
} );
