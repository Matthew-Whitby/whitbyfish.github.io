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
         nav.style.top=newtop;
         break;
      case "middle":
         nav.style.display="block";
         nav.style.top="25%";
         break;
   }
}