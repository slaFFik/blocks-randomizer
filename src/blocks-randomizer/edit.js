import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { getBlockTypes } from '@wordpress/blocks';

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

	const blockProps = useBlockProps( {
		// className: 'wp-block-blocks-randomizer-holder-parent'
	});

	// Allow all blocks except self-referencing to be added as inner blocks.
	const allowedBlocks = useMemo( () => {
		return getBlockTypes()
			.map( ( block ) => block.name )
			.filter( ( blockName ) => blockName !== 'blocks-randomizer/holder' );
	}, [] );

	// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inner-blocks
	const innerBlocksProps = useInnerBlocksProps(
		{
			...blockProps,
			className: 'wp-block-blocks-randomizer-holder-inner',
		},
		{
			allowedBlocks: allowedBlocks,
			orientation: 'vertical',
			defaultBlock: {
				name: 'core/paragraph',
				attributes: {
					placeholder: __( 'Start typing or add any block inside this container...', 'blocks-randomizer' )
				}
			},
			templateLock: false,
		}
	);

	// innerBlocksProps.className = innerBlocksProps.className.replace( 'wp-block-blocks-randomizer-holder-parent', 'wp-block-blocks-randomizer-holder-inner' );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Display', 'blocks-randomizer' ) }
					initialOpen={ true }
				>
					<NumberControl
						__next40pxDefaultSize
						label={ __( 'Number of child blocks to display', 'blocks-randomizer' ) }
						help={ __( 'How many random blocks to show on the front-end. If you specify more than available, all blocks will be displayed.', 'blocks-randomizer' ) }
						value={ numberOfItems }
						onChange={ ( value ) => {
							console.log( 'value:', value );
							const numValue = Math.max( 0, parseInt( value, 10 ) );
							console.log( 'numValue:', numValue);
							setAttributes( { numberOfItems: numValue } );
						} }
						required={ true }
						min={ 0 }
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
