import styled from "styled-components";

const AddedItemStyled = styled.div`
	position:  relative;
	flex-direction: row;
	border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "grey",]))};

	&:hover .overlay {
		display: flex;	
	}
`;

const AddedItemInfo = styled.div`
	height: 10em;
	max-height: 10em;
	padding: 0.5em;
`;

const AddedItemName = styled.h3`
	margin-bottom: 0.5em;
`;

const AddedItemDescription = styled.div`
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

const AddedItemImgWrapper = styled.div`
	display: flex;
	min-height: 10em;
	max-height: 10em;
	padding: 0.5em;
	min-width: 10em;
	max-width: 10em;
	align-items: center;
`;

const AddedItemImg = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const AddedItem = ({ name, image, description, }) =>
	<AddedItemStyled>
		<AddedItemImgWrapper>
			<AddedItemImg src = { image } alt = "product image" />
		</AddedItemImgWrapper>

		<AddedItemInfo>
			<AddedItemName>{name}</AddedItemName>

			<AddedItemDescription
				dangerouslySetInnerHTML = { {
					__html: description,
				} }
			/>
		</AddedItemInfo>

	</AddedItemStyled>;

const AddedItems = styled.div`
	display: ${({ children, }) => (children.length ? "block" : "none")};
	border-radius: 5px;
	border: 1px solid ${R.pipe(R.path(["theme", "colors", "grey",]))};
	max-width: 80vw;
	margin-top: 10em;

	${R.pipe(R.path(["theme", "functions", "shadow",]), R.apply(R.__, [2, 1,]))}
`;

export default ({ addedItems, }) =>
	<AddedItems>
		<h2>Already added:</h2>
		{addedItems.map(({ title, metadata, content, _id, }) =>
			<AddedItem
				key = { _id }
				name = { title }
				image = { metadata["image_url"] }
				description = { content }
			/>,
		)}
	</AddedItems>;
