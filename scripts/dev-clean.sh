#!/bin/bash

# Clean development script to prevent white page issues
echo "🧹 Cleaning Next.js cache and restarting dev server..."

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null || true

# Clear all caches
echo "Clearing .next cache..."
rm -rf .next

echo "Clearing node_modules cache..."
rm -rf node_modules/.cache

echo "Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies to ensure clean state
echo "Reinstalling dependencies..."
npm install

# Start dev server
echo "Starting development server..."
npm run dev
