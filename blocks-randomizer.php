<?php
/**
 * Plugin Name:       Content Randomizer - Rotate Any Block
 * Plugin URI:        https://github.com/slaffik/blocks-randomizer
 * Description:       Show a random selection of child blocks on every page load. Great for rotating testimonials, CTAs, and banners.
 * Version:           1.5.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Slava Abakumov
 * Author URI:        https://ovirium.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocks-randomizer
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers block metadata and assets from the generated manifest.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 */
function blocks_randomizer_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}

add_action( 'init', 'blocks_randomizer_block_init' );
