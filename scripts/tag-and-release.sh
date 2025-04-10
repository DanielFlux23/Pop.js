#!/bin/bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# === Funções auxiliares ===

function get_last_tag() {
  git tag --list | grep -q . && git describe --tags --abbrev=0 || echo ""
}

function detect_version_bump() {
  local last_tag="$1"
  local log_range="HEAD"
  [[ -n "$last_tag" ]] && log_range="$last_tag..HEAD"

  local has_breaking has_feat has_fix
  has_breaking=$(git log "$log_range" --grep="BREAKING CHANGE" -i -1 --pretty=format:"%s" || true)
  has_feat=$(git log "$log_range" --grep="^feat:" -i -1 --pretty=format:"%s" || true)
  has_fix=$(git log "$log_range" --grep="^fix:" -i -1 --pretty=format:"%s" || true)

  if [[ -n "$has_breaking" ]]; then
    echo "major"
  elif [[ -n "$has_feat" ]]; then
    echo "minor"
  elif [[ -n "$has_fix" ]]; then
    echo "patch"
  else
    echo "patch"
  fi
}

function bump_version() {
  local tag="$1"
  local bump_type="$2"

  if [[ -z "$tag" ]]; then
    echo "v0.1.0"
    return
  fi

  IFS='.' read -r major minor patch <<<"${tag#v}"

  case "$bump_type" in
    major) ((major++)); minor=0; patch=0 ;;
    minor) ((minor++)); patch=0 ;;
    patch) ((patch++)) ;;
  esac

  echo "v$major.$minor.$patch"
}

function generate_changelog() {
  local version="$1"
  local last_tag="$2"
  local log_range="HEAD"
  [[ -n "$last_tag" ]] && log_range="$last_tag..HEAD"

  # Evita duplicação
  if grep -q "## $version" CHANGELOG.md 2>/dev/null; then
    echo "Changelog já contém entrada para $version. Ignorando."
    return
  fi

  {
    echo "## $version - $(date +%Y-%m-%d)"

    git log "$log_range" --pretty=format:"%s" | while read -r line; do
      case "$line" in
        feat:*)  echo "- [Added] ${line#feat: }" ;;
        fix:*)   echo "- [Fixed] ${line#fix: }" ;;
        *BREAKING*|*breaking change*) echo "- [Breaking] $line" ;;
        *)       echo "- $line" ;;
      esac
    done

    echo ""
  } >> CHANGELOG.md
}

function configure_git() {
  git config user.name "github-actions"
  git config user.email "actions@github.com"
}

function commit_and_tag() {
  local version="$1"

  git add CHANGELOG.md
  if git diff --cached --quiet; then
    echo "Sem mudanças detectadas no changelog. Nada a commitar."
    return 1
  fi

  git commit -m "chore(release): $version"
  git tag "$version"
  git push origin main
  git push origin "$version"
}

# === Execução principal ===

LAST_TAG=$(get_last_tag)

if [[ -z "$LAST_TAG" ]]; then
  echo "Nenhuma tag anterior encontrada. Iniciando controle de versão."
else
  echo "Última tag encontrada: $LAST_TAG"
fi

BUMP_TYPE=$(detect_version_bump "$LAST_TAG")
NEW_VERSION=$(bump_version "$LAST_TAG" "$BUMP_TYPE")
echo "Nova versão detectada: $NEW_VERSION ($BUMP_TYPE)"

generate_changelog "$NEW_VERSION" "$LAST_TAG"

configure_git
commit_and_tag "$NEW_VERSION" || exit 0