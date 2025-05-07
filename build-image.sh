#!/bin/bash
git pull
rm -rf build/*
yarn install && npx update-browserslist-db@latest && yarn build && docker build -t planning-poker:latest .
