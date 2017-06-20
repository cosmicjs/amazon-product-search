export default opts =>
	fetch(
		"https://prby1ok35l.execute-api.eu-west-1.amazonaws.com/master/fetch",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(opts),
		},
	)
		.then(x => x.json())
		.then(R.prop("body"));
