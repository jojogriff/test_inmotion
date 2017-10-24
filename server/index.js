// Application Starting Point
const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', { useMongoClient: true}, (err) => {
  if (err) console.log('error connecting to db', err);
  else if (process.env.NODE_ENV !== 'test') {
    console.log('Successfully connected to db');
  }
});

app.use(cors());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'));
}
app.use(compression());
app.use(bodyParser.json({ "limit": "5mb" }));
app.use(bodyParser.urlencoded({ "extended": false, "limit": "5mb" }));
app.use(express.static(path.join(__dirname, 'public')));
router(app);

// Server Setup
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
if (process.env.NODE_ENV !== 'test') {
  console.log('Server spinning on port', port);
}

module.exports = server
