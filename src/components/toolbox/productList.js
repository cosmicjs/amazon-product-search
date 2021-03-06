import styled from "styled-components";

// --------------------------------------------------

const ProductStyled = styled.div`
	position: relative;
	flex-direction: row;

	&:not(:last-child) {
		border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "gray",]))};
	}

	&:hover .overlay {
		display: flex;
	}
`;

const ProductOverlay = styled.div`
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

const ProductInfo = styled.div`
	height: 10em;
	flex-shrink: 1;
	max-height: 10em;
	padding: 0.5em;
	max-width: 100%;
`;

const ProductName = styled.h3`
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	align-self: flex-end;
	display: -webkit-box;
	font-size: 16px;
	line-height: 1.4;
	margin-bottom: 0.5em;
	max-height: ${3 * 1.4 * 16}px;
	overflow: hidden;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`;

const ProductDescription = styled.div`
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	align-self: flex-end;
	display: -webkit-box;
	font-size: 16px;
	line-height: 1.4;
	max-height: ${3 * 1.4 * 16}px;
	overflow: hidden;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`;

const ProductImgWrapper = styled.div`
	display: flex;
	min-height: 10em;
	max-height: 10em;
	padding: 0.5em;
	min-width: 10em;
	max-width: 10em;
	align-items: center;
`;

const ProductImg = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

// --------------------------------------------------

const noop = () => {};

const Product = ({ name, image, description, onSelectItem, }) =>
	<ProductStyled onClick = { onSelectItem || noop }>
		<ProductImgWrapper>
			<ProductImg src = { image } alt = "product image" />
		</ProductImgWrapper>

		<ProductInfo>
			<ProductName>
				{(name || "").replace(/,/g, ",\u200B")}
			</ProductName>

			<ProductDescription
				dangerouslySetInnerHTML = { {
					__html: (description || "").replace(/,/g, ",\u200B"),
				} }
			/>
		</ProductInfo>

		{onSelectItem &&
			<ProductOverlay className = "overlay">
				Add product to CosmicJS catalog
			</ProductOverlay>}
	</ProductStyled>;

// --------------------------------------------------

const ProductListContainer = styled.div`
	display: ${({ children, }) => (children.length ? "block" : "none")};
	border-radius: 3px;
	border: 1px solid ${R.pipe(R.path(["theme", "colors", "gray",]))};

	${R.pipe(R.path(["theme", "functions", "shadow",]), R.apply(R.__, [2, 1,]))};
`;

const Message = styled.div`
	padding: 0.5em;

	&:not(:last-child) {
		border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "gray",]))};
	}
`;

// --------------------------------------------------

const ProductList = props =>
	<ProductListContainer>
		{props.children}

		{props.itemList.length > 0
			? props.itemList
				.filter(itemProps =>
					R.findIndex(
						f => f.image === itemProps.image,
						props.filterBy,
					),
				)
				.map((itemProps, i) => {
					const boundSelectItem = props.onSelectItem
						? () => props.onSelectItem(i)
						: null;

					return (
						<Product
							key = { `${itemProps.url} ${i}` }
							onSelectItem = { boundSelectItem }
							i = { i }
							{ ...itemProps }
						/>
					);
				})
			: <Message>No items</Message>}
	</ProductListContainer>;

ProductList.defaultProps = {
	filterBy: [],
};

// --------------------------------------------------

ProductList.Message = props => <Message { ...props } />;

// --------------------------------------------------

export default ProductList;
