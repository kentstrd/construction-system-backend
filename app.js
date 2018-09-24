const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const debug = require('debug')('node-angular');
const http = require('http');

const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/ connect to mongoDB local /;
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost:27017/construction-system',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected!!');
  })
  .catch(() => {
    console.log('connection fail!');
  });

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;
  debug('Listening on ' + bind);
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use(require('./middlewares/employees'));
app.use(require('./middlewares/projects'));
app.use(require('./routes'));

app.use(bodyParser.json());
app.route('/api/project').post((req, res) => {
  res.status(201).send(req.body);
});

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

// https://www.terlici.com/2014/08/25/best-practices-express-structure.html
