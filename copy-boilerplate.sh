# $1 == source directory path, first parameter
# $2 == destination directory path, second parameter
cp -r $1 $2
cd $2
rm -rf node_modules
rm -rf .git
