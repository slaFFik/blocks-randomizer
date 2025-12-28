<?php
/**
 * Server-side rendering for List block randomization.
 *
 * This file adds a render callback filter to the core/list block
 * to randomize list items when the randomize attribute is enabled.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter the rendered output of the core/list block to randomize list items.
 *
 * @param string   $block_content The block content.
 * @param array    $block         The full block, including name and attributes.
 * @param WP_Block $instance      The block instance.
 *
 * @return string The modified block content.
 */
function blocks_randomizer_list_render_callback( $block_content, $block, $instance ) {
	// Only process core/list blocks.
	if ( 'core/list' !== $block['blockName'] ) {
		return $block_content;
	}

	// Check if randomize attribute is enabled.
	$randomize = isset( $block['attrs']['randomize'] ) && $block['attrs']['randomize'];

	if ( ! $randomize ) {
		return $block_content;
	}

	// Parse the HTML content to find list items.
	$dom = new DOMDocument();
	// Suppress warnings for malformed HTML.
	libxml_use_internal_errors( true );
	
	// Load HTML with UTF-8 encoding.
	$dom->loadHTML( '<?xml encoding="UTF-8">' . $block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
	
	// Clear any errors.
	libxml_clear_errors();

	// Find the list element (ul or ol).
	$xpath = new DOMXPath( $dom );
	$lists = $xpath->query( '//ul | //ol' );

	if ( $lists->length === 0 ) {
		return $block_content;
	}

	// Process each list (usually just one).
	foreach ( $lists as $list ) {
		// Get all direct li children.
		$list_items = array();
		foreach ( $list->childNodes as $child ) {
			if ( $child->nodeType === XML_ELEMENT_NODE && $child->nodeName === 'li' ) {
				$list_items[] = $child;
			}
		}

		// If we have list items, randomize them.
		if ( count( $list_items ) > 1 ) {
			// Remove all list items from the list.
			foreach ( $list_items as $item ) {
				$list->removeChild( $item );
			}

			// Shuffle the list items array.
			shuffle( $list_items );

			// Re-append the list items in random order.
			foreach ( $list_items as $item ) {
				$list->appendChild( $item );
			}
		}
	}

	// Save the modified HTML.
	$modified_content = $dom->saveHTML();
	
	// Remove the XML encoding declaration that was added.
	$modified_content = str_replace( '<?xml encoding="UTF-8">', '', $modified_content );

	return $modified_content;
}

add_filter( 'render_block', 'blocks_randomizer_list_render_callback', 10, 3 );
