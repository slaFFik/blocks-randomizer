/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Add randomize attribute to core/list block.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Modified block settings.
 */
function addRandomizeAttribute( settings, name ) {
	if ( name !== 'core/list' ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			randomize: {
				type: 'boolean',
				default: false,
			},
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'blocks-randomizer/list-randomizer/add-randomize-attribute',
	addRandomizeAttribute
);

/**
 * Add toggle control to core/list block inspector.
 *
 * @param {Function} BlockEdit Original BlockEdit component.
 * @return {Function} Modified BlockEdit component.
 */
const withRandomizeControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes } = props;

		if ( name !== 'core/list' ) {
			return <BlockEdit { ...props } />;
		}

		const { randomize } = attributes;

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<div style={ { padding: '16px' } }>
						<ToggleControl
							label={ __( 'Randomize', 'blocks-randomizer' ) }
							help={ __(
								'Randomize the order of list items on each page load.',
								'blocks-randomizer'
							) }
							checked={ randomize || false }
							onChange={ ( value ) =>
								setAttributes( { randomize: value } )
							}
						/>
					</div>
				</InspectorControls>
			</>
		);
	};
}, 'withRandomizeControl' );

addFilter(
	'editor.BlockEdit',
	'blocks-randomizer/list-randomizer/with-randomize-control',
	withRandomizeControl
);

/**
 * Add randomize attribute to block save content.
 *
 * @param {Object} extraProps Additional props for the block.
 * @param {Object} blockType  Block type definition.
 * @param {Object} attributes Block attributes.
 * @return {Object} Modified extraProps.
 */
function saveRandomizeAttribute( extraProps, blockType, attributes ) {
	if ( blockType.name !== 'core/list' ) {
		return extraProps;
	}

	if ( attributes.randomize ) {
		extraProps[ 'data-randomize' ] = 'true';
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'blocks-randomizer/list-randomizer/save-randomize-attribute',
	saveRandomizeAttribute
);
