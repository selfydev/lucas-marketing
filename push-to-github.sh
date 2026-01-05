#!/bin/bash
# Fast push script for marketing app to GitHub
# This uses git archive + git push which is much faster than subtree split

set -e

# Get the marketing remote URL
REMOTE_URL=$(git remote get-url marketing 2>/dev/null || echo "")
if [ -z "$REMOTE_URL" ]; then
    echo "Error: 'marketing' remote not found"
    exit 1
fi

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
TEMP_REPO="$TEMP_DIR/marketing-repo"

# Cleanup function
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# Clone the marketing repo to temp directory
echo "Cloning marketing repo..."
if ! git clone --depth 1 --branch tanstack-router "$REMOTE_URL" "$TEMP_REPO" 2>/dev/null; then
    # Branch doesn't exist, clone without branch
    git clone --depth 1 "$REMOTE_URL" "$TEMP_REPO"
fi

# Copy all files from apps/marketing to temp repo
echo "Copying files..."
cd "$TEMP_REPO"

# Remove everything except .git
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# Copy all files
cp -r ../../apps/marketing/* .

# Commit and push
git add -A
COMMIT_MSG=$(git log -1 --format=%s 2>/dev/null || echo "Update marketing site")
git commit -m "$COMMIT_MSG" --allow-empty
git push origin tanstack-router --force

echo "Successfully pushed to marketing repo!"

