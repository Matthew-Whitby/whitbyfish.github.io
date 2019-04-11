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
  console.log("Close called");
  let stucks = document.getElementsByClassName("stickied");
  console.log(stucks);
  if (stucks != null && stucks.length > 0) {
    stucks[0].classList.remove("stickied");
    console.log(stucks[0]);
    HideKanji(stucks[0], true);
  }
}