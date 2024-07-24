const fs = require('fs');
const path = require('path');

const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Redirecting...</title>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var userLang = navigator.language || navigator.userLanguage;
      if (userLang.startsWith('de')) {
        window.location.href = '/de/';
      } else {
        window.location.href = '/en/';
      }
    });
  </script>
</head>
<body>
  <p>If you are not redirected automatically, follow this <a href="/de/">link to the German version</a> or this <a href="/en/">link to the English version</a>.</p>
</body>
</html>
`;

const outputPath = path.join(__dirname, 'dist', 'portfolio', 'browser', 'index.html');
fs.writeFileSync(outputPath, indexContent, 'utf8');
console.log('index.html generated successfully.');
