function MoveTopBtn(val){
   let nav=document.getElementById("sideNav");
   switch(val){
      case "off":
         nav.style.display="none";
         break;
      case "top":
         nav.style.display="block";
         nav.style.top="5%";
         break;
      case "bottom":
         nav.style.display="block";
         let newtop=window.height-nav.style.height;
         nav.style.top=newtop+"px";
         break;
      case "middle":
         nav.style.display="block";
         nav.style.top="25%";
         break;
   }
}
function ToggleSideNav(){
   let sideNav=document.getElementById("sideNav");
   let childNodes=sideNav.children;
   for(var i=0;i<childNodes.length;i++){
      if(childNodes[i].id!="sideNavToggle"){
         childNodes[i].style.display=(childNodes[i].style.display=="none")?"block":"none";
      }
   }
}