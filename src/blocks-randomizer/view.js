/**
 * Front-end script for the Blocks Randomizer block.
 *
 * Handles session-based repeat prevention by storing selected block indices
 * in sessionStorage and ensuring the same blocks are displayed throughout
 * the user's session.
 */

/* global sessionStorage */

( function () {
	'use strict';

	/**
	 * Initialize blocks randomizer with session-based repeat prevention.
	 */
	function initBlocksRandomizer() {
		// Find all blocks with repeat prevention enabled.
		const blocks = document.querySelectorAll(
			'.blocks-randomizer-wrapper[data-prevent-repeats="true"]'
		);

		blocks.forEach( ( block ) => {
			const blockId = block.getAttribute( 'data-block-id' );
			const serverSelectedIndices = JSON.parse(
				block.getAttribute( 'data-selected-indices' )
			);

			// Create a session storage key for this block instance.
			const storageKey = `blocks_randomizer_${ blockId }`;

			// Try to retrieve existing selection from session storage.
			let selectedIndices;
			const storedSelection = sessionStorage.getItem( storageKey );

			if ( storedSelection ) {
				// Use stored selection from previous page loads.
				try {
					selectedIndices = JSON.parse( storedSelection );
				} catch ( e ) {
					// If parsing fails, use server selection and store it.
					selectedIndices = serverSelectedIndices;
					sessionStorage.setItem(
						storageKey,
						JSON.stringify( selectedIndices )
					);
				}
			} else {
				// First page load: store the server's selection.
				selectedIndices = serverSelectedIndices;
				sessionStorage.setItem(
					storageKey,
					JSON.stringify( selectedIndices )
				);
			}

			// If the stored selection differs from server selection, update DOM.
			if (
				storedSelection &&
				JSON.stringify( selectedIndices ) !==
					JSON.stringify( serverSelectedIndices )
			) {
				updateBlockDisplay( block, selectedIndices );
			}
		} );
	}

	/**
	 * Update the block display to show only the selected indices in the correct order.
	 *
	 * @param {HTMLElement} block           The wrapper block element.
	 * @param {Array}       selectedIndices Array of indices to display.
	 */
	function updateBlockDisplay( block, selectedIndices ) {
		// Get all child blocks.
		const children = Array.from(
			block.querySelectorAll( '.blocks-randomizer-child' )
		);

		// Create a map of index to child element for quick lookup.
		const childrenMap = {};
		children.forEach( ( child ) => {
			const index = parseInt(
				child.getAttribute( 'data-child-index' ),
				10
			);
			childrenMap[ index ] = child;
		} );

		// Hide all children initially.
		children.forEach( ( child ) => {
			child.style.display = 'none';
		} );

		// Show and reorder the selected children.
		selectedIndices.forEach( ( index, position ) => {
			const child = childrenMap[ index ];
			if ( child ) {
				child.style.display = '';
				// Reorder by setting the order property or moving in DOM.
				child.style.order = position;
			}
		} );

		// Apply flexbox to maintain order.
		block.style.display = 'flex';
		block.style.flexDirection = 'column';
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initBlocksRandomizer );
	} else {
		initBlocksRandomizer();
	}
} )();
