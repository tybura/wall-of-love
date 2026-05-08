#!/usr/bin/env bash
# One-shot deploy: build the Astro site and push dist/ to the gh-pages branch.
# GitHub Pages is configured to serve from gh-pages, so this is enough.

set -euo pipefail

REPO_URL="https://github.com/tybura/wall-of-love.git"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_DIR/dist"
DEPLOY_DIR="$(mktemp -d -t wol-deploy-XXXXXX)"

echo "→ Building (with BASE_PATH=/wall-of-love for GitHub Pages)..."
cd "$PROJECT_DIR"
BASE_PATH=/wall-of-love npm run build

if [ ! -d "$DIST_DIR" ]; then
  echo "✗ dist/ not produced — aborting." >&2
  exit 1
fi

echo "→ Staging deploy in $DEPLOY_DIR"
cp -r "$DIST_DIR/." "$DEPLOY_DIR/"
touch "$DEPLOY_DIR/.nojekyll"
cd "$DEPLOY_DIR"

git init -q -b gh-pages
git add -A
git -c user.email="66364583+tybura@users.noreply.github.com" \
    -c user.name="Emil Tybura" \
    commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git remote add origin "$REPO_URL"

echo "→ Pushing to gh-pages..."
git push -f origin gh-pages

echo "✓ Deployed: https://tybura.github.io/wall-of-love/"
rm -rf "$DEPLOY_DIR"
