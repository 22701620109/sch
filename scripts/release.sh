#!/usr/bin/env bash

isVersionSuccess=false

echo "Start release"
if [[ $1 == 'patch' ]]; then
    npm version patch -m "feat: update to %s"
    isVersionSuccess=true
elif [[ $1 == 'minor' ]]; then
    npm version minor -m "feat: update to %s"
    isVersionSuccess=true
elif [[ $1 == 'major' ]]; then
    npm version major -m "feat: update to %s"
    isVersionSuccess=true
fi

if [[ $isVersionSuccess == true ]]; then
    echo "-> Release successes, start generate CHANGELOG"
    commitTitle=$(git log --pretty=format:"%s" HEAD -1)
    tag=$(git describe --tags "$(git rev-list --tags --max-count=1)")
    commitBody="for more details in [CHANGELOG](https://github.com/Nek0-hinata/projectS/blob/main/CHANGELOG.md)"
    git reset --soft HEAD^
    pnpm changelog
    git add .
    git commit -m "$commitTitle" -m "$commitBody"

    git tag --delete "$tag"
    git tag -a -s "$tag" -m "$commitTitle" -m "$commitBody"

    git push origin "$tag"

    unset tag
    unset commitTitle
    unset commitBody
else
      echo "-> Release failed, check if your local change is submitted"
      exit 1
fi

unset isVersionSuccess
