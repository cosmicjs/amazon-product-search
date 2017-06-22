import qs from "qs";
import styled, { injectGlobal, ThemeProvider, } from "styled-components";
import { Shell, } from "codogo-react-widgets";

import Authorize from "./components/authorize";
import Search from "./components/search";

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
		};
	}

	componentDidMount() {
		fetch(
			`https://api.cosmicjs.com/v1/${this.props[
				"bucket_slug"
			]}/object/amazon-credentials`,
		)
			.then(x => x.json())
			.then(
				R.pipe(R.path(["object", "metadata",]), amzKeys =>
					this.setState(R.over(R.lensProp("amzKeys"), () => amzKeys)),
				),
			);
	}

	render() {
		return (
			<RootStyled>
				{this.state.amzKeys
					? this.state.amzKeys["amz-key"]
						? <Search { ...this.props } />
						: <Authorize { ...this.props } />
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
