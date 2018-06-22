#!/usr/bin/env bash

source $(dirname "$0")/env/development.sh
nodemon server/index.ts
