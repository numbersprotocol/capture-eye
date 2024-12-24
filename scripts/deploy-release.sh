#!/bin/bash

# Variables
DISTRIBUTION_ID="E1GEDS049Y53CA"
FILE_PATH="dist/capture-eye.bundled.js"
S3_BUCKET="numbers-static"

# Define S3 keys for paths
LATEST_KEY="capture-eye/release/latest/capture-eye.bundled.js"
VERSION_KEY="capture-eye/release/$(npm pkg get version | tr -d \")/capture-eye.bundled.js"

# CloudFront invalidation paths
INVALIDATION_PATHS="/$LATEST_KEY /$VERSION_KEY"

echo "Invalidation paths: $INVALIDATION_PATHS"

# Upload to S3 (latest version)
aws s3 cp $FILE_PATH s3://$S3_BUCKET/$LATEST_KEY
if [ $? -ne 0 ]; then
  echo "Failed to upload $FILE_PATH to s3://$S3_BUCKET/$LATEST_KEY"
  exit 1
fi
echo "File uploaded to s3://$S3_BUCKET/$LATEST_KEY"

# Upload to S3 (version-specific path)
aws s3 cp $FILE_PATH s3://$S3_BUCKET/$VERSION_KEY
if [ $? -ne 0 ]; then
  echo "Failed to upload $FILE_PATH to s3://$S3_BUCKET/$VERSION_KEY"
  exit 1
fi
echo "File uploaded to s3://$S3_BUCKET/$VERSION_KEY"

# Create the invalidation
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths $INVALIDATION_PATHS --query 'Invalidation.Id' --output text)
if [ $? -ne 0 ]; then
  echo "Failed to create invalidation"
  exit 1
fi
echo "Invalidation created with ID: $INVALIDATION_ID"

# Function to check the status of the invalidation
check_invalidation_status() {
  STATUS=$(aws cloudfront get-invalidation --distribution-id $DISTRIBUTION_ID --id $INVALIDATION_ID --query 'Invalidation.Status' --output text)
  echo "Current status: $STATUS"
}

# Loop until the invalidation status is "Completed"
while true; do
  check_invalidation_status
  if [ "$STATUS" = "Completed" ]; then
    echo "success/done"
    break
  fi
  # Wait for 5 seconds before checking again
  sleep 5
done
