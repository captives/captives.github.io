#!/bin/bash
echo 'Build ....'
npm run build

echo 'Copy src....'
cp -rf ./src ./captives.github.io/src
# cp -rf ./public ./captives.github.io/public

cp -rf ./*.sh ./*.md ./*.js ./*.json ./captives.github.io/src

echo 'Backup... https://captives.github.io/'
cp -rf /Volumes/DATA/github/captives.github.io/.git ./captives.github.io

echo 'Build https://captives.github.io/'
rm -rf /Volumes/DATA/github/captives.github.io
cp -rf ./captives.github.io /Volumes/DATA/github

rm -rf "./captives.github.io"
echo 'build complete ~'
done