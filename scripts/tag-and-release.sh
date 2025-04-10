#!/bin/bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# --- Funções Utilitárias ---

get_last_tag() {
  git tag --list | grep -q . && git describe --tags --abbrev=0 || echo ""
}

bump_version() {
  local tag="$1"
  if [[ -z "$tag" ]]; then
    echo "v0.0.1"
  else
    IFS='.' read -r major minor patch <<< "${tag#v}"
    echo "v$major.$minor.$((patch + 1))"
  fi
}

generate_changelog() {
  local version="$1"
  local last_tag="$2"

  echo "## $version - $(date +%Y-%m-%d)" >> CHANGELOG.md

  if [[ -n "$last_tag" ]]; then
    git log "$last_tag"..HEAD --pretty=format:"- %s" >> CHANGELOG.md
  else
    git log --pretty=format:"- %s" >> CHANGELOG.md
  fi

  echo "" >> CHANGELOG.md

  # Também salva changelog da versão atual em arquivo temporário (para GitHub Release, se quiser)
  {
    echo "## $version - $(date +%Y-%m-%d)"
    if [[ -n "$last_tag" ]]; then
      git log "$last_tag"..HEAD --pretty=format:"- %s"
    else
      git log --pretty=format:"- %s"
    fi
    echo ""
  } > .changelog-temp.md
}

configure_git() {
  git config user.name "github-actions"
  git config user.email "actions@github.com"
}

commit_and_tag() {
  local version="$1"

  git add CHANGELOG.md
  if git diff --cached --quiet; then
    echo "Nenhuma mudança no changelog. Nada a commitar."
    return 1
  fi

  git commit -m "chore(release): $version"
  git tag "$version"
  git push origin main
  git push origin "$version"
}

# --- Execução ---

LAST_TAG=$(get_last_tag)

if [[ -z "$LAST_TAG" ]]; then
  echo "Nenhuma tag encontrada. Primeira versão será criada."
else
  echo "Última tag: $LAST_TAG"
fi

NEW_VERSION=$(bump_version "$LAST_TAG")
echo "Nova versão: $NEW_VERSION"

echo "Gerando changelog para $NEW_VERSION"
generate_changelog "$NEW_VERSION" "$LAST_TAG"

configure_git
commit_and_tag "$NEW_VERSION" || exit 0