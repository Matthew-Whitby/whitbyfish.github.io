function openTab(evt,tabName) {
  let i,tabcontent,tablinks;
  tabcontent=document.getElementsByClassName("tabcontent");
  for(i=0;i<tabcontent.length;i++)
    tabcontent[i].style.display="none";
  tablinks=document.getElementsByClassName("tabbtn");
  for(i=0;i<tablinks.length;i++)
    tablinks[i].className=tablinks[i].className.replace(" active","");
  if(tabName=="hiragana")HideRomaji(tabName);
  document.getElementById(tabName).style.display="block";
  evt.currentTarget.className+=" active";
}

function HideRomaji(tabName) {
  let hiragana=document.getElementById(tabName+"lyrics");
  let childNodes=hiragana.children;
  for(i=0;i<childNodes.length;i++){
    let node=FindNodeByClass(childNodes[i].children,"romaji",true);
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

function FindNodeByClass(childNodes, classId, getChild) {
  for (j = 0; j < childNodes.length; j++) {
    if (ContainsClass(childNodes[j],classId))
      if (getChild)return childNodes[j].children[0];
      else return childNodes[j];
    if (childNodes[j].children.length > 1)
      return FindNodeByClass(childNodes[j].children, classId, getChild);
  }
}

function ContainsClass(node,search){
  for(z=0;z<node.classList.length;z++)
    if(node.classList[z]==search)return true;
  return false;
}

function ToggleVisibility(btn) {
  let node = btn.currentTarget.parentElement.children[0];
  node.style.opacity = (node.style.opacity == "0") ? "1" : "0";
}

function ToggleAllVisibility() {
  let hiragana = document.getElementById("hiraganalyrics");
  let childNodes = hiragana.children;
  let opacityVal;
  for (i = 0; i < childNodes.length; i++) {
    let romajiNode = FindNodeByClass(childNodes[i].children, "romaji", true);
    if (!i) {
      romajiNode.style.opacity = (romajiNode.style.opacity == "0") ? "1" : "0";
      opacityVal = romajiNode.style.opacity;
    } else romajiNode.style.opacity = opacityVal;
  }
}

function SetClasses(){
  let lines=document.getElementsByClassName("line");
  for(i=0;i<lines.length;i++){
    for(j=0;j<lines[i].children.length-1;j++)
      lines[i].children[j].classList.add("underline");
    for(j=0;j<lines[i].children.length;j++)
      lines[i].children[j].classList.add("section");
  }
}

function ShowKanji(element,overwriteSticky,show){
  if(!IsStickied()||overwriteSticky){
    if(show)SetKanji(element);
    else UnsetKanji(element);
    let classname;
    let displayType=(show)?"block":"none";
    for (i = 0; i < element.classList.length; i++)
      if (element.classList[i].includes("-"))
        if (element.classList[i].split('-')[1] == "show")
          classname = element.classList[i].split("-")[0];
    document.getElementById(classname + "-display").style.display = displayType;
    document.getElementById("hide-button").style.display = displayType;
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
  let stucks = document.getElementsByClassName("stickied");
  if (stucks != null && stucks.length > 0)return true;
  return false;
}

function CloseKanji(){
  let stucks = document.getElementsByClassName("stickied");
  if (stucks != null && stucks.length > 0) {
    ShowKanji(stucks[0], true,false);
    stucks[0].classList.remove("stickied");
  }
}

function SetKanji(element){
  bold=element.getAttribute("setbold");
  let kanjiName;
  for (z = 0; z < element.classList.length; z++)
    if (element.classList[z].split('-')[1] == "show")
      kanjiName = element.classList[z].split('-')[0];
  let displaySections = document.getElementsByClassName("kanji-tab");
  for (z = 0; z < displaySections.length; z++) {
    let id = displaySections[z].id;
    if (id.split('-')[0] == kanjiName) {
      let bolds = displaySections[z].getElementsByClassName("bold");
      for (c = 0; c < bolds.length; c++) {
        if (bolds[c].getAttribute("bold") == bold) {
          let text = bolds[c].innerHTML;
          bolds[c].innerHTML = "<b>" + text + "</b>";
        }
      }
    }
  }
}

function UnsetKanji(element){
  let kanjiName;
  for(z=0;z<element.classList.length;z++)
    if(element.classList[z].includes('-'))
      if (element.classList[z].split('-')[1] == "show")
        kanjiName = element.classList[z].split('-')[0];
  let displaySections=document.getElementsByClassName("kanji-tab");
  for(z=0;z<displaySections.length;z++){
    let id=displaySections[z].id;
    if(id.split('-')[0]==kanjiName){
      let bolds=displaySections[z].getElementsByClassName("bold");
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
  for(i=0;i<linelist.length;i++)
    for(j=0;j<linelist[i].children.length;j++)
      if(linelist[i].children[j].classList[0]=="japanese-display"){
        let displayTypes=linelist[i].children[j].children;
        for(z=0;z<displayTypes.length;z++){
          if(displayTypes[z].classList[0]==value)displayTypes[z].style.display="block";
          else displayTypes[z].style.display="none";
        }
      }
}

function DisplayTextTable(id, value) {
  let linelist = document.getElementById(id).children;
  for (i = 0; i < linelist.length; i++)
    for (j = 0; j < linelist[i].children[0].children[0].children.length; j++)
      if (linelist[i].children[0].children[0].children[j].classList[0] == "japanese-display") {
        let displayTypes = linelist[i].children[0].children[0].children[j].children;
        for (z = 0; z < displayTypes.length; z++) {
          for(x=0;x<displayTypes[z].children.length;x++){
            if (displayTypes[z].children[x].classList[0] == value) displayTypes[z].children[x].style.display = "block";
            else displayTypes[z].children[x].style.display = "none";
          }
        }
      }
}