var canvas,ctx,display,quiz,currentQ,answerBox,response,sharpbool=1,stringNum=0,ansBtn;
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
   ansBtn=document.getElementById("ansBtn");
   display=new Display(new Vector(50,0),neckHeight,neckWidth);
   quiz=new Quiz();
   SwitchSharps(document.getElementById("sharpSelector").value);
   stringNum=parseInt(document.getElementById("stringSelector").value);
   quiz.GetQuestion();
}
function SwitchSharps(val){
   let aSBtn=document.getElementById("ASharpBtn");
   let cSBtn=document.getElementById("CSharpBtn");
   let dSBtn=document.getElementById("DSharpBtn");
   let fSBtn=document.getElementById("FSharpBtn");
   let gSBtn=document.getElementById("GSharpBtn");
   if(val=="sharp"){
      aSBtn.innerText="A#";
      cSBtn.innerText="C#";
      dSBtn.innerText="D#";
      fSBtn.innerText="F#";
      gSBtn.innerText="G#";
   }else{
      aSBtn.innerText="Bb";
      cSBtn.innerText="Db";
      dSBtn.innerText="Eb";
      fSBtn.innerText="Gb";
      gSBtn.innerText="Ab";
   }
   sharpbool=val=="sharp"?1:0;
}
function SelectString(val){
   stringNum=val;
   quiz.GetQuestion();
}
function AnswerClicked(val){quiz.CheckAnswer(val);}
class Quiz{
   constructor(){
      this.dict={};
      this.flats={};
      this.FillDict();
   }
   FillDict(){
      let notes=['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
      let startindex=[7,2,10,5,0,7];
      for(let i=1;i<7;i++){
         let cur=startindex[i-1];
         for(let j=0;j<13;j++){
            let fretname=i.toString()+j.toString();
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
   CheckAnswer(ans){
      if(ans==null||ans=="")ans=answerBox.value;
      if(ansBtn.innerText=="Next Question"){
         ansBtn.innerText="Submit";
         response.innerText="";
         this.GetQuestion();
         return;
      }
      if(sharpbool){
         if(ans.toUpperCase()==this.dict[currentQ]){
            response.innerText="CORRECT";
            this.GetQuestion();
         }
         else{
            response.innerText="INCORRECT, the correct answer was "+this.dict[currentQ];
            ansBtn.innerText="Next Question";
         }
      }else{
         if(ans.toLowerCase()==this.SharpToFlat(this.dict[currentQ]).toLowerCase()){
            response.innerText="CORRECT";
            this.GetQuestion();
         }
         else{
            response.innerText="INCORRECT, the correct answer was "+this.SharpToFlat(this.dict[currentQ]);
            ansBtn.innerText="Next Question";
         }
      }
   }
   GetQuestion(){
      answerBox.value="";
      let string=stringNum>0?stringNum:Math.floor((Math.random())*6)+1;
      let fret=Math.floor(Math.random()*13);
      display.DisplayQuestion(string,fret);
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
      for(let i=1;i<7;i++){
         for(let j=0;j<13;j++){
            let fretname=i.toString()+j.toString();
            let yCoord=this.edgeVal+(this.stringGap*(i-1));
            let xCoord=(j==0)?this.fretGap*j:(this.fretGap*j)-(this.fretGap/2);
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