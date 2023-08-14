install:
		npm ci

start:
		bin/hugo/hugo server -D

build:
		bin/hugo/hugo --minify
