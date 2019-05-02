function Builder(sx,sy,ex,ey,img){
  this.img = img;
  this.pos = createVector(sx,sy);
  this.endpos = createVector(ex,ey);
  this.size = random(120,125);
  this.vel = createVector(random(-5,5),random(-5,5));
  this.acc = createVector(0,0);
  this.maxspeed = 2;
  this.maxforce = 0.1;
  this.settled = false;
}

Builder.prototype.checkSettled = function(){
  if(this.pos.x > this.endpos.x - 1 && this.pos.y > this.endpos.y - 1 && this.pos.x < this.endpos.x + 1 && this.pos.y < this.endpos.y + 1){
    this.settled = true;
  }
}

Builder.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
  this.checkSettled();
}

Builder.prototype.behaviors = function(){
  let arrive = this.arrive(this.endpos);
  arrive.mult(1);
  this.applyForce(arrive);
}

Builder.prototype.applyForce = function(f){
  this.acc.add(f);
}

Builder.prototype.show = function(){
  imageMode(CENTER);
  image(this.img,this.pos.x,this.pos.y,this.size,this.size);
}

Builder.prototype.arrive = function(endpos){
  let desired = p5.Vector.sub(endpos,this.pos);
  let distance = desired.mag();
  let speed = this.maxspeed;
  if(distance < 100) speed = map(distance,0,100,0,this.maxspeed);
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);
  return steer;
}
