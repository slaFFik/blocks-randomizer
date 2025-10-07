<?php
/**
 * Available variables:
 * - $attributes (array)
 * - $content (string) Serialized inner blocks content.
 * - $block (WP_Block|null)
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 */

/* @var $block WP_Block */
if ( ! empty( $block->inner_blocks ) ) {
	// Get the number of items to display, default to 1.
	$number_of_items = isset( $attributes['numberOfItems'] ) ? absint( $attributes['numberOfItems'] ) : 1;

	// Get all inner blocks as an array.
	$inner_blocks = iterator_to_array( $block->inner_blocks );
	$total_blocks = count( $inner_blocks );

	// If requesting more blocks than available, display all of them.
	if ( $number_of_items >= $total_blocks ) {
		$random_blocks = $inner_blocks;
	} else {
		// Pick N random blocks.
		$random_keys = array_rand( $inner_blocks, $number_of_items );

		// array_rand returns a single value if $number_of_items is 1, so normalize to array.
		if ( ! is_array( $random_keys ) ) {
			$random_keys = array( $random_keys );
		}

		$random_blocks = array();
		foreach ( $random_keys as $key ) {
			$random_blocks[] = $inner_blocks[ $key ];
		}
	}

	// Render each selected block.
	foreach ( $random_blocks as $random_block ) {
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $random_block->render();
	}
}
