import styled from "styled-components";
import { lighten } from "polished";

// --------------------------------------------------

const ProductStyled = styled.div`
	position:  relative;
	flex-direction: row;

	&:not(:last-child) {
		border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "gray"]))};
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
	max-height: 10em;
	padding: 0.5em;
`;

const ProductName = styled.h3`
	margin-bottom: 0.5em;
`;

const ProductDescription = styled.div`
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

const Product = ({ i, name, image, description, onSelectItem }) =>
	<ProductStyled onClick={() => onSelectItem(i)}>
		<ProductImgWrapper>
			<ProductImg src={image} alt="product image" />
		</ProductImgWrapper>

		<ProductInfo>
			<ProductName>{name}</ProductName>

			<ProductDescription
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			/>
		</ProductInfo>

		<ProductOverlay className="overlay">
			Add product to CosmicJS catalog
		</ProductOverlay>
	</ProductStyled>;

// --------------------------------------------------

const ProductListContainer = styled.div`
	display: ${ ({ children }) => (children.length ? "block" : "none") };
	border-radius: 3px;
	border: 1px solid ${ R.pipe( R.path(["theme", "colors", "gray"] ) ) };

	${ R.pipe(R.path(["theme", "functions", "shadow"]), R.apply(R.__, [2, 1])) }
`;

const Message = styled.div`
	padding: 0.5em;

	&:not(:last-child) {
		border-bottom: 1px solid ${R.pipe(R.path(["theme", "colors", "gray"]))};
	}
`;

// --------------------------------------------------

class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ProductListContainer>
				{this.props.children}

				{this.props.itemList.length > 0
					? this.props.itemList.map((props, i) =>
							<Product
								key={i + "-" + props.url}
								onSelectItem={this.props.onSelectItem}
								i={i}
								{...props}
							/>,
						)
					: <Message>No items</Message>}
			</ProductListContainer>
		)
	}
};

// --------------------------------------------------

ProductList.Message = props => (
	<Message { ...props }/>
);


// --------------------------------------------------

export default ProductList;