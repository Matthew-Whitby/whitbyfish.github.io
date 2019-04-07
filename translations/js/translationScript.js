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
    var hiragana=document.getElementById(tabName+"lyrics");
    var childNodes=hiragana.children;
    for(i=0;i<childNodes.length;i++){
      if(childNodes[i].className=="line"){
        childNodes[i].children[1].children[0].style.opacity="0";
        var button=document.createElement("BUTTON");
        button.innerHTML="Toggle Visibility";
        button.className="visible";
        button.addEventListener("click",ToggleVisibility,this);
        childNodes[i].children[1].appendChild(button);
      }
    }
  }

  function ToggleVisibility(btn){
    console.log(btn);
    console.log("Entered");
    var node=btn.currentTarget.parentElement.children[0];
    console.log(node);
    console.log(node.style.opacity);
    node.style.opacity=(node.style.opacity=="0")?"1":"0";
  }