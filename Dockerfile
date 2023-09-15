FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY . .
RUN npm install

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build /app /usr/src/app
WORKDIR /usr/src/app
CMD ["index.js"]