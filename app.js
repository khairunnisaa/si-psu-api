var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var logger = require('morgan');
const cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var perumahanRouter = require('./routes/perumahan');
var pertamananRouter = require('./routes/pertamanan');
var permukimanRouter = require('./routes/permukiman');
var fotoRouter = require('./routes/foto');
const model = require('./models/index');
var Stream = require('node-rtsp-stream');
// var stream = new Stream({
//   name: 'name',
//   streamUrl: 'rtsp://admin:aditya123@192.168.0.22:554/onvif1',
//   wsPort: 9999,
//   ffmpegOptions: { // options ffmpeg flags
//     '-stats': '', // an option with no neccessary value uses a blank string
//     '-r': 30 // options with required values specify the value after the key
//   }
// });
var app = express();
var corsOptions = {
  origin: "http://localhost:4201"
};
app.use(cors({origin: "*"}));
// app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const db = require("./models");
db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  initial();
  console.log("Drop and re-sync db.");
});
function initial() {
  model.roles.create({
    id: 1,
    name: "user"
  });

  model.roles.create({
    id: 2,
    name: "moderator"
  });

  model.roles.create({
    id: 3,
    name: "admin"
  });
}
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/perumahans', perumahanRouter);
app.use('/pertamanans',pertamananRouter);
app.use('/permukimans',permukimanRouter);
app.use('/fotos',fotoRouter);
require('./routes/auth')(app);
require('./routes/user')(app);
// const Stream = require('node-rtsp-stream-jsmpeg');

// const options = {
//   name: 'cctv',
//   url: 'rtsp://admin:aditya123@192.168.0.13:554/onvif1',
//   wsPort: 9999
// };
//
// var stream = new Stream(options);
// stream.start();
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
