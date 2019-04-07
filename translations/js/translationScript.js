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
    console.log("ENTERED");
    var hiragana=document.getElementById(tabName+"lyrics");
    console.log(hiragana.id);
    console.log(hiragana);
    var childNodes=hiragana.children;
    console.log(hiragana.children[1].id);
    for(i=0;i<childNodes.length;i++){
      if(childNodes[i].className=="line"){
        console.log(childNodes[i].children[1].children[0].innerHTML);
      }
    }
  }