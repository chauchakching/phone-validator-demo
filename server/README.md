# Nestjs backend

This is the nestjs backend.

Api calls to numberify service are logged to the file `output/logs.txt`.

## Installation

```bash
$ yarn install
```

## Running the app

Create your `.env` file from `.demo.env`.
Then

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Run with docker image

The server will use post `3000`.

To try the docker image on local, first build the image.

```bash
docker build . -t node-validate-phone
```

Then run the image with `.env` file.

```bash
docker run --env-file .env -p 3000:3000 -d node-validate-phone
```

The server should be running on `localhost:3000`.