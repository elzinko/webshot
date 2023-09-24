# WebShot

Easily capture visual snapshots of web pages in an instant.

## :sparkles: Overview

**WebShot** is a straightforward application that converts URLs into images. It is designed to be user-friendly and easy to deploy anywhere.

## :bulb: Features

- Capture website screenshots in desktop view.
- Capture website screenshots in mobile view.
- Capture website screenshots of specific selector id.

## :zap: Installation

You can install and run it using two different methods :

### Node.js

```bash
npm install && \
npm run start
```

### Docker

Get [Docker](https://docs.docker.com/get-docker/) and then run :

```bash
docker build -t webshot . && \
docker run -p 3000:3000 webshot
```

## :fire: Fire it up

Open [website](http://localhost:3000/) for more information and API samples

- get [github.com desktop screenshot](http://localhost:3000/api/webshot?url=https://github.fr)

- get [github.com mobile screenshot](http://localhost:3000/api/webshot?url=https://github.fr&device=mobile)

- get [github.com screenshot of specific selector Id](http://localhost:3000/api/webshot?url=https://github.fr&selectorId=productivity)

## e2e

You can launch some simple e2e tests :

- start the application
- run tests : ```npm run e2e:run```

## Quality

[![WebShot CI/CD](https://github.com/elzinko/webshot/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/elzinko/webshot/actions/workflows/main.yml)
