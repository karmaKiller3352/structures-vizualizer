#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run build

rm -R docs
mv dist docs
git add .
git commit -m 'deploy'
git push origin dev --force