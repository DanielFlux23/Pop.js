#!/bin/bash

set -e

# Última tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "Última tag: $LAST_TAG"

# Nova versão (básico: incrementa patch)
IFS='.' read -r MAJOR MINOR PATCH <<<"${LAST_TAG/v/}"
NEW_VERSION="v$MAJOR.$MINOR.$((PATCH + 1))"

# Gerar changelog
echo "Gerando changelog para $NEW_VERSION"
echo "## $NEW_VERSION - $(date +%Y-%m-%d)" >> CHANGELOG.md
git log "$LAST_TAG"..HEAD --pretty=format:"- %s" >> CHANGELOG.md
echo -e "\n" >> CHANGELOG.md

# Criar nova tag
git config user.name "github-actions"
git config user.email "actions@github.com"
git add CHANGELOG.md
git commit -m "chore(release): $NEW_VERSION"
git tag "$NEW_VERSION"
git push origin main --tags
git push