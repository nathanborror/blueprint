all:
	babel --experimental ./src --out-file ./blueprint.js --source-maps
	uglifyjs ./blueprint.js > ./blueprint.min.js
