module.exports = function(app, ytdl, fs)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });

    app.get('/download',function(req,res){
      var url = req.query.URL;
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var matchs = url.match(regExp);
      var stream;
      if(matchs){
        stream = ytdl(url).pipe(fs.createWriteStream(`public/music/${matchs[7]}`));
        stream.on('finish',function(){
          res.download(`public/music/${matchs[7]}`);
        })
      }
      else{
        console.log('type correct url');
      }
    })

    app.get('/delete',function(req,res){
      var file = req.query.FILE;
      fs.unlink(`public/${file}`,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('file delete success');
        }
      });
      res.end('');
    })
}
