#!/usr/bin/env bash

# $1=steps.commit_type.outputs.release_type
# $2=CurrentBranch

ReleaseType=$1
CurrentBranch=$2

#REPLACED="${TITLE//\//\\/}"
cat <<EOF >./remote_pr.md
$(gh pr view)
EOF
TITLE=${GITHUB_REF#refs/heads/}
IDENTIFIER=$(cat <<EOF
- [ ] The above area is tracked and modified by GitHub Actions. Check this option if you want to control by yourself.
EOF
)
PR_COUNT=$(gh pr list --state open --head "$CurrentBranch" | wc -l)
if ! grep -Fq -- "$IDENTIFIER" ./remote_pr.md && [ "$PR_COUNT" -gt 0 ]; then
  echo "skip"
  exit 0
#    PR_BODY="$(sed -n "/$REPLACED/,\$p" ./remote_pr.md)"
else
  echo "disableSkip"
fi

PR_TEMPLATE=$(cat .github/PR_TEMPLATE.md)
PR_BODY="${PR_TEMPLATE//\[Branch-Placeholder\]/$TITLE}"
COMMITS=$(git log origin/develop..HEAD --pretty=format:"- %s")
PR_BODY="${PR_BODY//\[Commits-Placeholder\]/$COMMITS}"

#steps.commit_type.outputs.release_type
case $ReleaseType in
  *major)
    PR_BODY="${PR_BODY//\[ \] Breaking change/[x] Breaking change}"
    ;;
  *minor)
    PR_BODY="${PR_BODY//\[ \] New feature/[x] New feature}"
    ;;
  *patch)
    PR_BODY="${PR_BODY//\[ \] Bug fix/[x] Bug fix}"
    ;;
esac

cat <<EOF >./pr_body.md
$PR_BODY
EOF