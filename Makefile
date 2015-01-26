
all: columnify.js

prepublish: all

columnify.js: index.js
	6to5 index.js > columnify.js

.PHONY: all prepublish
