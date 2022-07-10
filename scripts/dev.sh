#!/usr/bin/env bash

source $(dirname "$0")/env/development.sh
npm run clean
next dev
