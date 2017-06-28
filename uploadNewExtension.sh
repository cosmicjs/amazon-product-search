#!/bin/bash

BUCKET_SLUG="${BUCKET_SLUG:-extensions-2}"
READ_KEY="${READ_KEY:-foo}"
WRITE_KEY="${WRITE_KEY:-bar}"

EXTENSION_NAME="${EXTENSION_NAME:-Amazon Product Search}"

echo "geting previous version extension id"

PREVIOUS_EXTENSION_ID="$( curl --progress-bar "https://api.cosmicjs.com/v1/extensions-2?hide_metafields=true&read_key=foo" | jq -r ".bucket.extensions | map(select(.title == \"$EXTENSION_NAME\" )) | .[0].id"  )"

if [ "$PREVIOUS_EXTENSION_ID" == "null" ] ; then
	echo "There is no '$EXTENSION_NAME' extension on cosmic to delete"
	exit 0
else
	echo "Found id for '$EXTENSION_NAME': $PREVIOUS_EXTENSION_ID"
fi

DELETE_BODY="{\"write_key\":\"$WRITE_KEY\"}"

echo "deleting old extension"

curl --progress-bar -X DELETE "https://api.cosmicjs.com/v1/$BUCKET_SLUG/extensions/$PREVIOUS_EXTENSION_ID" -d "$DELETE_BODY" -H "Content-type: application/json" > /dev/null

echo "TODO: upload new version of extension"

