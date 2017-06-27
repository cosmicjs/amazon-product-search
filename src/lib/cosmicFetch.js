export default ({ bucket_slug, read_key, write_key, }) => ({
	getAmazonCredentials: opts =>
		fetch(
			`https://api.cosmicjs.com/v1/${bucket_slug}/object/amazon-credentials${read_key
				? "?read_key=" + read_key
				: ""}`,
			opts,
		),

	putAmazonCredentials: opts =>
		fetch(
			`https://api.cosmicjs.com/v1/${bucket_slug}/edit-object${write_key
				? "?write_key=" + write_key
				: ""}`,
			R.over(
				R.lensProp("body"),
				R.pipe(
					JSON.parse,
					R.assoc("write_key", write_key),
					JSON.stringify,
				),
				opts,
			),
		),

	getAmazonItems: opts =>
		fetch(
			`https://api.cosmicjs.com/v1/${bucket_slug}/object-type/amazon-items${read_key
				? "?read_key=" + read_key
				: ""}`,
			opts,
		),

	postAmazonItem: opts =>
		fetch(
			`https://api.cosmicjs.com/v1/${bucket_slug}/add-object${write_key
				? "?write_key=" + write_key
				: ""}`,
			R.over(
				R.lensProp("body"),
				R.pipe(
					JSON.parse,
					R.assoc("write_key", write_key),
					JSON.stringify,
				),
				opts,
			),
		),
});
