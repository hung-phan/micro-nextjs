#!/usr/bin/env bash

source $(dirname "$0")/env/development.sh
npm run clean
nodemon server/index.ts
