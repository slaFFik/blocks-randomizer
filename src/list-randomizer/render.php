<?php
/**
 * Server-side randomization for the core/list block.
 *
 * Hooks `render_block_data` and shuffles the inner list-item blocks before
 * rendering. This avoids HTML parsing entirely and works for the modern
 * (v2) list block where list items are inner blocks.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Shuffle core/list inner blocks when the randomize attribute is set.
 *
 * @param array $parsed_block The parsed block array (name, attrs, innerBlocks, innerContent, innerHTML).
 *
 * @return array The (possibly shuffled) parsed block.
 */
function blocks_randomizer_list_shuffle_items( $parsed_block ) {
	if ( 'core/list' !== $parsed_block['blockName'] ) {
		return $parsed_block;
	}

	if ( empty( $parsed_block['attrs']['randomize'] ) ) {
		return $parsed_block;
	}

	if ( ! empty( $parsed_block['innerBlocks'] ) && count( $parsed_block['innerBlocks'] ) > 1 ) {
		shuffle( $parsed_block['innerBlocks'] );
	}

	return $parsed_block;
}

add_filter( 'render_block_data', 'blocks_randomizer_list_shuffle_items' );
