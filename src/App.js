import qs from "qs";

import Authorize from "./components/authorize";
import Search from "./components/search";

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
			<div>
				{this.state.amzKeys
					? this.state.amzKeys["amz-key"]
						? <Search { ...this.props } />
						: <Authorize { ...this.props } />
					: <div> LOADING </div>}
			</div>
		);
	}
}

export default () =>
	<Root { ...qs.parse(window.location.search.slice(1, Infinity)) } />;
