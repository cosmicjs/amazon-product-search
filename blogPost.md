# Building and publishing a CosmicJS Extension using Bitbucket Pipelines

CosmicJS just released their new extension functionally, which enables anyone to embed their own custom app inside the Cosmic CMS!

In this tutorial we'll be going through some of the steps required to make our Amazon Product Search extension.

## The extension we're building

We're building a simple extension that allows you to search the Amazon Product Catalogue and add objects to your bucket with products' name, description, image, and an affiliate link.

This is quite a simple app, built using react, and we won't be going into too many details on the parts that don't directly relate to the new CosmicJS extensions API.

## Getting access to the Cosmic API in your extension

CosmicJS embeds extensions as an `<iframe>` inside its CMS interface, the extension is given a url with a querystring providing all the information needed for your app to access the relevant bucket like so:

`https://43d32000-5ce7-11e7-8fc4-c1f6eec4f920.Cosmicext.com/?bucket_slug=my-bucket-slug&read_key=foo&write_key=bar`

Extracting these variables, is very easy, and even easier using a library like `qs`:
			
```javascript

import qs from "qs";

const { bucket_slug, read_key, write_key, } = qs.parse(window.location.search.slice(1, Infinity));

console.log({
   bucket_slug,
   read_key,
   write_key,
});

```

These keys can then be used to make API calls on the bucket your currently using the extension in:

```javascript
fetch(
   `https://api.Cosmicjs.com/v1/${bucket_slug}/object/amazon-credentials${
      read_key
         ? "?read_key=" + read_key
         : ""
   }`,
   opts,
);
```

In our app we use these keys to add new object for Amazon Products that we find.

## extension.json

One file that must be included in your extension is the `extension.json` file. This tells Cosmic important metadata about your app, like it's name, icon, display image, and the default objects that should be created when the extension is first installed. The `extension.json` for our app is as follows:

```json
{
	"title": "Amazon Product Search",
	"font_awesome_class": "fa-shopping-basket",
	"image_url": "http://fla.fg-a.com/shopping-cart/shopping-cart-black-3.png",
	"objects": [
		{
			"title": "Amazon Credentials",
			"slug": "amazon-credentials",
			"type": "amazon-credentials",
			"metafields": [
				{
					"key": "amz-key",
					"title": "Key",
					"type": "text",
					"value": ""
				},
				{
					"key": "amz-secret",
					"title": "Secret",
					"type": "text",
					"value": ""
				},
				{
					"key": "amz-tag",
					"title": "Tag",
					"type": "text",
					"value": ""
				}
			]
		}
	]
}
```

The `title` field is the name that your extension will display inside Cosmic
The `font_awesome_class` field must be a valid [Font Awesome](http://fontawesome.io/icons/) icon name
the `image_url` field is a display image that will show with your extension.

You also have space to specify a list of objects that will be created when your extension is installed, here we've detailed an object that will store our Amazon Product Search credentials. This means that Cosmic will handle saving this information for us!

## Deployment and Continuous Integration

Uploading your extension to Cosmic is very easy, you just need to take a folder that contains you `extension.json` file, and an `index.html` file (and any other assets you need), zip it up, and upload it.

Our build folder looks like this:

```
build
├── extension.json
├── index.html
└── static
    └── js
        └── main.a651cd8a.js
```

You can either upload your zip file through the CosmicJS CMS, or by using the rest API.

We use Bitbucket to host our code, which has a built in CI service called Pipelines. You can configure pipelines to run on every commit to the `master` branch of your git repo, and to upload the newest version of your  app to Cosmic's servers.

We'll configure our Bitbucket Pipeline like so:

```yaml
image: codogo/pipelines-universal:latest

pipelines:
  branches:
    master:
      - step:
          script:
          - yarn install 
          - yarn run lint
          - yarn run build
          - ./uploadNewExtension.sh
```

Where `uploadNewExtension.sh` contains:

```shell

#!/bin/bash

# $BUCKET_SLUG, $READ_KEY, and $WRITE_KEY are environment variables

EXTENSION_NAME="${EXTENSION_NAME:-Amazon Product Search}"

echo "geting previous version extension id..."
PREVIOUS_EXTENSION_ID="$( curl --progress-bar "https://api.cosmicjs.com/v1/extensions-2?hide_metafields=true&read_key=foo" | jq -r ".bucket.extensions | map(select(.title == \"$EXTENSION_NAME\" )) | .[0].id"  )"
# jq is a neat little program for extracting data from json, it is available here: https://jqplay.org/

if [ "$PREVIOUS_EXTENSION_ID" == "null" ] ; then
	echo "There is no '$EXTENSION_NAME' extension on cosmic to delete"
else
	echo "Found id for '$EXTENSION_NAME': $PREVIOUS_EXTENSION_ID"
	echo "deleting old extension..."
	curl --progress-bar -X DELETE "https://api.cosmicjs.com/v1/$BUCKET_SLUG/extensions/$PREVIOUS_EXTENSION_ID" -d "{\"write_key\":\"$WRITE_KEY\"}" -H "Content-type: application/json" > /dev/null
fi

echo "upload new version of extension..."
curl --progress-bar --url "https://api.cosmicjs.com/v1/$BUCKET_SLUG/extensions" --header "content-type: multipart/form-data" --form "write_key=$WRITE_KEY" --form "zip=@./build.zip" > /dev/null

```

This script will remove  any previously uploaded versions of our extension, then take our zipped extension and upload it to our bucket.

## Summary

In this tutorial we've had an introduction to the way CosmicJS hosts and integrates with your extension, and an explanation of how to upload your extension using Bitbucket's Continuous integration. If you've learnt something, please [share this article](https://twitter.com/intent/tweet?text=Building and publishing a CosmicJS Extension using Bitbucket Pipelines: https://cosmicjs.com/blog)!

If you're making an extension, or anything else, with CosmicJS get in touch on our Slack or Twitter, we'd love to see what you're making. 

This post was written by [Codogo](https://consulting.codogo.io), an award-winning digital agency with a passion for creating amazing digital experiences.
