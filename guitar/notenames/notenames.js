var canvas,context,background;
function Setup(){
   canvas=document.getElementById("gtneck");
   if(!canvas){alert('Error: Canvas not found');return;}
   if(!canvas.getContext){alert('Error: no canvas.getContext');return;}
   context=canvas.getContext("2d");
   if(!context){alert('Error: failed to get context');return;}
   let neckHeight=100;
   let neckWidth=800;
   background=new Background(new Vector(200,50),neckHeight,neckWidth);
   Draw();
}
function Draw(){
   background.Draw(context);
}

class Background{
   constructor(pPos,pNeckHeight,pNeckWidth){
      this.mPos=pPos;
      this.mNeckHeight=pNeckHeight;
      this.mNeckWidth=pNeckWidth;
      this.mEdgeVal=(pNeckHeight/7)/2;
      this.mGap=(pNeckHeight-(this.mEdgeVal*2))/5;
   }
   Draw(pContext){
      pContext.save();
      pContext.lineWidth=3;
      pContext.translate(this.mPos.GetX(),this.mPos.GetY());
      this.DrawOutline(pContext);
      this.DrawStrings(pContext);
      //this.DrawNeckMarkers(pContext);
      pContext.restore();
   }
   DrawOutline(pContext){
      pContext.beginPath();
      pContext.moveTo(0,0);
      pContext.lineTo(this.mNeckWidth,0);
      pContext.lineTo(this.mNeckWidth,this.mNeckHeight);
      pContext.lineTo(0,this.mNeckHeight);
      pContext.closePath();
      pContext.stroke();
   }
   DrawStrings(pContext){
      pContext.strokeStyle='#ff0000';
      for(let i=0;i<6;i++){
         pContext.beginPath();
         let yCoord=this.mEdgeVal+(this.mGap*i);
         pContext.moveTo(0,yCoord);
         pContext.lineTo(this.mNeckWidth,yCoord);
         pContext.closePath();
         pContext.stroke();
      }
      pContext.strokeStyle='#000000';
   }
}

var Vector=(function(){
   function Vector(pX,pY){
      this.SetX(pX);
      this.SetY(pY);
   };
   Vector.prototype.GetX=function(){return this.mX;}
   Vector.prototype.SetX=function(pX){this.mX=pX;}
   Vector.prototype.GetY=function(){return this.mY;}
   Vector.prototype.SetY=function(pY){this.mY=pY;}
   return Vector;
})();