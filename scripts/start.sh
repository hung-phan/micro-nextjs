#!/usr/bin/env bash

source $(dirname "$0")/env/production.sh
node .next_server/server/index.js
