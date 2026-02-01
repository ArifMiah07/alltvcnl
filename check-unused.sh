#!/bin/bash

echo "Checking unused packages..."
echo "================================"

packages=(
  "axios"
  "hls.js"
  "localforage"
  "match-sorter"
  "media-chrome"
  "motion"
  "prop-types"
  "react-helmet-async"
  "react-icons"
  "react-intersection-observer"
  "react-player"
  "react-router-dom"
  "sonner"
  "sort-by"
)

for pkg in "${packages[@]}"; do
  count=$(grep -r "from ['\"]$pkg" src/ 2>/dev/null | wc -l)
  if [ $count -eq 0 ]; then
    echo "❌ UNUSED: $pkg"
  else
    echo "✅ USED: $pkg ($count times)"
  fi
done