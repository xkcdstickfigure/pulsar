for i in dist/*/; do zip -r "${i%/}.zip" "$i"; done
