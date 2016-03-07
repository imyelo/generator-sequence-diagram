var connect = require('connect');
var statics = require('serve-static');
var socketio = require('socket.io');
var http = require('http');
var path = require('path');

var CONSTANT = require('./constant');
var watch = require('./watch');
var app = connect();
var server = http.Server(app);
var io = socketio(server);
var log = console.log.bind(console);

server.listen(CONSTANT.PORT, function () {
  log('Now you can visit http://localhost:%s/', CONSTANT.PORT);
});

app.use(statics(path.resolve(__dirname, './static'), {
  index: ['index.html']
}));

io.on('connection', function (socket) {
  var send = function (content) {
    log('socket(%s): send content.', socket.id)
    socket.emit('content', content);
  };

  log('socket(%s): connected.', socket.id);

  if (watch.last) {
    send(watch.last);
  }
  watch.on('content', send);

  socket.on('disconnect', function () {
    log('socket(%s): disconnected.', socket.id);
    watch.removeListener('content', send);
  });
});
