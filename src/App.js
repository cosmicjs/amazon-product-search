import qs from "qs";
import autobind from "autobind-decorator";
import styled, { injectGlobal, ThemeProvider, } from "styled-components";
import { Shell, } from "codogo-react-widgets";

import cosmicFetch from "./lib/cosmicFetch";
import searchFor from "./lib/searchFor";

import Authorize from "./components/authorize";
import Search from "./components/search";
import Added from "./components/added";

injectGlobal`
	html, body, #root {
		width: 100% ;
		height: 100% ;
		margin: 0;
	}

	*, *:after, *:before {
		box-sizing: border-box;
	}

	body {
		font-family: Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
		color: ${Shell.defaultTheme.colors.black};
	}

	div {
		display: flex;
		flex-direction: column;
	}

	h1, h2, h3, h4, h5, h6, p {
		margin: 0;
	}

	a, a:hover, a:visited, a:active, a:link {
		color: ${Shell.defaultTheme.colors.black};
		text-decoration: none;
	}
`;

const RootStyled = styled.div`
	flex: 1;
`;

class Root extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			amzKeys: null,
			fetch: cosmicFetch(this.props),
			addedItems: [],
		};
	}

	componentDidMount() {
		this.state.fetch
			.getAmazonCredentials()
			.then(x => x.json())
			.then(
				R.pipe(R.path(["object", "metadata",]), amzKeys =>
					this.setState(
						{
							amzKeys,
							searchAmz: searchFor(
								amzKeys["amz-key"],
								amzKeys["amz-secret"],
								amzKeys["amz-tag"],
							),
						},
						() =>
							this.state.fetch
								.getAmazonItems()
								.then(x => x.json())
								.then(console.log),
					),
				),
			)
			.then();
	}

	@autobind
	onSetAmzKeys(amzKeys) {
		this.setState({
			amzKeys,
			searchAmz: searchFor(
				amzKeys["amz-key"],
				amzKeys["amz-secret"],
				amzKeys["amz-tag"],
			),
		});
	}

	render() {
		return (
			<RootStyled>
				{this.state.amzKeys
					? this.state.amzKeys["amz-key"]
						? [
							<Search { ...this.props } { ...this.state } />,
							<Added { ...this.props } { ...this.state } />,
						]
						: <Authorize
							{ ...this.props }
							{ ...this.state }
							onSetAmzKeys = { this.onSetAmzKeys }
						/>
					: <div> LOADING </div>}
			</RootStyled>
		);
	}
}

export default () =>
	<ThemeProvider theme = { Shell.defaultTheme }>
		<RootStyled>
			<Root { ...qs.parse(window.location.search.slice(1, Infinity)) } />;
		</RootStyled>
	</ThemeProvider>;
