function openTab(evt,tabName){
  let m,tabcontent,tablinks;
  tabcontent=document.getElementsByClassName("tabcontent");
  for(m=0;m<tabcontent.length;m++)
    tabcontent[m].style.display="none";
  tablinks=document.getElementsByClassName("tabbtn");
  for(m=0;m<tablinks.length;m++)
    tablinks[m].className=tablinks[m].className.replace(" active","");
  if(tabName=="hiragana")HideRomaji(tabName);
  document.getElementById(tabName).style.display="block";
  evt.currentTarget.className+=" active";
}

function HideRomaji(tabName){
  let hiragana=document.getElementById(tabName+"lyrics");
  let childNodes=hiragana.children;
  for(c=0;c<childNodes.length;c++){
    let node=FindNodeByClass(childNodes[c].children,"romaji",true);
    if(node.parentElement.children.length==1){
      node.style.opacity="0";
      let button=document.createElement("BUTTON");
      button.innerHTML="Toggle Visibility";
      button.className="visible";
      button.addEventListener("click",ToggleVisibility,this);
      node.parentElement.appendChild(button);
    }
  }
}

function FindNodeByClass(childNodes,classId,getChild){
  for(z=0;z<childNodes.length;z++){
    if(ContainsClass(childNodes[z],classId)){
      if(getChild)return childNodes[z].children[0];
      return childNodes[z];}
    if(childNodes[z].children.length>1)
      return FindNodeByClass(childNodes[z].children,classId,getChild);
  }
}

function ContainsClass(node,search){
  for(i=0;i<node.classList.length;i++)
    if(node.classList[i]==search)return true;
  return false;
}

function ToggleVisibility(btn) {
  let node=btn.currentTarget.parentElement.children[0];
  node.style.opacity=(node.style.opacity=="0")?"1":"0";
}

function ToggleAllVisibility() {
  let hiragana=document.getElementById("hiraganalyrics");
  let childNodes=hiragana.children;
  let opacityVal;
  for(m=0;m<childNodes.length;m++){
    let romajiNode=FindNodeByClass(childNodes[m].children,"romaji",true);
    if(!m){
      romajiNode.style.opacity=(romajiNode.style.opacity=="0")?"1":"0";
      opacityVal=romajiNode.style.opacity;
    }else romajiNode.style.opacity=opacityVal;
  }
}

function SetClasses(){
  let lines=document.getElementsByClassName("line");
  for(m=0;m<lines.length;m++){
    for(c=0;c<lines[m].children.length-1;c++)
      lines[m].children[c].classList.add("underline");
    for(c=0;c<lines[m].children.length;c++)
      lines[m].children[c].classList.add("section");
  }
}

function ShowKanji(element,overwriteSticky,show){
  if(!IsStickied()||overwriteSticky){
    if(show)SetKanji(element);
    else UnsetKanji(element);
    let classname;
    let displayType=(show)?"block":"none";
    for(m=0;m<element.classList.length;m++)
      if(element.classList[m].includes("-"))
        if(element.classList[m].split('-')[1]=="show")
          classname=element.classList[m].split("-")[0];
    document.getElementById(classname+"-display").style.display=displayType;
    document.getElementById("hide-button").style.display=displayType;
  }
}

function StickKanji(element){
  if(IsStickied()){
    console.log("IS STICKIED");
    let stuck=document.getElementsByClassName("stickied");
    console.log(stuck);
    ShowKanji(stuck[0],true,false);
    stuck[0].classList.remove("stickied");
  }
  console.log(element);
  ShowKanji(element,true,true);
  element.classList.add("stickied");
  console.log(element);
}

function IsStickied(){
  let stucks=document.getElementsByClassName("stickied");
  return(stucks!=null&&stucks.length>0);
}

function CloseKanji(){
  let stucks=document.getElementsByClassName("stickied");
  if(stucks!=null&&stucks.length>0){
    ShowKanji(stucks[0],true,false);
    stucks[0].classList.remove("stickied");
  }
}

function SetKanji(element){
  bold=element.getAttribute("setbold");
  let kanjiName;
  for(m=0;m<element.classList.length;m++)
    if(element.classList[m].split('-')[1]=="show")
      kanjiName=element.classList[m].split('-')[0];
  let displaySections=document.getElementsByClassName("kanji-tab");
  for(m=0;m<displaySections.length;m++){
    let id=displaySections[m].id;
    if(id.split('-')[0]==kanjiName){
      let bolds=displaySections[m].getElementsByClassName("bold");
      for(c=0;c<bolds.length;c++){
        if(bolds[c].getAttribute("bold")==bold){
          let text=bolds[c].innerHTML;
          bolds[c].innerHTML="<b>"+text+"</b>";
        }
      }
    }
  }
}

function UnsetKanji(element){
  let kanjiName;
  for(m=0;m<element.classList.length;m++)
    if(element.classList[m].includes('-'))
      if(element.classList[m].split('-')[1]=="show")
        kanjiName=element.classList[m].split('-')[0];
  let displaySections=document.getElementsByClassName("kanji-tab");
  for(m=0;m<displaySections.length;m++){
    let id=displaySections[m].id;
    if(id.split('-')[0]==kanjiName){
      let bolds=displaySections[m].getElementsByClassName("bold");
      for(c=0;c<bolds.length;c++){
        if(bolds[c].innerHTML.includes("<b>")){
          let text=bolds[c].innerHTML;
          text=text.substring(3,text.length-4);
          bolds[c].innerHTML=text;
        }
      }
    }
  }
}

function DisplayText(id,value){
  let linelist=document.getElementById(id).children;
  for(m=0;m<linelist.length;m++)
    for(c=0;c<linelist[m].children.length;c++)
      if(linelist[m].children[c].classList[0]=="japanese-display"){
        let displayTypes=linelist[m].children[c].children;
        for(z=0;z<displayTypes.length;z++){
          if(displayTypes[z].classList[0]==value)displayTypes[z].style.display="block";
          else displayTypes[z].style.display="none";
        }
      }
}

function DisplayTextTable(id,value){
  let linelist=document.getElementById(id).children;
  for(m=0;m<linelist.length;m++)
    for(c=0;c<linelist[m].children[0].children[0].children.length;c++)
      if(linelist[m].children[0].children[0].children[c].classList[0]=="japanese-display"){
        let displayTypes=linelist[m].children[0].children[0].children[c].children;
        for(z=0;z<displayTypes.length;z++){
          for(x=0;x<displayTypes[z].children.length;x++){
            if(displayTypes[z].children[x].classList[0]==value)displayTypes[z].children[x].style.display="block";
            else displayTypes[z].children[x].style.display="none";
          }
        }
      }
}

function SetTabBtnWidth(){
  let btns=document.getElementsByClassName("tabbtn");
  btns.style.width=('$',100/btns.length);
}

function ScrollToTop(){window.scroll({top:0,left:0,behavior:'smooth'});}