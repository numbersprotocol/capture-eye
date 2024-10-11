#!/bin/bash

# Variables
DISTRIBUTION_ID="E1GEDS049Y53CA"
S3_BUCKET="numbers-static"
S3_PATH="capture-eye"
ICON_DIR="assets/icons"
INVALIDATION_PATHS=(
  "/${S3_PATH}/capture-eye-blockchain-icon.svg"
  "/${S3_PATH}/capture-eye-curator-icon.png"
  "/${S3_PATH}/capture-eye-close-icon.png"
  "/${S3_PATH}/capture-eye-tx-icon.svg"
  "/${S3_PATH}/capture-eye-gray.svg"
)
FILES_TO_UPLOAD=(
  "${ICON_DIR}/capture-eye-blockchain-icon.svg"
  "${ICON_DIR}/capture-eye-curator-icon.png"
  "${ICON_DIR}/capture-eye-close-icon.png"
  "${ICON_DIR}/capture-eye-tx-icon.svg"
  "${ICON_DIR}/capture-eye-gray.svg"
)

# Upload files to S3
for file in "${FILES_TO_UPLOAD[@]}"; do
  aws s3 cp $file s3://$S3_BUCKET/$S3_PATH/
  if [ $? -ne 0 ]; then
    echo "Failed to upload $file to s3://$S3_BUCKET/$S3_PATH/"
    exit 1
  fi
  echo "File uploaded to s3://$S3_BUCKET/$S3_PATH/"
done

# Create the invalidation
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "${INVALIDATION_PATHS[@]}" --query 'Invalidation.Id' --output text)
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
