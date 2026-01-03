/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props             Block props.
 * @param {Object} props.attributes  Block attributes.
 * @param {Object} props.innerBlocks Inner blocks.
 *
 * @return {Element} Element to render.
 */
/* eslint-disable-next-line no-unused-vars */
export default function save( { attributes, innerBlocks } ) {
	const blockProps = useBlockProps.save( {
		// className: 'wp-block-blocks-randomizer',
	} );

	// Merge the block wrapper and inner blocks wrapper to avoid an extra empty div.
	const innerBlocksProps = useInnerBlocksProps.save( {
		...blockProps,
		// 'data-c': innerBlocks?.length ?? 0,
	} );

	return <div { ...innerBlocksProps } />;
}
