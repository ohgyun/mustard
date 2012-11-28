#!/bin/bash

# compress javascript files
java -jar compiler.jar \
--js ../js/license.js \
--js ../js/json3.js \
--js ../js/beautify.js \
--js ../js/prettify.js \
--js ../js/mustard.js \
--js_output_file mustard.min.js

mv mustard.min.js ../

exit 0
