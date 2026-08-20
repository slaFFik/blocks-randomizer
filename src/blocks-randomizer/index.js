import { createBlock, registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Include styles shared by the editor and front end.
import './style.scss';

import Edit from './edit';
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import Save from './save';

const BLOCK_NAME = metadata.name;
const GROUP_BLOCK_NAME = 'core/group';

registerBlockType( BLOCK_NAME, {
	icon: <Icon />,
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
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ GROUP_BLOCK_NAME ],
				isMatch: ( attributes, block ) =>
					block.innerBlocks.length >= 2 &&
					! block.innerBlocks.some(
						( innerBlock ) => innerBlock.name === BLOCK_NAME
					),
				transform: ( attributes, innerBlocks ) =>
					createBlock(
						BLOCK_NAME,
						{ numberOfItems: 1 },
						innerBlocks
					),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ GROUP_BLOCK_NAME ],
				transform: ( attributes, innerBlocks ) =>
					createBlock( GROUP_BLOCK_NAME, {}, innerBlocks ),
			},
		],
	},
	edit: Edit,
	save: Save,
} );
