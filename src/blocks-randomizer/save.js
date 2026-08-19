import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Serializes the block wrapper and inner blocks into `post_content`.
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
	const blockProps = useBlockProps.save();

	// Combine both wrappers so one div holds their props.
	const innerBlocksProps = useInnerBlocksProps.save( {
		...blockProps,
	} );

	return <div { ...innerBlocksProps } />;
}
