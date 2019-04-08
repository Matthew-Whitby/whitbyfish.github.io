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
  console.log(childNodes.length);
  for (i = 0; i < childNodes.length; i++) {
    console.log(childNodes[i].className);
    let node = FindNodeByClass(childNodes[i].children, "romaji",true);
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

function FindNodeByClass(childNodes, classId,getChild) {
  for (i = 0; i < childNodes.length; i++) {
    if (childNodes[i].className == classId)
      if(getChild) return childNodes[i].children[0];
      else return childNodes[i];
    if (childNodes[i].children.length > 0) return FindNodeByClass(childNodes[i].children, classId,getChild);
  }
}

function ToggleVisibility(btn) {
  let node = btn.currentTarget.parentElement.children[0];
  node.style.opacity = (node.style.opacity == "0") ? "1" : "0";
}

function ToggleAllVisibility() {
  let hiragana = document.getElementById("hiraganalyrics");
  let childNodes = hiragana.children;
  let opacityVal;
  for (i = 0; i < childNodes.length; i++)
  {
    let romajiNode = FindNodeByClass(childNodes[i].children, "romaji",true);
      if (!i) {
        romajiNode.style.opacity = (romajiNode.style.opacity == "0") ? "1" : "0";
        opacityVal = romajiNode.style.opacity;
      } else romajiNode.style.opacity = opacityVal;
  }
}