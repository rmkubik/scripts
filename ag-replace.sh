# ag <https://github.com/ggreer/the_silver_searcher>
# usage: ag-replace.sh [search] [replace]
# caveats: will choke if either arguments contain a forward slash
# notes: will back up changed files to *.bak files

ag -0 -l $1 | xargs -0 perl -pi.bak -e "s/$1/$2/g"
