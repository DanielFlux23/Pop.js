#!/bin/bash
set -euo pipefail

# Verifica se existe alguma tag
if git tag --list | grep -q .; then
  LAST_TAG=$(git describe --tags --abbrev=0)
  echo "Última tag: $LAST_TAG"
else
  LAST_TAG=""
  echo "Nenhuma tag encontrada. Primeira versão será criada."
fi

# Define nova versão
if [[ -z "$LAST_TAG" ]]; then
  NEW_VERSION="v0.0.1"
else
  IFS='.' read -r MAJOR MINOR PATCH <<<"${LAST_TAG#v}"
  NEW_VERSION="v$MAJOR.$MINOR.$((PATCH + 1))"
fi

echo "Nova versão: $NEW_VERSION"

# Gera changelog
echo "Gerando changelog para $NEW_VERSION"
{
  echo "## $NEW_VERSION - $(date +%Y-%m-%d)"
  if [[ -n "$LAST_TAG" ]]; then
    git log "$LAST_TAG"..HEAD --pretty=format:"- %s"
  else
    git log --pretty=format:"- %s"
  fi
  echo ""
} >> CHANGELOG.md

# Configura git
git config user.name "github-actions"
git config user.email "actions@github.com"

# Faz commit se houver mudanças
git add CHANGELOG.md
if git diff --cached --quiet; then
  echo "Nenhuma mudança no changelog. Nada a commitar."
  exit 0
fi

git commit -m "chore(release): $NEW_VERSION"
git tag "$NEW_VERSION"

# Push
git push origin main
git push origin "$NEW_VERSION"