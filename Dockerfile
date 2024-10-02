FROM node:alpine AS build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY public  /app/public
COPY src  /app/src
COPY *.json *.js  /app/

RUN npm run build

RUN npm run generate-nginx-config

FROM nginx:alpine

RUN apk add --no-cache openssl

RUN mkdir -p /etc/nginx/ssl

COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/selfsigned.key -out /etc/nginx/ssl/selfsigned.crt -subj "/CN=localhost"

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
