var express = require('express');
var app = express();
var path = require('path');
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');
var http = require('http');

app.use(express.static(__dirname+'/public'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views')
app.get('/', function(req, res){
    res.render('index', {});
});
var server = http.createServer(app).listen(3000, '127.0.0.1', function(){
  console.info('i am listing ...');
});
var appconfig = {server: server, path: '/binary-endpoint'}
var binaryserver  = binaryServer(appconfig);
var i =0;
binaryserver .on('connection', function(client) {
var fileWriter = null;
client.on('stream', function(stream, meta) {
 console.info(meta);
 console.info('data writing start');
  var fileWriter = new wav.FileWriter('demo.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });
  stream.pipe(fileWriter);
  stream.on('end', function() {
    fileWriter.end();
  });
});
client.on('close', function() {
 console.log('close'+ i++);
  if (fileWriter != null) {
    fileWriter.end();
  }
}); 
console.log('binary data is streamed');
});
