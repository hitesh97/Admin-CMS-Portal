// Main starting point of the application
const express = require('express');
const http = require('http');
var path = require('path');
const bodyParser = require('body-parser'); //middleware which parses HTTP request bodies and makes them available in req.body
const morgan = require('morgan');  //HTTP request logger middleware
const app = express();
const router = require('./routes/router');
const employee = require('./routes/employee');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://127.0.0.1:27017');


// Allow cross-origin resource sharing
app.use(cors());
// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));  //parse bodies of all incoming requests into JSON

app.use(express.static(path.join(__dirname, 'build')));
app.use('/employee', employee);

// Application Routes
router(app);


// Server Setup
const port = process.env.PORT || 3091;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
