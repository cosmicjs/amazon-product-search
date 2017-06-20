import { withState, } from "recompose";

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		fetch(
			`https://api.cosmicjs.com/v1/${this.props[
				"bucket_slug"
			]}/object-type/amazon-items`,
		)
			.then(x => x.json())
			.then(R.tap(console.log));
	}

	render() {
		return (
			<div>
				Search for stuff:
			</div>
		);
	}
}
