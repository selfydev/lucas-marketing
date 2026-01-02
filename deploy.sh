#!/bin/bash

# Lucas Marketing - Quick Deploy Script
# Usage: ./deploy.sh "your commit message"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if commit message is provided
if [ -z "$1" ]; then
  echo -e "${RED}❌ Error: Please provide a commit message${NC}"
  echo "Usage: ./deploy.sh \"your commit message\""
  exit 1
fi

echo -e "${YELLOW}🚀 Deploying to GitHub (Vercel will auto-deploy)...${NC}"
echo ""

# Stage all changes
echo "📦 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo -e "${YELLOW}⚠️  No changes to commit${NC}"
  exit 0
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$1"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
  echo -e "${GREEN}🔄 Vercel will automatically deploy your changes...${NC}"
  echo ""
  echo "Check your Vercel dashboard for deployment status:"
  echo "https://vercel.com/dashboard"
else
  echo -e "${RED}❌ Failed to push to GitHub${NC}"
  exit 1
fi

