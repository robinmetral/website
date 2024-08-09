# `iconv -t ascii//TRANSLIT`: transforms to ascii, e.g. `ç` to `c` or `é` to `'e`
# `sed -E -e 's/expression/replacement/flags'`: substitute in string using sed regexp. `-e` for each new expression
# - `s/[^[:alnum:]]/-/g`: replace non-alphanumeric characters by a dash
# - `s/^-+|-+$//g`: remove leading and trailing dashes
# - `s/-{2,}/-/g`: replace 2+ dashes by a single dash
# `tr '[:upper:]' '[:lower:]'`: lowercase using tr

# FIXME: salé gets transformed into sal'e which gets transformed into sal-e

slugify () {
  echo "$1" | iconv -t ascii//TRANSLIT | sed -E -e 's/[^[:alnum:]]/-/g' -e 's/^-+|-+$//g' -e 's/-{2,}/-/g' | tr '[:upper:]' '[:lower:]'
}

if [ -z "$1" ]
  then
    echo "Name the post using 'npm run new \"New post name\"'"
    exit 1
else
  slug=$(slugify "$1")
  echo -e "---\ntitle: \"$1\" \ncategories:\n  - name: \npublishDate: \"$(date '+%Y-%m-%d')\"\ntemplate: page\nbuildScript: \"/scripts/processNote.js\"\n---" > pages/notes/$slug.md
  echo "Created new note \"$1\" at \"/pages/notes/$slug.md\""
fi
