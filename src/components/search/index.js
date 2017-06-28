import styled from "styled-components";

import { Input, Dropdown, } from "codogo-react-widgets";

import enhancers from "./enhancers";
import { ProductList, } from "../toolbox";

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

const SearchStyled = styled.div`display: block;`;

const SearchInputs = styled.div`
	flex: 0 0 auto;
	flex-direction: row;
	margin-top: 1em;
	justify-content: center;
`;

const SearchBarContainer = styled.div`flex: 1;`;

const DropdownWrapper = styled.div`margin-right: 1em;`;

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
				<h1>Amazon Product Search</h1>

				<SearchInputs>
					<DropdownWrapper>
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
					</DropdownWrapper>

					<SearchBarContainer>
						<Input
							name = "searchFor"
							onChange = { this.props.onSearchForChange }
							value = { this.props.searchFor }
						/>
					</SearchBarContainer>
				</SearchInputs>

				<ProductList
					itemList = { this.props.searchResults }
					onSelectItem = { this.props.onSelectResult }
					filterBy = { this.props.addedItems }
				>
					{this.props.searchResults.length > 0 &&
						<ProductList.Message>
							Showing the 10 most relevant results...
						</ProductList.Message>}
				</ProductList>
			</SearchStyled>
		);
	}
}

export default enhancers(Search);
