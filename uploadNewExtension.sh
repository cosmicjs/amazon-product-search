#!/bin/bash

#you can define these variables yourself to test this script
#BUCKET_SLUG=""
#READ_KEY=""
#WRITE_KEY=""

EXTENSION_NAME="${EXTENSION_NAME:-Amazon Product Search}"

echo "geting previous version extension id..."
PREVIOUS_EXTENSION_ID="$( curl --progress-bar "https://api.cosmicjs.com/v1/extensions-2?hide_metafields=true&read_key=foo" | jq -r ".bucket.extensions | map(select(.title == \"$EXTENSION_NAME\" )) | .[0].id"  )"

if [ "$PREVIOUS_EXTENSION_ID" == "null" ] ; then
	echo "There is no '$EXTENSION_NAME' extension on cosmic to delete"
else
	echo "Found id for '$EXTENSION_NAME': $PREVIOUS_EXTENSION_ID"
	echo "deleting old extension..."
	curl --progress-bar -X DELETE "https://api.cosmicjs.com/v1/$BUCKET_SLUG/extensions/$PREVIOUS_EXTENSION_ID" -d "{\"write_key\":\"$WRITE_KEY\"}" -H "Content-type: application/json" > /dev/null
fi

echo "upload new version of extension..."
curl --progress-bar --url "https://api.cosmicjs.com/v1/$BUCKET_SLUG/extensions" --header "content-type: multipart/form-data" --form "write_key=$WRITE_KEY" --form "zip=@./build.zip" > /dev/null
