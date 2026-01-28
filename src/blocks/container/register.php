<?php

/**
 * Server-side renderer for HM Container.
 */

function hm_pro_render_container_block( $attributes, $content ) {
    $classes = array( 'hm-container' );

    // Back-compat toggle for full width.
    if ( ! empty( $attributes['isFullWidth'] ) ) {
        $classes[] = 'alignfull';
    }

    $wrapper_attributes = get_block_wrapper_attributes( array(
        'class' => implode( ' ', $classes ),
    ) );

    return sprintf(
        '<div %1$s>%2$s</div>',
        $wrapper_attributes,
        $content
    );
}

register_block_type( __DIR__, array(
    'render_callback' => 'hm_pro_render_container_block',
) );
