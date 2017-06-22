import styled from "styled-components";
import { Input, Dropdown, } from "codogo-react-widgets";
import { compose, withState, withHandlers, } from "recompose";

import searchAmz from "src/lib/searchFor";

import SearchResults from "./searchResults";

const basicState = (name, def) => withState(name, `__${name}Set`, def);

const withSearchState = basicState("searchFor", "");
const withSearchIndexState = basicState("searchIndex", "All");
const withSearchResults = basicState("searchResults", []);
const withQueryTimeoutState = basicState("queryTimeout", null);

const handlers = withHandlers({
	onSearchForChange: ({
		__searchResultsSet,
		__searchForSet,
		queryTimeout,
		searchIndex,
		__queryTimeoutSet,
	}) => e => {
		const searchFor = e.target.value;

		__searchForSet(searchFor);

		if (queryTimeout) {
			clearTimeout(queryTimeout);
		}

		__queryTimeoutSet(
			setTimeout(() => {
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
					.then(R.tap(console.log))
					.then(__searchResultsSet);
			}, 300),
		);
	},

	onSearchIndexChange: ({ __searchIndexSet, }) => e =>
		__searchIndexSet(e.target.value),
});

const enhancers = compose(
	withSearchState,
	withSearchIndexState,
	withSearchResults,
	withQueryTimeoutState,
	handlers,
);

const validIndices = [
	"All",
	"Apparel",
	"Appliances",
	"Automotive",
	"Baby",
	"Beauty",
	"Blended",
	"Books",
	"Classical",
	"DVD",
	"Electronics",
	"GiftCards",
	"Grocery",
	"Handmade",
	"HealthPersonalCare",
	"HomeGarden",
	"Industrial",
	"Jewelry",
	"KindleStore",
	"Kitchen",
	"Lighting",
	"Luggage",
	"Marketplace",
	"MobileApps",
	"MP3Downloads",
	"Music",
	"MusicalInstruments",
	"OfficeProducts",
	"Pantry",
	"PCHardware",
	"PetSupplies",
	"Shoes",
	"Software",
	"SportingGoods",
	"Tools",
	"Toys",
	"UnboxVideo",
	"VHS",
	"VideoGames",
	"Watches",
];

const SearchStyled = styled.div`
	flex: 1;
`;

const SearchInputs = styled.div`
	flex: 0 0 auto;
	flex-direction: row;
`;

const SearchBarContainer = styled.div`
	flex: 1;
`;

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		fetch(
			`https://api.cosmicjs.com/v1/${this.props[
				"bucket_slug"
			]}/object-type/amazon-items`,
		).then(x => x.json());
	}

	render() {
		return (
			<SearchStyled>
				<SearchInputs>
					<SearchBarContainer>
						<Input
							name = "searchFor"
							label = "Search for stuff"
							onChange = { this.props.onSearchForChange }
							value = { this.props.searchFor }
						/>
					</SearchBarContainer>

					<Dropdown
						onChange = { this.props.onSearchIndexChange }
						value = { this.props.searchIndex }
					>
						{validIndices.map(searchIndex =>
							<Dropdown.Option
								key = { searchIndex }
								value = { searchIndex }
							>
								{searchIndex}
							</Dropdown.Option>,
						)}
					</Dropdown>
				</SearchInputs>

				<SearchResults searchResults = { this.props.searchResults } />

			</SearchStyled>
		);
	}
}

export default enhancers(Search);
