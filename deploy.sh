#!/bin/bash

# Ensure we're in the project root
cd "$(dirname "$0")"

# Build the images
echo "Building Docker images..."
docker-compose build

# Push to Railway
echo "Deploying to Railway..."
railway up

echo "Deployment complete! Check your Railway dashboard for status."
