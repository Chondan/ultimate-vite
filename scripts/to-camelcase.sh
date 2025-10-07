#!/bin/bash

# to-camelcase.sh
#
# Description:
#   This script renames all .tsx files in a specified directory to PascalCase (CamelCase),
#   which is the standard naming convention for React components.
#   It can optionally process nested directories.
#
# Usage:
#   sh ./to-camelcase.sh --dir=./path/to/dir --nested=true
#   sh ./to-camelcase.sh --dir=./path/to/dir --nested=false
#
# Arguments:
#   --dir      Directory to process (required)
#   --nested   If "true", process nested directories recursively. If "false", only process top-level files.
#
# Example:
#   sh ./to-camelcase.sh --dir=./src/components --nested=true
#
# The script will rename files like my-component.tsx to MyComponent.tsx.

# Default values
dir="."
nested="false"

# Parse arguments
for arg in "$@"; do
    case $arg in
        --dir=*)
            dir="${arg#*=}"
            shift
            ;;
        --nested=*)
            nested="${arg#*=}"
            shift
            ;;
    esac
done

if [[ "$nested" == "true" ]]; then
    find "$dir" -type f -name "*.tsx"
else
    find "$dir" -maxdepth 1 -type f -name "*.tsx"
fi | while read -r file; do
    base=$(basename "$file" .tsx)
    pascal=$(echo "$base" | awk -F'[-_]' '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) substr($i,2) }}1' OFS='')
    if [[ "$base" != "$pascal" ]]; then
        newfile="$(dirname "$file")/$pascal.tsx"
        mv "$file" "$newfile"
        echo "Renamed: $file -> $newfile"
    fi
done