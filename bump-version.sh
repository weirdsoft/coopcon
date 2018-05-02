# get version from argument
VERSION=`git branch | sed -En "s/.*release\/v(.*)/\1/p"`

# update docker images
sed -Ei "s/[0-9]\.[0-9]\.[0-9]/${VERSION}/" ./docker-compose.prod.yml

# update web
sed -Ei "/version/s/[0-9]\.[0-9]\.[0-9]/${VERSION}/" ./web/package.json

# update api
sed -Ei "/version/s/[0-9]\.[0-9]\.[0-9]/${VERSION}/" ./api/package.json

# update mobile
sed -Ei "/version/s/[0-9]\.[0-9]\.[0-9]/${VERSION}/" ./mobile/package.json
sed -Ei "/version/s/[0-9]\.[0-9]\.[0-9]/${VERSION}/" ./mobile/app.json
