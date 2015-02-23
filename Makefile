all:
	jsx ./src/ ./build/
	uglifyjs ./build/*.js > ./blueprint.min.js
