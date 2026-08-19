<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render template variables.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Serialized inner block content.
 * @var WP_Block $block      Block instance.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#render
 */

if ( ! empty( $block->inner_blocks ) ) {
	$number_of_items = isset( $attributes['numberOfItems'] ) ? absint( $attributes['numberOfItems'] ) : 1;

	if ( $number_of_items === 0 ) {
		return;
	}

	$inner_blocks  = iterator_to_array( $block->inner_blocks );
	$random_blocks = [];

	// Use separate repeat history for each inner block configuration.
	$session_cookie_name = 'br_ids_' . md5( wp_json_encode( $inner_blocks ) );
	$stored_block_ids    = [];

	$prevent_repeats = isset( $attributes['preventRepeatsUsingSession'] ) && (bool) $attributes['preventRepeatsUsingSession'];

	if ( $prevent_repeats ) {
		$stored_block_ids = array_filter(
			(array) explode( ',', $_COOKIE[ $session_cookie_name ] ?? '' ),
			static function ( $hash ) {
				return ! empty( $hash ) && is_string( $hash ) && preg_match( '/^[a-f0-9]{32}$/i', $hash );
			}
		);
	} else {
		// Remove repeat history when the option is disabled.
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
		// Select a new set when this configuration has no repeat history.
		$total_blocks  = count( $inner_blocks );

		// Display all blocks when the requested count meets or exceeds the total.
		if ( $number_of_items >= $total_blocks ) {
			$random_blocks = $inner_blocks;
		} else {
			// Select the requested number of blocks.
			$random_keys = (array) array_rand( $inner_blocks, $number_of_items );

			foreach ( $random_keys as $key ) {
				$random_blocks[] = $inner_blocks[ $key ];
			}
		}

		$shuffle = isset( $attributes['shuffle'] ) && (bool) $attributes['shuffle'];

		if ( $shuffle && $number_of_items > 1 && count( $random_blocks ) > 1 ) {
			shuffle( $random_blocks );
		}

		if ( $prevent_repeats ) {
			// Hash each selected block for lookup on the next request.
			$ids = array_map(
				static function ( $inner_block ) {
					return md5( wp_json_encode( $inner_block->parsed_block ) );
				},
				$random_blocks
			);

			// Limit each cookie to 100 hashes.
			if ( ! empty( $ids ) && count( $ids ) <= 100 ) {
				setcookie(
					$session_cookie_name,
					implode( ',', $ids ),
					[
						// Omitting expires creates a session cookie.
						'path'     => defined( 'COOKIEPATH' ) ? COOKIEPATH : '/',
						'secure'   => is_ssl(),
						'httponly' => true, // Prevent JavaScript access.
						'samesite' => 'Lax',
					]
				);
			}
		}

	} else {
		// Restore the saved selection in its original order.
		foreach ( $stored_block_ids as $session_block_id ) {
			foreach ( $inner_blocks as $inner_block ) {
				$block_id = md5( wp_json_encode( $inner_block->parsed_block ) );

				if ( $block_id === $session_block_id ) {
					$random_blocks[] = $inner_block;
					break; // Continue with the next stored ID.
				}
			}
		}
	}

	foreach ( $random_blocks as $random_block ) {
		/** @var WP_Block $random_block */
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Each block escapes its own rendered output.
		echo $random_block->render();
	}
}
