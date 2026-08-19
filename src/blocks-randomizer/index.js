import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Include styles shared by the editor and front end.
import './style.scss';

import Edit from './edit';
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import Save from './save';

registerBlockType( metadata.name, {
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
	edit: Edit,
	save: Save,
} );
