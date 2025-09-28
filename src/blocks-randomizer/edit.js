/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

/**
 * WordPress components and element hooks
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const [ allowedBlocks ] = useState( null ); // Allow all blocks

	const blockProps = useBlockProps( {
		// className: 'wp-block-blocks-randomizer',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		// blockProps,
		{
			allowedBlocks,
			template: [
				[ 'core/paragraph', {
					placeholder: __( 'Start typing or add any block inside this container...', 'blocks-randomizer' )
				} ]
			],
			templateLock: false,
			renderAppender: () => null, // Hide the default appender to make it look more like a "holder".
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Container Settings', 'paragraph-container-block-wp' ) }
					initialOpen={ true }
				>
					<p>
						{ __( 'This container behaves like a paragraph but can hold any blocks inside.', 'paragraph-container-block-wp' ) }
					</p>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
