function openTab(evt,tabName){
    var i,tabcontent,tablinks;
  
    // Hide tabs
    tabcontent=document.getElementsByClassName("tabcontent");
    for(i=0;i<tabcontent.length;i++)
      tabcontent[i].style.display="none";
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks=document.getElementsByClassName("tabbtn");
    for(i=0;i<tablinks.length;i++)
      tablinks[i].className=tablinks[i].className.replace(" active", "");
  
    if(tabName=="hiragana")HideRomaji(tabName);
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display="block";
    evt.currentTarget.className+=" active";
  } 

  function HideRomaji(tabName){
    var hiragana=document.getElementById('hiragana');
    var childNodes=hiragana.childNodes[1].childNodes;
    for(i=0;i<childNodes.length;i++){
      if(childNodes[i].className=="line"){
        console.log(childNodes[i].lastChild.firstChild.textContent);
      }
    }
  }