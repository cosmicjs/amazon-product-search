import { Input } from "codogo-react-widgets";
import { compose, withState, withHandlers } from "recompose";

const withKeyState = withState("amzKey", "__setKey", "");

const withSecretState = withState("amzSecret", "__setSecret", "");

const handlers = withHandlers({
	onKeyChange: ({ __setKey }) => e => __setKey(e.target.value),
	onSecretChange: ({ __setSecret }) => e => __setSecret(e.target.value),
	submit: ({ amzKey, amzSecret, bucket_slug, write_key }) => () =>
		fetch(
			`https://api.cosmicjs.com/v1/${bucket_slug}/edit-object?write_key=${write_key}`,
			{
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					slug: "amazon-credentials",
					metafields: [
						{
							title: "Key",
							key: "amz-key",
							value: amzKey,
						},
						{
							title: "Secret",
							key: "amz-secret",
							value: amzSecret,
						},
					],
				}),
			},
		),
});

const withEnhancers = compose(withKeyState, withSecretState, handlers);

export default withEnhancers(props =>
	<div>
		Plz Authorise Amazon with your afiliate link

		<Input label="Key" value={props.amzKey} onChange={props.onKeyChange} />

		<Input
			label="Secret"
			value={props.amzSecret}
			onChange={props.onSecretChange}
		/>

		<button onClick={props.submit}>
			save
		</button>
	</div>,
);
