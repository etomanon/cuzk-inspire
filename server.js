const http = require('http');
const app = require('./app');
// const https = require('https');
// const fs = require('fs');

// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.cert', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

const port = process.env.PORT || 5000;

const server = http.createServer(app)
// const server = https.createServer(credentials, app);

server.listen(port, () => console.log(`Listening on port ${port}`))


