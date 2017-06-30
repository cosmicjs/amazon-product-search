import { compose, withState, withHandlers, } from "recompose";

const basicState = (name, def) => withState(name, `__${name}Set`, def);

const withSearchState = basicState("searchFor", "");
const withSearchIndexState = basicState("searchIndex", "All");
const withSearchResults = basicState("searchResults", []);
const withQueryTimeoutState = basicState("queryTimeout", null);
const withLoadingState = basicState("loading", false);

const withPerformSearch = withHandlers({
	performSearch: ({
		searchAmz,
		searchFor,
		searchIndex,
		__searchResultsSet,
		__loadingSet,
	}) => () =>
	searchAmz({
		searchIndex,
		keywords: searchFor,
		responseGroup: "Images,Large",
	})
	.then(R.path(["ItemSearchResponse", "Items", 0, "Item",]))
	.then(
		R.map(
			({
				LargeImage,
				DetailPageURL,
				ItemAttributes,
				EditorialReviews,
			}) => ({
				name: R.path([0, "Title", 0,])(ItemAttributes),
				url: DetailPageURL[0],
				image: R.path([0, "URL", 0,])(LargeImage),
				description: R.path([
					0,
					"EditorialReview",
					0,
					"Content",
					0,
				])(EditorialReviews),
			}),
		),
	)
	.then(__searchResultsSet)
	.then(() => __loadingSet(false)),
});

const handlers = withHandlers({
	onSearchIndexChange: ({
		__searchIndexSet,
		__queryTimeoutSet,
		__searchResultsSet,
		queryTimeout,
		performSearch,
		__loadingSet,
	}) => e => {
		__searchIndexSet(e.target.value);

		if (queryTimeout) {
			clearTimeout(queryTimeout);
		}

		__queryTimeoutSet(setTimeout(performSearch, 300));
		__searchResultsSet([]);
		__loadingSet(true);
	},

	onSelectResult: ({
		bucket_slug,
		fetch,
		onAddItem,
		searchResults,
		__searchResultsSet,
		write_key,
	}) => i => {
		const { name, image, description, url, } = searchResults[i];

		fetch
			.postAmazonItem({
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					title: name,
					type_slug: "amazon-items",
					content: description,
					metafields: [
						{
							key: "image_url",
							type: "text",
							value: image,
						},
						{
							key: "affiliate_link",
							type: "text",
							value: url,
						},
					],
				}),
			})
			.then(x => x.json())
			.then(onAddItem);
	},

	onSearchForChange: ({
		__searchResultsSet,
		__searchForSet,
		queryTimeout,
		__queryTimeoutSet,
		performSearch,
		__loadingSet,
	}) => e => {
		const searchFor = e.target.value;

		__searchForSet(searchFor);

		if (queryTimeout) {
			clearTimeout(queryTimeout);
		}

		console.log({ performSearch,});

		__queryTimeoutSet(setTimeout(performSearch, 300));
		__searchResultsSet([]);
		__loadingSet(true);
	},
});

export default compose(
	withSearchState,
	withSearchIndexState,
	withSearchResults,
	withQueryTimeoutState,
	withLoadingState,
	withPerformSearch,
	handlers,
);
