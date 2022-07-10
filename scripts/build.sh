#!/usr/bin/env bash

source $(dirname "$0")/env/production.sh
npm run clean
next build
