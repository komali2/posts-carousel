import { get, includes, pickBy } from 'lodash';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */


export default function save({attributes}) {
	console.log('posts carousel', attributes)
	const {
		postsToShow,
		order,
		orderBy,
		categories,
		selectedAuthor,
		displayFeaturedImage,
		displayPostContentRadio,
		displayPostContent,
		displayPostDate,
		displayAuthor,
		postLayout,
		columns,
		excerptLength,
		featuredImageAlign,
		featuredImageSizeSlug,
		featuredImageSizeWidth,
		featuredImageSizeHeight,
		addLinkToFeaturedImage,
	} = attributes;

	const catIds =
				categories && categories.length > 0
				? categories.map( ( cat ) => cat.id )
				: [];

	const { apiFetch } = wp;
	const query =	pickBy(
		{
			categories: catIds,
			author: selectedAuthor,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			_embed: 'wp:featuredmedia',
		},
		( value ) => typeof value !== 'undefined'
	);

	console.log('query', query);
	apiFetch({ path: "/wp/v2/posts", }).then(posts => {
		console.log('fetched psots i', posts);
	});
	return (
		<div { ...useBlockProps.save() }>
			<ul>
			{ attributes.displayPosts && attributes.displayPosts.map((post)=>(
				<li>
					{post.title && post.title.slug}
				</li>
			))}
		</ul>
		</div>
	);
}
