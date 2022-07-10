#!/usr/bin/env bash

source $(dirname "$0")/env/production.sh
source $(dirname "$0")/env/production_server.sh
next start
