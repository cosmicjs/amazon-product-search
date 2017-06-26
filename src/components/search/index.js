import styled from "styled-components";
import { Input, Dropdown, } from "codogo-react-widgets";

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

				<SearchResults
					searchResults = { this.props.searchResults }
					onSelectResult = { this.props.onSelectResult }
				/>

			</SearchStyled>
		);
	}
}

export default enhancers(Search);
