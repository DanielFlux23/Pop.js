#!/bin/bash

set -euo pipefail

# Última tag ou versão inicial
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "Última tag: $LAST_TAG"

# Extrai partes da versão
IFS='.' read -r MAJOR MINOR PATCH <<<"${LAST_TAG#v}"
NEW_VERSION="v$MAJOR.$MINOR.$((PATCH + 1))"
echo "Nova versão: $NEW_VERSION"

# Gera changelog
echo "Gerando changelog para $NEW_VERSION"
{
  echo "## $NEW_VERSION - $(date +%Y-%m-%d)"
  git log "$LAST_TAG"..HEAD --pretty=format:"- %s"
  echo ""
} >> CHANGELOG.md

# Prepara Git
git config user.name "github-actions"
git config user.email "actions@github.com"

# Comita e cria tag
git add CHANGELOG.md

if git diff --cached --quiet; then
  echo "Nenhuma mudança no changelog. Abortando commit."
  exit 0
fi

git commit -m "chore(release): $NEW_VERSION"
git tag "$NEW_VERSION"

# Push com autenticação
git push origin main
git push origin "$NEW_VERSION"