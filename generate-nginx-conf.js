const fs = require('fs');
const path = require('path');

function loadAngularConfig() {
  const angularConfigPath = path.resolve(__dirname, 'angular.json');
  return JSON.parse(fs.readFileSync(angularConfigPath, 'utf8'));
}

const languages = [];

function getLanguagesFromConfig() {
  const config = loadAngularConfig();
  const portfolio = config.projects.portfolio;
  const sourceLocale = portfolio.i18n.sourceLocale;
  const locales = portfolio.i18n.locales;

  const removeSlash = (str) => str.replace('/', '');

  languages.push(removeSlash(sourceLocale));

  for (const locale in locales) {
    if (locales.hasOwnProperty(locale)) {
      languages.push(removeSlash(locale));
    }
  }
}

function generateHttp() {
  const mapEntries = languages.map(lang => `~*^${lang} ${lang};`).join('\n      ');
  return `http {
    include       mime.types;
    default_type  application/octet-stream;

    map $http_accept_language $accept_language {
      ${mapEntries}
    }

    include /etc/nginx/conf.d/*.conf;
}`;
}

function generateServer() {
  const languagesString = languages.map(lang => lang).join('|');
  return `server {
    listen 443 ssl;
    server_name 0.0.0.0;
    root /usr/share/nginx/html;

    ssl_certificate /etc/nginx/ssl/selfsigned.crt;
    ssl_certificate_key /etc/nginx/ssl/selfsigned.key;

    # default lang
    if ($accept_language ~ "^$") {
        set $accept_language "${languages[0]}";
    }

    # redirect to default language if no language is specified
    if ($uri !~ ^/(${languagesString})/) {
      rewrite ^/(.*)$ /$accept_language/$1 permanent;
    }

    # ensure no consecutive language codes
    if ($uri ~ ^/(${languagesString})/(${languagesString})/) {
      rewrite ^/(${languagesString})/(.*)$ /$1/$2 permanent;
    }

    rewrite ^/$ /$accept_language permanent;

    location ~ ^/(${languagesString}) {
        try_files $uri /$1/index.html?$args;
    }
}`;
}

function generateFallback() {
  return `server {
    if ($host = 0.0.0.0) {
        return 301 https://$host$request_uri/;
    }


    server_name 0.0.0.0;

    listen 80;
    return 404;
}`;
}

function generateNginxConfig() {
  const httpConfig = generateHttp();

  return `events {}\n\n${httpConfig}`;
}

function generateDefaultConfig() {
  const serverConfig = generateServer();
  const fallbackConfig = generateFallback();

  return `${serverConfig}\n\n${fallbackConfig}\n\n`;
}

function writeNginxConfigToFile() {
  const nginxConfig = generateNginxConfig();
  const outputPath = path.resolve(__dirname, 'nginx.conf');
  fs.writeFileSync(outputPath, nginxConfig, 'utf8');
  console.log(`NGINX configuration written to ${outputPath}`);
}

function writeDefaultConfigToFile() {
  const nginxConfig = generateDefaultConfig();
  const outputPath = path.resolve(__dirname, 'default.conf');
  fs.writeFileSync(outputPath, nginxConfig, 'utf8');
  console.log(`NGINX configuration written to ${outputPath}`);
}

getLanguagesFromConfig();
writeNginxConfigToFile();
writeDefaultConfigToFile();


