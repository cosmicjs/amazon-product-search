import styled from "styled-components";
import { Input, Dropdown } from "codogo-react-widgets";

import enhancers from "./enhancers";
import SearchResults from "./results";

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
	padding: 2em;
	max-width: 700px;
`;

const SearchInputs = styled.div`
	flex: 0 0 auto;
	flex-direction: row;
	margin: 1em 0;
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
				<h1>Amazon Product Search</h1>

				<SearchInputs>
					<Dropdown
						onChange={this.props.onSearchIndexChange}
						value={this.props.searchIndex}
					>
						{validIndices.map(searchIndex =>
							<Dropdown.Option
								key={searchIndex}
								value={searchIndex}
							>
								{searchIndex}
							</Dropdown.Option>,
						)}
					</Dropdown>

					<SearchBarContainer>
						<Input
							name="searchFor"
							onChange={this.props.onSearchForChange}
							value={this.props.searchFor}
						/>
					</SearchBarContainer>
				</SearchInputs>

				<SearchResults
					searchResults={this.props.searchResults}
					onSelectResult={this.props.onSelectResult}
				/>
			</SearchStyled>
		);
	}
}

export default enhancers(Search);
