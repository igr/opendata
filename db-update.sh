#!/usr/bin/env bash

cp ../opendata-validator/data/opendata.json src/data/
cp ../opendata-validator/data/opendata_scores.json src/data/
cp ../opendata-validator/data/opendata_scores.json src/static/d/hs-1

node generate-stats.js