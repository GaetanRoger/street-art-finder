ls -la dist/street-art-finder | grep main | grep js$ | sed 's/  */ /g' | cut -d" " -f5,5
