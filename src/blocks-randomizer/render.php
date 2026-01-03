<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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

	if ( $number_of_items === 0 ) {
		return;
	}

	// Get all inner blocks as an array.
	$inner_blocks = iterator_to_array( $block->inner_blocks );
	$total_blocks = count( $inner_blocks );

	// Check if session-based repeat prevention is enabled.
	$prevent_repeats = isset( $attributes['preventRepeatsUsingSession'] ) && (bool) $attributes['preventRepeatsUsingSession'];

	// If requesting more blocks than available, display all of them.
	if ( $number_of_items >= $total_blocks ) {
		$random_blocks = $inner_blocks;
		$random_keys   = array_keys( $inner_blocks );
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

	// Shuffle the selected blocks if shuffle is enabled and more than 1 block is displayed.
	$shuffle = isset( $attributes['shuffle'] ) && (bool) $attributes['shuffle'];

	if ( $shuffle && $number_of_items > 1 && count( $random_blocks ) > 1 ) {
		shuffle( $random_blocks );
		// Update random_keys to reflect the shuffled order.
		$random_keys = array_keys( $random_blocks );
	}

	// If prevent repeats is enabled, wrap output and add data attributes.
	if ( $prevent_repeats ) {
		// Generate a unique block instance ID based on block attributes and position.
		$block_id = 'br-' . md5( wp_json_encode( $block->parsed_block ) );

		// Create a mapping of original indices for all inner blocks.
		$all_indices = array_keys( $inner_blocks );

		printf(
			'<div class="blocks-randomizer-wrapper" data-block-id="%s" data-prevent-repeats="true" data-all-indices="%s" data-selected-indices="%s">',
			esc_attr( $block_id ),
			esc_attr( wp_json_encode( $all_indices ) ),
			esc_attr( wp_json_encode( $random_keys ) )
		);
	}

	// Render each selected block.
	foreach ( $random_blocks as $index => $random_block ) {
		if ( $prevent_repeats ) {
			// Wrap each block with data attribute for identification.
			$original_key = $random_keys[ $index ];
			printf(
				'<div class="blocks-randomizer-child" data-child-index="%d">',
				esc_attr( $original_key )
			);
		}

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $random_block->render();

		if ( $prevent_repeats ) {
			echo '</div>';
		}
	}

	if ( $prevent_repeats ) {
		echo '</div>';
	}
}
