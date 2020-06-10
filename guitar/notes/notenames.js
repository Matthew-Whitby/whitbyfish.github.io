var canvas,ctx,display,quiz,currentQ,answerBox,response,sharpbool;
function Setup(){
   canvas=document.getElementById("gtneck");
   if(!canvas){alert('Error: Canvas not found');return;}
   if(!canvas.getContext){alert('Error: no canvas.getContext');return;}
   ctx=canvas.getContext("2d");
   if(!ctx){alert('Error: failed to get context');return;}
   let neckHeight=100,neckWidth=800;
   ctx.translate(200,50);
   answerBox=document.getElementById("AnswerBox");
   response=document.getElementById("response");
   sharpbool=true;
   display=new Display(new Vector(200,50),neckHeight,neckWidth);
   quiz=new Quiz();
   display.Draw();
}
function SwitchSharps(val){
   let aSBtn=document.getElementById("ASharpBtn");
   let cSBtn=document.getElementById("CSharpBtn");
   let dSBtn=document.getElementById("DSharpBtn");
   let fSBtn=document.getElementById("FSharpBtn");
   let gSBtn=document.getElementById("GSharpBtn");
   aSBtn.innerText=(aSBtn.innerText=="A#")?"Ab":"A#";
   cSBtn.innerText=(cSBtn.innerText=="C#")?"Cb":"C#";
   dSBtn.innerText=(dSBtn.innerText=="D#")?"Db":"D#";
   fSBtn.innerText=(fSBtn.innerText=="F#")?"Fb":"F#";
   gSBtn.innerText=(gSBtn.innerText=="G#")?"Gb":"G#";
   if(val=="sharp")sharpbool=true;
   else sharpbool=false;
}
function AnswerClicked(val){
   quiz.GetQuestion(val);
}
class Quiz{
   constructor(){
      this.dict={};
      this.flats={};
      this.FillDict();
   }
   FillDict(){
      let notes=['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
      let startindex=[7,0,5,10,2,7];
      startindex.reverse();
      for(let j=1;j<7;j++){
         let cur=startindex[j-1];
         for(let i=0;i<13;i++){
            let fretname=j.toString()+i.toString();
            this.dict[fretname]=notes[cur];
            if(cur<=10)cur++;
            else cur=0;
         }
      }
      this.flats['A#']='Bb';
      this.flats['C#']='Db';
      this.flats['D#']='Eb';
      this.flats['F#']='Gb';
      this.flats['G#']='Ab';
      this.flats['Bb']='A#';
      this.flats['Db']='C#';
      this.flats['Eb']='D#';
      this.flats['Gb']='F#';
      this.flats['Ab']='G#';
   }
   GetQuestion(ans){
      if(document.getElementById("ansBtn").innerText=="Submit"){
         this.CheckAnswer(ans);
         document.getElementById("ansBtn").innerText="Next Question";
      }else{
         answerBox.value="";
         let string=Math.floor((Math.random())*6)+1;
         let fret=Math.floor(Math.random()*13);
         display.DisplayQuestion(string,fret);
         document.getElementById("ansBtn").innerText="Submit";
      }
   }
   CheckAnswer(ans){
      if(ans==null||ans=="")ans=answerBox.value;
      if(sharpbool){
         if(ans.toUpperCase()==this.dict[currentQ])response.innerText="CORRECT";
         else response.innerText="INCORRECT, the correct answer was "+this.dict[currentQ];
      }else{
         if(ans.toLowerCase()==this.SharpToFlat(this.dict[currentQ]).toLowerCase())response.innerText="CORRECT";
         else response.innerText="INCORRECT, the correct answer was "+this.SharpToFlat(this.dict[currentQ]);
      }
   }
   SharpToFlat(sharp){
      if(sharp.length>1)return this.flats[sharp];
      return sharp;
   }
}

class Display{
   constructor(pPos,pNeckHeight,pNeckWidth){
      this.mPos=pPos;
      this.mNeckHeight=pNeckHeight;
      this.mNeckWidth=pNeckWidth;
      this.mEdgeVal=(pNeckHeight/7)/2;
      this.mStringGap=(pNeckHeight-(this.mEdgeVal*2))/5;
      this.mFretGap=(pNeckWidth/12);
      this.fretDict={};
      this.FillDict();
   }
   FillDict(){
      for(let j=1;j<7;j++){
         for(let i=0;i<13;i++){
            let fretname=j.toString()+i.toString();
            let yCoord=this.mEdgeVal+(this.mStringGap*(j-1));
            let xCoord=(i==0)?this.mFretGap*i:(this.mFretGap*i)-(this.mFretGap/2);
            this.fretDict[fretname]=new Vector(xCoord,yCoord);
         }
      }
   }
   DisplayQuestion(string,fret){
      ctx.clearRect(-100,0,canvas.width, canvas.height);
      this.Draw();
      let locator=string.toString()+fret.toString();
      currentQ=locator;
      ctx.strokeStyle='#0000ff';
      ctx.beginPath();
      ctx.arc(this.fretDict[locator].x,this.fretDict[locator].y,4,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle='#000000';
   }
   Draw(){
      ctx.lineWidth=3;
      this.DrawOutline();
      this.DrawFrets();
      this.DrawStrings();
      this.DrawNeckMarkers();
   }
   DrawOutline(){
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(this.mNeckWidth,0);
      ctx.lineTo(this.mNeckWidth,this.mNeckHeight);
      ctx.lineTo(0,this.mNeckHeight);
      ctx.closePath();
      ctx.stroke();
   }
   DrawFrets(){
      ctx.strokeStyle='#00ff00';
      let xCoord,i;
      for(i=0;i<13;i++){
         ctx.beginPath();
         xCoord=this.mFretGap*i;
         ctx.moveTo(xCoord,0);
         ctx.lineTo(xCoord,this.mNeckHeight);
         ctx.closePath();
         ctx.stroke();
      }
      ctx.strokeStyle='#000000';
   }
   DrawStrings(){
      ctx.strokeStyle='#ff0000';
      let yCoord,i;
      for(i=0;i<6;i++){
         ctx.beginPath();
         yCoord=this.mEdgeVal+(this.mStringGap*i);
         ctx.moveTo(0,yCoord);
         ctx.lineTo(this.mNeckWidth,yCoord);
         ctx.closePath();
         ctx.stroke();
      }
      ctx.strokeStyle='#000000';
   }
   DrawNeckMarkers(){
      let coords=new Vector(0,this.mNeckHeight/2),i;
      for(i=2;i<=8;i+=2){
         coords.x=(i*this.mFretGap)+(this.mFretGap/2);
         this.DrawMarker(coords);
      }
      coords.x=(11*this.mFretGap)+(this.mFretGap/2);
      coords.y=this.mNeckHeight*(1/3);
      this.DrawMarker(coords);
      coords.y=this.mNeckHeight*(2/3);
      this.DrawMarker(coords);
   }
   DrawMarker(coords){
      ctx.beginPath();
      ctx.arc(coords.x,coords.y,4,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
   }
}
var Vector=(function(){
   function Vector(pX,pY){
      this.x=pX;
      this.y=pY;
   };
   return Vector;
})();