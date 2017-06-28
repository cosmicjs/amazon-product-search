import styled from "styled-components";
import { ProductList, } from "../toolbox";

const AddedWrapper = styled.div`margin-top: 1em;`;

export default ({ addedItems, }) =>
	<AddedWrapper>
		<ProductList itemList = { addedItems } onSelectItem = { null }>
			<ProductList.Message>Already added...</ProductList.Message>
		</ProductList>
	</AddedWrapper>;
