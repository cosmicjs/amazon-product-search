import styled from "styled-components";
import { lighten } from "polished";

//background-color: ${R.pipe(R.path(["theme", "colors", "grey",]), lighten(0.3))};

const SearchResultStyled = styled.div`
	position:  relative;
	flex-direction: row;
	border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "grey"]))};

	&:hover .overlay {
		display: flex;	
	}
`;

const SearchResultOverlay = styled.div`
	align-items: center;
	background-color: rgba(0, 0, 0, 0.7);
	bottom: 0;
	color: white;
	cursor: pointer;
	display: none;
	font-size: 1.5em;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const SearchMessage = styled.div`
	padding: 0.5em;
	border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "grey"]))};
`;

const SearchResultInfo = styled.div`
	height: 10em;
	max-height: 10em;
	padding: 0.5em;
`;

const SearchResultName = styled.h3`
	margin-bottom: 0.5em;
`;

const SearchResultDescription = styled.div`
	overflow: hidden;
	align-self: flex-end;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	height: ${3 * 1.4 * 16}px;
	font-size: 16px;
  	line-height: 1.4;
  	display: -webkit-box;
`;

const SearchResultImgWrapper = styled.div`
	display: flex;
	min-height: 10em;
	max-height: 10em;
	padding: 0.5em;
	min-width: 10em;
	max-width: 10em;
	align-items: center;
`;

const SearchResultImg = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const SearchResult = ({ i, name, image, description, onSelectResult }) =>
	<SearchResultStyled onClick={() => onSelectResult(i)}>
		<SearchResultImgWrapper>
			<SearchResultImg src={image} alt="product image" />
		</SearchResultImgWrapper>

		<SearchResultInfo>
			<SearchResultName>{name}</SearchResultName>

			<SearchResultDescription
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
		</SearchResultInfo>

		<SearchResultOverlay className="overlay">
			Add product to CosmicJS catalogue
		</SearchResultOverlay>
	</SearchResultStyled>;

const SearchResults = styled.div`
	display: ${({ children }) => (children.length ? "block" : "none")};
	border-radius: 5px;
	border: 1px solid ${R.pipe(R.path(["theme", "colors", "grey"]))};

	${R.pipe(R.path(["theme", "functions", "shadow"]), R.apply(R.__, [2, 1]))}
`;

export default ({ searchResults, onSelectResult }) =>
	<SearchResults>
		{searchResults.length > 0 &&
			<SearchMessage>
				Showing 10 most relevant results...
			</SearchMessage>}

		{searchResults.length > 0
			? searchResults.map((props, i) =>
					<SearchResult
						key={props.url}
						onSelectResult={onSelectResult}
						i={i}
						{...props}
					/>,
				)
			: <SearchMessage>No results</SearchMessage>}
	</SearchResults>;
