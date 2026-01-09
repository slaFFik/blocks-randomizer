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
spatie_ray("did_action('wp_head')", did_action('wp_head'));

/* @var $block WP_Block */
if ( ! empty( $block->inner_blocks ) ) {
	// Get the number of items to display, default to 1.
	$number_of_items = isset( $attributes['numberOfItems'] ) ? absint( $attributes['numberOfItems'] ) : 1;

	if ( $number_of_items === 0 ) {
		return;
	}

	// Get all inner blocks as an array.
	$inner_blocks  = iterator_to_array( $block->inner_blocks );
	$random_blocks = [];

	// This id will be different every time the block holder inner blocks are changed (attributes do not affect this).
	$session_cookie_name = 'br_ids_' . md5( wp_json_encode( $inner_blocks ) );
	$stored_block_ids    = [];

	// Check if session-based repeat prevention is enabled.
	$prevent_repeats = isset( $attributes['preventRepeatsUsingSession'] ) && (bool) $attributes['preventRepeatsUsingSession'];

	if ( $prevent_repeats ) {
		$stored_block_ids = array_filter(
			(array) explode( ',', $_COOKIE[ $session_cookie_name ] ?? '' ),
			static function ( $hash ) {
				return ! empty( $hash ) && is_string( $hash ) && preg_match( '/^[a-f0-9]{32}$/i', $hash );
			}
		);
	} else {
		// Clear the cookie if it exists.
		if ( isset( $_COOKIE[ $session_cookie_name ] ) ) {
			setcookie(
				$session_cookie_name,
				'',
				[
					'expires'  => time() - 3600,
					'path'     => defined( 'COOKIEPATH' ) ? COOKIEPATH : '/',
					'secure'   => is_ssl(),
					'httponly' => true,
					'samesite' => 'Lax',
				]
			);
			unset( $_COOKIE[ $session_cookie_name ] );
		}
	}

	if ( empty( $stored_block_ids ) ) {
		/*
		 * We don't have the session IDs yet - pick new random blocks.
		 */
		$total_blocks  = count( $inner_blocks );

		// If requesting more blocks than available, display all of them.
		if ( $number_of_items >= $total_blocks ) {
			$random_blocks = $inner_blocks;
		} else {
			// Pick N random blocks.
			$random_keys = (array) array_rand( $inner_blocks, $number_of_items );

			foreach ( $random_keys as $key ) {
				$random_blocks[] = $inner_blocks[ $key ];
			}
		}

		// Shuffle the selected blocks if shuffle is enabled and more than 1 block is displayed.
		$shuffle = isset( $attributes['shuffle'] ) && (bool) $attributes['shuffle'];

		if ( $shuffle && $number_of_items > 1 && count( $random_blocks ) > 1 ) {
			shuffle( $random_blocks );
		}

		// Save to the session cookie only if the option is enabled.
		if ( $prevent_repeats ) {
			// Generate a unique block instance ID.
			$ids = array_map(
				static function ( $inner_block ) {
					return md5( wp_json_encode( $inner_block->parsed_block ) );
				},
				$random_blocks
			);

			// After 100 blocks we are approaching cookie size limits.
			if ( ! empty( $ids ) && count( $ids ) <= 100 ) {
				setcookie(
					$session_cookie_name,
					implode( ',', $ids ),
					[
						// Omit 'expires' to use a session cookie (setcookie() defaults to expires=0).
						'path'     => defined( 'COOKIEPATH' ) ? COOKIEPATH : '/',
						'secure'   => is_ssl(),
						'httponly' => true, // Don't allow JavaScript access.
						'samesite' => 'Lax',
					]
				);
			}
		}

	} else {
		/*
		 * Get the random blocks out of the session IDs - preserve the original (shuffled) order.
		 */
		foreach ( $stored_block_ids as $session_block_id ) {
			foreach ( $inner_blocks as $inner_block ) {
				$block_id = md5( wp_json_encode( $inner_block->parsed_block ) );

				if ( $block_id === $session_block_id ) {
					$random_blocks[] = $inner_block;
					break; // Found the block, move to the next session_block_id.
				}
			}
		}
	}

	// Render each selected block.
	foreach ( $random_blocks as $random_block ) {
		/* @var $random_block WP_Block */
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $random_block->render();
	}
}
