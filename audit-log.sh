# This script searches the git log current git branch of
# the repository it is invoked in.
#
# It will find all commits that modify a provided file name
# and then it will search that file in each of those commits
# for the provided search term.
#
# This scripts takes two arguements
# $1 - a file path to be read in for each commit
# $2 - a search term to look for in the file
#
# ex.: ~/git/scripts/audit-log.sh package-lock.json lodash
git log --pretty=format:"%h - %ad - %s" -- $1 | node ~/git/scripts/audit-log.js $1 $2