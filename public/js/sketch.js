var fft;
var hz = 256;
var w;
var angle;
var start_x;
var start_y;
var last_x;
var last_y;
var spectrum;
var amp;
var j=0;


function mapRange (value, a, b, c, d) {
    value = (value - a) / (b - a);
    return Number(c) + Number(value * (d - c));
}

function playSong(){
  if(!song.isPlaying()){
    song.play();
  }
}

function stopSong(){
  song.pause();
}

function preload(){
  song = loadSound('/music/hFU9Z_K7arg',function(){
  });
}

function setup(){
  createCanvas(windowWidth, windowHeight,WEBGL);
  w = windowWidth/hz;
  background(200);
  //colorMode(HSB);
  //angleMode(DEGREES);
  let button_play = document.getElementById("play");
  let button_stop = document.getElementById("pause");
  button_play.onclick = playSong;
  button_stop.onclick = stopSong;
  fft = new p5.FFT(0.9, hz);
}

function draw(){
  resizeCanvas(windowWidth,windowHeight);
  background(125);
  spectrum = fft.analyze();
  //noStroke();
  //translate(width/2,height/2);
  rotateX(180);
  for (var i = 0; i < spectrum.length; i++) {
    angle = map(i, 0, spectrum.length, 0, 360);
    start_x = cos(angle)*radius;
    start_y = sin(angle)*radius;
    amp = spectrum[i];
    amp = mapRange(amp,0,255, radius, 2*radius);
    /*if(j==1000){
      console.log(amp);
      j=0;
    }
    j = j + 1;*/
    last_x = cos(angle)*amp;
    last_y = sin(angle)*amp;
    stroke(stroke_color);
    beginShape();
    vertex(start_x,start_y,1);
    vertex(last_x,last_y,2);
    endShape();
    //line(start_x,start_y, last_x, last_y);
    //var y = map(amp, 0, 256, height, 0);
    //rect(i * w, y, w - 2, height - y);
  }
}
