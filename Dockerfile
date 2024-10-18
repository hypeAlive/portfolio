FROM node:18.20.2-alpine AS build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retries 5
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

RUN npm i --force --verbose --trace-warnings

COPY public  /app/public
COPY src  /app/src
COPY *.json *.js  /app/

ARG BUILD_IN
RUN case "$BUILD_IN" in \
      test1) echo "Running build:test1" && npm run build:test1 ;; \
      prod) echo "Running build:prod" && npm run build:prod ;; \
      dev) echo "Running build:dev" && npm run build:dev ;; \
      *) echo "Running default build:prod" && npm run build:prod ;; \
    esac

RUN npm run generate:nginx-config

FROM nginx:alpine

RUN apk add --no-cache openssl

RUN mkdir -p /etc/nginx/ssl

COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/selfsigned.key -out /etc/nginx/ssl/selfsigned.crt -subj "/CN=localhost"

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
