git log --pretty=format:"%h - %ad - %s" -- $1 | node ~/git/scripts/audit-log.js $1 $2