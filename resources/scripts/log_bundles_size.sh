SIZE=$(sh ./resources/scripts/get_total_bundles_size.sh)
MAIN=$(sh ./resources/scripts/get_main_bundle_size.sh)
NOW=$(date)
OUTPUT=$(echo -e '['$NOW'] \t '$SIZE' \t '$MAIN)

if [ -z "$1" ] || [ "--output" != "$1" ]; then
  echo "$OUTPUT" >> ./resources/logs/bundles_size_history.log
else
  echo "$OUTPUT"
fi
