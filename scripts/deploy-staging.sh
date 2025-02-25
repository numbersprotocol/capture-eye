#!/bin/bash

# Variables
DISTRIBUTION_ID="E1GEDS049Y53CA"
INVALIDATION_PATH="/staging/capture-eye-popl.bundled.js"
FILE_PATH="dist/capture-eye.bundled.js"
S3_BUCKET="numbers-static"
S3_KEY="staging/capture-eye-popl.bundled.js"

# Upload the file to S3
aws s3 cp $FILE_PATH s3://$S3_BUCKET/$S3_KEY
if [ $? -ne 0 ]; then
  echo "Failed to upload $FILE_PATH to s3://$S3_BUCKET/$S3_KEY"
  exit 1
fi
echo "File uploaded to s3://$S3_BUCKET/$S3_KEY"

# Create the invalidation
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths $INVALIDATION_PATH --query 'Invalidation.Id' --output text)
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
