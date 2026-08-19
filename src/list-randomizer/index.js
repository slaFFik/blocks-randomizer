/**
 * Extends the core/list block with a "Randomize" toggle that shuffles
 * list items on each server-side render.
 */
import { addFilter } from '@wordpress/hooks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

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
					<PanelBody
						title={ __( 'Randomization', 'blocks-randomizer' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Randomize', 'blocks-randomizer' ) }
							help={ __(
								'Shuffle list items on each page load. Note: with full-page caching, the order changes only when the cache is regenerated.',
								'blocks-randomizer'
							) }
							checked={ randomize }
							onChange={ ( value ) =>
								setAttributes( { randomize: value } )
							}
						/>
					</PanelBody>
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
