FROM node:alpine AS build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY public  /app/public
COPY src  /app/src
COPY *.json *.js  /app/

RUN npm run build

FROM nginx:alpine

# Install openssl
RUN apk add --no-cache openssl

# Create the directory for the SSL certificates
RUN mkdir -p /etc/nginx/ssl

COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

# Generate self-signed certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/selfsigned.key -out /etc/nginx/ssl/selfsigned.crt -subj "/CN=localhost"

COPY portfolio.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
