let bldrimg;
let builders = [];

function preload(){
  bldrimg = loadImage('Resources/builder.png');
}

function setup(){
  let canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

function draw(){
  clear();
  if(random(1) < 0.01){
    builders.push(new Builder(random(windowWidth),random(windowHeight),random(windowWidth),random(windowHeight),bldrimg));
  }
  for (let i = builders.length - 1; i >= 0; i--){
    builders[i].behaviors();
    builders[i].update();
    builders[i].show();
    if(builders[i].settled) builders.splice(i,1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
