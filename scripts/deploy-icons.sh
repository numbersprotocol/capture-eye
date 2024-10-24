#!/bin/bash

# Variables
DISTRIBUTION_ID="E1GEDS049Y53CA"
S3_BUCKET="numbers-static"
S3_PATH="capture-eye"
ICON_DIR="assets/icons"

# Find all files in the ICON_DIR recursively
FILES_TO_UPLOAD=$(find $ICON_DIR -type f)

# Function to get the local MD5 checksum
get_local_md5() {
  file=$1
  md5sum "$file" | awk '{ print $1 }'
}

# Function to get the S3 MD5 checksum (ETag)
get_s3_md5() {
  file=$1
  s3_key="$S3_PATH/$(basename "$file")"
  aws s3api head-object --bucket "$S3_BUCKET" --key "$s3_key" --query ETag --output text 2>/dev/null | tr -d '"'
}

# Print all files that will be checked for upload
echo "Checking files for changes:"
for file in $FILES_TO_UPLOAD; do
  local_md5=$(get_local_md5 "$file")
  s3_md5=$(get_s3_md5 "$file")
  
  if [ "$local_md5" != "$s3_md5" ]; then
    echo "Uploading new or modified file: $file"
    
    # Upload the file to S3
    aws s3 cp "$file" "s3://$S3_BUCKET/$S3_PATH/$(basename "$file")"
    if [ $? -ne 0 ]; then
      echo "Failed to upload $file to s3://$S3_BUCKET/$S3_PATH/$(basename "$file")"
      exit 1
    fi
    echo "File uploaded to s3://$S3_BUCKET/$S3_PATH/$(basename "$file")"
    
    # Add to invalidation paths
    INVALIDATION_PATHS+=("/$S3_PATH/$(basename "$file")")
  else
    echo "File unchanged, skipping upload: $file"
  fi
done

# Check if there are any files to invalidate
if [ ${#INVALIDATION_PATHS[@]} -eq 0 ]; then
  echo "No files to invalidate."
  exit 0
fi

# Create the invalidation with all uploaded files
echo "Creating invalidation for the following paths:"
for path in "${INVALIDATION_PATHS[@]}"; do
  echo "$path"
done

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
    echo "Invalidation completed successfully."
    break
  fi
  # Wait for 5 seconds before checking again
  sleep 5
done

# Print the CDN URLs of the uploaded files
echo "CDN URLs for uploaded files:"
for path in "${INVALIDATION_PATHS[@]}"; do
  filename=$(basename "$path")
  echo "https://static-cdn.numbersprotocol.io/$S3_PATH/$filename"
done
