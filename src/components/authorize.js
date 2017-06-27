import { Input, Button } from "codogo-react-widgets";
import { compose, withState, withHandlers } from "recompose";

const withKeyState = withState("amzKey", "__setKey", "");

const withSecretState = withState("amzSecret", "__setSecret", "");

const withTagState = withState("amzTag", "__setTag", "");

const handlers = withHandlers({
	onKeyChange: ({ __setKey, }) => e => __setKey(e.target.value),
	onSecretChange: ({ __setSecret, }) => e => __setSecret(e.target.value),
	onTagChange: ({ __setTag, }) => e => __setTag(e.target.value),

	submit: ({
		amzKey,
		amzSecret,
		amzTag,
		bucket_slug,
		fetch,
		onSetAmzKeys,
		write_key,
	}) => () =>
		fetch
			.putAmazonCredentials({
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
							type: "text",
						},
						{
							title: "Secret",
							key: "amz-secret",
							value: amzSecret,
							type: "text",
						},
						{
							title: "Tag",
							key: "amz-tag",
							value: amzTag,
							type: "text",
						},
					],
				}),
			})
			.then(() =>
				onSetAmzKeys({
					"amz-key": amzKey,
					"amz-secret": amzSecret,
					"amz-tag": amzTag,
				}),
			),
});

const withEnhancers = compose(
	withKeyState,
	withSecretState,
	withTagState,
	handlers,
);

export default withEnhancers(props =>
	<div>
		Please Authorise Amazon with your affiliate link

		<Input label = "Key" value = { props.amzKey } onChange = { props.onKeyChange } />

		<Input
			label = "Secret"
			value = { props.amzSecret }
			onChange = { props.onSecretChange }
		/>

		<Input label = "Tag" value = { props.amzTag } onChange = { props.onTagChange } />
		
		<Button onClick={props.submit}>
			Save
		</Button>
	</div>,
);
