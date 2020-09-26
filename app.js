const express = require('express');
const Youtube = require('youtube-node');
const youtube = new Youtube();
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const router = require('./router/main')(app, ytdl, fs);
const port = 3000;

youtube.setKey('AIzaSyCZw7iOlNr1xAR_qQpNJb1uGBue9yHoTew');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+'/public'));
app.use(function(req, res, next) {                  
  res.status(404).send('Sorry cant find that!');
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
