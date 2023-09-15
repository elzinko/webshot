# WebShot

Easily capture visual snapshots of web pages in an instant.

## :sparkles: Overview

**WebShot** is a straightforward application that converts URLs into images. It is designed to be user-friendly and easy to deploy anywhere.

## :bulb: Features

- Capture website screenshots in desktop view.
- Capture website screenshots in mobile view.

## :zap: Installation

You can install it using two different methods :

### Node.js

```bash
npm install && \
npm run start
```

### Docker

Get [Docker](https://docs.docker.com/get-docker/) and then run :

```bash
docker build -t webshot . && 
docker run -it webshot
```

## :fire: Fire it up

The application avalaible through `/api/` path.

- get [github.com desktop screenshot](http://localhost:3000/api/github.com)

- get [github.com mobile screenshot](http://localhost:3000/api/github.com?device=mobile)

## e2e

You can launch some simple e2e tests :

- start the application
- run tests : ```npm run cy:run```