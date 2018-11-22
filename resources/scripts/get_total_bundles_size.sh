ls -la dist/street-art-finder | grep js$ | sed 's/  */ /g' | cut -d" " -f5,5 | awk '{s+=$1} END {print s}'
