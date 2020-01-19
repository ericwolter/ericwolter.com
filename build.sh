#!/usr/bin/env bash
if [ -d "dist/" ]; then rm -Rf "dist/"; fi

pushd personal/
npm i
npm run build
popd

pushd apple-healthkit-csv/
npm i
./deploy.sh
popd

pushd sunpassy
npm i
npm run build
popd

