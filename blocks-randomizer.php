<?php
/**
 * Plugin Name:       Content Randomizer - Rotate Any Block
 * Plugin URI:        https://github.com/slaffik/blocks-randomizer
 * Description:       Display randomly any of the top-level blocks within the &quot;Blocks Randomizer&quot; main block.
 * Version:           1.4.0
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
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 */
function blocks_randomizer_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}

add_action( 'init', 'blocks_randomizer_block_init' );

/**
 * Include the server-side randomization logic for the core/list block.
 * The file registers a render_block_data filter; it is not a block render callback,
 * so it is not referenced from block.json and must be loaded manually.
 */
$list_randomizer_render_file = __DIR__ . '/build/list-randomizer/render.php';
if ( file_exists( $list_randomizer_render_file ) ) {
	require_once $list_randomizer_render_file;
}
