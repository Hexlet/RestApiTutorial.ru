install:
		npm ci

start:
		hugo server -D

build:
		hugo --minify
