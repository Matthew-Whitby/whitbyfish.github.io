var canvas,ctx,display,quiz,currentQ,answerBox,response,sharpbool,stringNum;
function Setup(){
   canvas=document.getElementById("gtneck");
   if(!canvas){alert('Error: Canvas not found');return;}
   if(!canvas.getContext){alert('Error: no canvas.getContext');return;}
   ctx=canvas.getContext("2d");
   if(!ctx){alert('Error: failed to get context');return;}
   let neckHeight=100,neckWidth=800;
   ctx.translate(10,0);
   answerBox=document.getElementById("AnswerBox");
   response=document.getElementById("response");
   sharpbool=1;
   stringNum=0;
   display=new Display(new Vector(50,0),neckHeight,neckWidth);
   quiz=new Quiz();
   display.Draw();
   SwitchSharps(document.getElementById("sharpSelector").value);
   SelectString(document.getElementById("stringSelector").value);
}
function SwitchSharps(val){
   let aSBtn=document.getElementById("ASharpBtn");
   let cSBtn=document.getElementById("CSharpBtn");
   let dSBtn=document.getElementById("DSharpBtn");
   let fSBtn=document.getElementById("FSharpBtn");
   let gSBtn=document.getElementById("GSharpBtn");
   aSBtn.innerText=aSBtn.innerText=="A#"?"Bb":"A#";
   cSBtn.innerText=cSBtn.innerText=="C#"?"Db":"C#";
   dSBtn.innerText=dSBtn.innerText=="D#"?"Eb":"D#";
   fSBtn.innerText=fSBtn.innerText=="F#"?"Gb":"F#";
   gSBtn.innerText=gSBtn.innerText=="G#"?"Ab":"G#";
   sharpbool=val=="sharp"?1:0;
}
function SelectString(val){
   stringNum=parseInt(val);
   GetQuestion(null,true);
}
function AnswerClicked(val){quiz.GetQuestion(val);}
class Quiz{
   constructor(){
      this.dict={};
      this.flats={};
      this.FillDict();
   }
   FillDict(){
      let notes=['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
      let startindex=[7,2,10,5,0,7];
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
   GetQuestion(ans,skip){
      skip=skip===undefined?false:skip;
      if(document.getElementById("ansBtn").innerText=="Submit"&&!skip){
         this.CheckAnswer(ans);
         document.getElementById("ansBtn").innerText="Next Question";
      }else{
         answerBox.value="";
         let string=stringNum>0?stringNum:Math.floor((Math.random())*6)+1;
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
   SharpToFlat(sharp){return sharp.length>1?this.flats[sharp]:sharp;}
}

class Display{
   constructor(pPos,pNeckHeight,pNeckWidth){
      this.pos=pPos;
      this.neckHeight=pNeckHeight;
      this.neckWidth=pNeckWidth;
      this.edgeVal=(pNeckHeight/7)/2;
      this.stringGap=(pNeckHeight-(this.edgeVal*2))/5;
      this.fretGap=(pNeckWidth/12);
      this.fretDict={};
      this.FillDict();
   }
   FillDict(){
      for(let j=1;j<7;j++){
         for(let i=0;i<13;i++){
            let fretname=j.toString()+i.toString();
            let yCoord=this.edgeVal+(this.stringGap*(j-1));
            let xCoord=(i==0)?this.fretGap*i:(this.fretGap*i)-(this.fretGap/2);
            this.fretDict[fretname]=new Vector(xCoord,yCoord);
         }
      }
   }
   DisplayQuestion(string,fret){
      ctx.clearRect(-50,0,canvas.width+50,canvas.height);
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
      ctx.lineTo(this.neckWidth,0);
      ctx.lineTo(this.neckWidth,this.neckHeight);
      ctx.lineTo(0,this.neckHeight);
      ctx.closePath();
      ctx.stroke();
   }
   DrawFrets(){
      ctx.strokeStyle='#00ff00';
      let xCoord,i;
      for(i=0;i<13;i++){
         ctx.beginPath();
         xCoord=this.fretGap*i;
         ctx.moveTo(xCoord,0);
         ctx.lineTo(xCoord,this.neckHeight);
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
         yCoord=this.edgeVal+(this.stringGap*i);
         ctx.moveTo(0,yCoord);
         ctx.lineTo(this.neckWidth,yCoord);
         ctx.closePath();
         ctx.stroke();
      }
      ctx.strokeStyle='#000000';
   }
   DrawNeckMarkers(){
      let coords=new Vector(0,this.neckHeight/2),i;
      for(i=2;i<=8;i+=2){
         coords.x=(i*this.fretGap)+(this.fretGap/2);
         this.DrawMarker(coords);
      }
      coords.x=(11*this.fretGap)+(this.fretGap/2);
      coords.y=this.neckHeight*(1/3);
      this.DrawMarker(coords);
      coords.y=this.neckHeight*(2/3);
      this.DrawMarker(coords);
   }
   DrawMarker(coords){
      ctx.beginPath();
      ctx.arc(coords.x,coords.y,4,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
   }
}
class Vector{
   constructor(pX,pY){
      this.x=pX;
      this.y=pY;
   }
}