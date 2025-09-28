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
	$random_inner_block = $block->inner_blocks[ array_rand( iterator_to_array( $block->inner_blocks ) ) ];

	echo $random_inner_block->render();
}
