# $1 == source directory path, first parameter
# $2 == destination directory path, second parameter
# Can use -n flag on rsync to verify copy before executing
rsync -av --progress $1/* $2 --exclude node_modules --exclude .git
cd $2
git init
git add .
git commit -m "Initial commit"
