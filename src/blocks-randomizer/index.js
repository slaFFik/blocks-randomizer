/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import Save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	keywords: [
		__( 'content', 'blocks-randomizer' ),
		__( 'random', 'blocks-randomizer' ),
		__( 'randomizer', 'blocks-randomizer' ),
	],
	example: {
		innerBlocks: [
			{
				name: 'core/heading',
				attributes: {
					level: 1,
					content: __(
						'Randomly display custom block inside',
						'blocks-randomizer'
					),
				},
			},
			{
				name: 'core/spacer',
				attributes: {
					height: '25px',
				},
			},
			{
				name: 'core/heading',
				attributes: {
					level: 2,
					content: __( 'it can be images …', 'blocks-randomizer' ),
				},
			},
			{
				name: 'core/heading',
				attributes: {
					level: 2,
					content: __( '… or any text blocks', 'blocks-randomizer' ),
				},
			},
		],
	},
	edit: Edit,
	save: Save,
} );
