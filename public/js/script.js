var convertBtn = document.querySelector('.convert-button');
var clearBtn = document.querySelector('.clear-button');
var URLinput = document.querySelector('.URL-input');
var color = document.querySelector('#favcolor');
var range_bar = document.querySelector('#range_bar');

var stroke_color = '#2ca6f2';
var song;
var radius = 80;
var radius_tmp = 80;

window.addEventListener("resize",function(e){
  range_bar.setAttribute("max", window.innerWidth);
});

range_bar.addEventListener('input',function(e){
  radius = e.target.value;
});

color.addEventListener('input', function(e){
  stroke_color = e.target.value;
});

convertBtn.addEventListener('click', () => {
    sendURL(URLinput.value);
});
clearBtn.addEventListener('click',()=>{
  if(song != undefined){
    let sound_file = song.file;
    $.ajax({
      url : 'http://localhost:3000/delete',
      data : {FILE : sound_file},
      method : 'GET'
    }).done(function(json){
      console.log('success delete file');
    }).fail(function(xhr, status, errorThrown){
      console.log(errorThrown);
    })
    URLinput.value = '';
    song.pause();
    song = null;
  }
  else{
    console.log('nothing to clear');
  }

})
function sendURL(URL) {
  $.ajax({
    xhr: function(){
      var xhr = new window.XMLHttpRequest();
      xhr.addEventListener("progress", function(evt){
           if (evt.lengthComputable) {
               var percentComplete = evt.loaded / evt.total;
               // Do something with download progress
               console.log(percentComplete);
           }
       }, false);

       return xhr;
    },
    url : 'http://localhost:3000/download',
    data : {URL : URL},
    method : 'GET',
  }).done(function(json){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var matchs = URL.match(regExp);
    song = loadSound(`/music/${matchs[7]}`);
  }).fail(function(xhr, status, errorThrown){
    console.log(errorThrown);
  })
}
