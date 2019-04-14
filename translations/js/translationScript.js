function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  // Hide tabs
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++)
    tabcontent[i].style.display = "none";
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tabbtn");
  for (i = 0; i < tablinks.length; i++)
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  if (tabName == "hiragana") HideRomaji(tabName);
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function HideRomaji(tabName) {
  let hiragana = document.getElementById(tabName + "lyrics");
  let childNodes = hiragana.children;
  for (i = 0; i < childNodes.length; i++) {
    let node = FindNodeByClass(childNodes[i].children, "romaji", true);
    if (node.parentElement.children.length == 1) {
      node.style.opacity = "0";
      let button = document.createElement("BUTTON");
      button.innerHTML = "Toggle Visibility";
      button.className = "visible";
      button.addEventListener("click", ToggleVisibility, this);
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

function ShowKanji(element,overwriteSticky){
  SetKanji(element);
  let classes = element.classList;
  let hide = true;
  for (z = 0; z < classes.length; z++)
    if (classes[z] == "stickied") hide = false;
  if (hide)
    if (IsStickied()) hide = false;
  if(hide||overwriteSticky){
    let classname;
    for (i = 0; i < element.classList.length; i++)
      if (element.classList[i].includes("-"))
        if (element.classList[i].split('-')[1] == "show")
          classname = element.classList[i].split("-")[0];
    document.getElementById(classname + "-display").style.display = "block";
    document.getElementById("hide-button").style.display="block";
  }
}

function HideKanji(element,overwriteSticky){
  UnsetKanji(element);
  let hide = true;
  if(!overwriteSticky){
    let classes = element.classList;
    for (z = 0; z < classes.length; z++)
      if (classes[z] == "stickied") hide = false;
  }
  if(hide){
    let classname;
    for (i = 0; i < element.classList.length; i++) {
      if (element.classList[i].includes("-")) {
        if (element.classList[i].split('-')[1] == "show")
          classname = element.classList[i].split("-")[0];
      }
    }
    document.getElementById(classname + "-display").style.display = "none";
    document.getElementById("hide-button").style.display = "none";
  }
}

function StickKanji(element){
  let stucks=document.getElementsByClassName("stickied");
  if(stucks!=null&&stucks.length>0){
    HideKanji(stucks[0], true);
    if (stucks[0] != element) stucks[0].classList.remove("stickied");
  }
  ShowKanji(element,true);
  SetKanji(element);
  let classes=element.classList;
  let alreadyStuck=false;
  for(x=0;x<classes.length;x++)
    if (classes[x] == "stickied") {
      alreadyStuck = true;
      element.classList.remove("stickied");
      HideKanji(element, true);
    }
  if(!alreadyStuck)element.classList.add("stickied");
}

function IsStickied(){
  let stucks = document.getElementsByClassName("stickied");
  if (stucks != null && stucks.length > 0)return true;
  return false;
}

function CloseKanji(){
  let stucks = document.getElementsByClassName("stickied");
  if (stucks != null && stucks.length > 0) {
    HideKanji(stucks[0], true);
    stucks[0].classList.remove("stickied");
  }
}

function IncludeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByClassName("kanji-tab");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          elmnt.removeAttribute("include-html");
          IncludeHTML();
        }
      }
      xhttp.open("GET", file, false);
      xhttp.send();
      return;
    }
  }
}

function SetKanji(element){
  console.log("CALLED");
  bold=element.getAttribute("setbold");
  console.log(bold);
  let kanjiName;
  for (z = 0; z < element.classList.length; z++) {
    if (element.classList[z].split('-')[1] == "show") {
      kanjiName = element.classList[z].split('-')[0];
    }
  }
  console.log(kanjiName);
  let displaySections = document.getElementsByClassName("kanji-tab");
  for (z = 0; z < displaySections.length; z++) {
    let kanjiClasses = displaySections[z].classList;
    for (m = 0; m < kanjiClasses.length; m++) {
      if (kanjiClasses[m].split('-')[0] == kanjiName) {
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
  /*
  let bolds=document.getElementsByClassName("kanji-info");
  for(i=0;i<bolds.length;i++){
    let bold=bolds[i].getAttribute("setbold");
    let kanjibolds=bolds[i].getElementsByClassName("bold");
    for(j=0;j<kanjibolds.length;j++){
      if(kanjibolds[j].getAttribute("bold")==bold){
        let text=kanjibolds[j].innerHTML;
        kanjibolds[j].innerHTML="<b>"+text+"</b>";
      }
    }
  }*/
}

function UnsetKanji(element){
  let kanjiName;
  for(z=0;z<element.classList.length;z++){
    if(element.classList[z].split('-')[1]=="show"){
      kanjiName=element.classList[z].split('-')[0];
    }
  }
  let displaySections=document.getElementsByClassName("kanji-tab");
  for(z=0;z<displaySections.length;z++){
    let kanjiClasses=displaySections[z].classList;
    for(m=0;m<kanjiClasses.length;m++){
      if(kanjiClasses[m].split('-')[0]==kanjiName){
        let bolds=displaySections[z].getElementsByClassName("bold");
        for(c=0;c<bolds.length;c++){
          if(bolds[c].innerHTML.includes("<b>")){
            bolds[c].innerHTML.replace("<b>","");
            bolds[c].innerHTML.replace("</b>","");
          }
        }
      }
    }
  }
}

function DisplayText(id,value){
  let linelist=document.getElementById(id).children;
  for(i=0;i<linelist.length;i++){
    for(j=0;j<linelist[i].children.length;j++){
      if(linelist[i].children[j].classList[0]=="japanese-display"){
        let displayTypes=linelist[i].children[j].children;
        for(z=0;z<displayTypes.length;z++){
          if(displayTypes[z].classList[0]==value)displayTypes[z].style.display="block";
          else displayTypes[z].style.display="none";
        }
      }
    }
  }
}

function DisplayTextTable(id, value) {
  let linelist = document.getElementById(id).children;
  for (i = 0; i < linelist.length; i++) {
    for (j = 0; j < linelist[i].children[0].children[0].children.length; j++) {
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
  }
}