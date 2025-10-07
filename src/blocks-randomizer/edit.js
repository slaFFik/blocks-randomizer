import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, __experimentalNumberControl as NumberControl } from '@wordpress/components';
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
 * @param {Object} props - Block props.
 * @param {Object} props.attributes - Block attributes.
 * @param {Function} props.setAttributes - Function to update block attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { numberOfItems } = attributes;
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
					title={ __( 'Display', 'blocks-randomizer' ) }
					initialOpen={ true }
				>
					<NumberControl
						label={ __( 'Number of child blocks to display', 'blocks-randomizer' ) }
						help={ __( 'How many random blocks to show on the front-end. If you specify more than available, all blocks will be displayed.', 'blocks-randomizer' ) }
						value={ numberOfItems }
						onChange={ ( value ) => {
							const numValue = parseInt( value, 10 );
							if ( numValue > 0 || value === '' ) {
								setAttributes( { numberOfItems: numValue || 1 } );
							}
						} }
						required={ true }
						min={ 1 }
						step={ 1 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
