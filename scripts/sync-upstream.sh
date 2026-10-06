#!/usr/bin/env bash
# Merge facebook/regenerator (upstream) into this fork without losing fork metadata.
# Never reset or force-push: the @zklogic package metadata and publish workflow must survive.
set -euo pipefail

UPSTREAM_URL="https://github.com/facebook/regenerator.git"
UPSTREAM_BRANCH="${1:-main}"
PKG="packages/runtime/package.json"

if [ "$(git branch --show-current)" != "development" ]; then
  echo "Run this on the development branch (all fork work lives there)." >&2
  exit 1
fi

git remote get-url upstream >/dev/null 2>&1 || git remote add upstream "$UPSTREAM_URL"
# --no-tags: upstream tags (v0.14.x) would clash with this fork's release tags.
git fetch upstream --no-tags

FORK_VERSION="$(node -p "require('./$PKG').version")"

if git merge "upstream/$UPSTREAM_BRANCH" --no-edit; then
  echo "Merged cleanly."
else
  CONFLICTS="$(git diff --name-only --diff-filter=U)"
  if [ "$CONFLICTS" != "$PKG" ]; then
    echo "Conflicts besides $PKG need a manual resolve:"
    echo "$CONFLICTS"
    exit 1
  fi
  # package.json: take upstream's (dependencies, scripts), then re-apply fork metadata.
  git checkout --theirs "$PKG"
fi

node scripts/apply-fork-metadata.js --version "$FORK_VERSION"
git add "$PKG"
git diff --cached --quiet || git commit -q -m "chore: re-apply @zklogic fork metadata after upstream sync"
echo "Done. Review 'git log', run 'cd packages/runtime && npm pack --dry-run', then re-run the smoke test."
