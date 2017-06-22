import styled from "styled-components";
import { lighten, } from "polished";

const SearchResultStyled = styled.div`
	margin: 0.5rem;
	position:  relative;

	background-color: ${R.pipe(R.path(["theme", "colors", "grey",]), lighten(0.3))};

	${R.pipe(R.path(["theme", "functions", "shadow",]), R.apply(R.__, [2, 1,]))}

	&:hover .overlay {
		display: flex;
		background-color: rgba(256, 153, 00, 0.7);
	}
`;

const SearchResultName = styled.h3`

`;

const SearchResultOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0);
	bottom: 0;
	color: black;
	cursor: pointer;
	display: none;
	font-size: 3rem;
	align-items: center;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const SearchResultInfo = styled.div`
	flex-direction: row;
	height: 10rem;
	max-height: 10rem;
`;

const SearchResultDescription = styled.div`
	flex: 1;
	height: 10rem;
	max-height: 10rem;
	overflow: hidden;
`;

const SearchResultImg = styled.img`
	flex: 0 0;
	width: auto;
	height: 10rem;
	max-height: 10rem;
	align-self: flex-end;
`;

const SearchResult = ({ name, image, description, }) =>
	<SearchResultStyled>
		<SearchResultName>{name}</SearchResultName>

		<SearchResultOverlay className = "overlay">
			Add Product To CosmicJS Catalouge
		</SearchResultOverlay>

		<SearchResultInfo>
			<SearchResultDescription
				dangerouslySetInnerHTML = { {
					__html: description,
				} }
			/>
			<SearchResultImg src = { image } alt = "product image" />
		</SearchResultInfo>
	</SearchResultStyled>;

const SearchResults = styled.div`
	background-color: ${R.path(["theme", "colors", "grey",])};
	display: ${({ children, }) => (children.length ? "block" : "none")};
	margin: 0 3rem 7rem;
	${R.pipe(R.path(["theme", "functions", "shadow",]), R.apply(R.__, [1,]))}
`;

export default props =>
	<SearchResults>
		{props.searchResults.map(props =>
			<SearchResult key = { props.url } { ...props } />,
		)}
	</SearchResults>;
