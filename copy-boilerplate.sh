# $1 == source directory path, first parameter
# $2 == destination directory path, second parameter
# Can use -n flag on rsync to verify copy before executing
rsync -a --progress $1/ $2/ --exclude node_modules/ --exclude .git/
cd $2
git init
git add .
git commit -m "Initial commit"
echo -n "Current Author: "
cat package.json | jq .author
echo -n "Current License: "
cat package.json | jq .license
echo "Delete README.md?"