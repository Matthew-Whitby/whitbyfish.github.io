const monthlist=["january","february","march","april","may","june","july","august","september","october","november","december"];
const memberList=["hazuki","nanase","miri","ririka","ruka"];
function ToggleSideNav(){
   let sideNav=document.getElementById("sideNav");
   let childNodes=sideNav.children;
   let i;
   for(i=0;i<childNodes.length;i++){
      if(childNodes[i].id!="sideNavToggle"){
         childNodes[i].style.display=(childNodes[i].style.display=="none")?"block":"none";
      }
   }
}
function SelectYear(val){
   let years=GetCL("year");
   let i;
   for(i=0;i<years.length;i++){
      if(val=="all")years[i].style.display="initial";
      else if(years[i].id==val)years[i].style.display="initial";
      else years[i].style.display="none";
   }
}
function SelectMonth(val){
   let months=GetCL("month");
   let i;
   for(i=0;i<months.length;i++){
      let classes=months[i].classList;
      let j,monthClass;
      for(j=0;j<classes.length;j++){
         let z;
         for(z=0;z<monthlist.length;z++)
            if(classes[j]==monthlist[z])monthClass=classes[j];
      }
      if(val=="all")months[i].style.display="initial";
      else if(monthClass==val)months[i].style.display="initial";
      else months[i].style.display="none";
   }
}
function SelectMember(val){
   let hazukiPosts=GetCL("hazuki");
   let nanasePosts=GetCL("nanase");
   let miriPosts=GetCL("miri");
   let ririkaPosts=GetCL("ririka");
   let rukaPosts=GetCL("ruka");
   let allPosts=[...hazukiPosts,...nanasePosts,...miriPosts,...ririkaPosts,...rukaPosts];
   switch(val){
      case "all":
         ToggleDisplayMem(allPosts,true);
         break;
      case"hazuki":
         ToggleDisplayMem(hazukiPosts,true);
         ToggleDisplayMem([...nanasePosts,...miriPosts,...ririkaPosts,...rukaPosts],false);
         break;
      case"nanase":
         ToggleDisplayMem(nanasePosts,true);
         ToggleDisplayMem([...hazukiPosts,...miriPosts,...ririkaPosts,...rukaPosts],false);
         break;
      case"miri":
         ToggleDisplayMem(miriPosts,true);
         ToggleDisplayMem([...hazukiPosts,...nanasePosts,...ririkaPosts,...rukaPosts],false);
         break;
      case"ririka":
      ToggleDisplayMem(ririkaPosts,true);
      ToggleDisplayMem([...hazukiPosts,...nanasePosts,...miriPosts,...rukaPosts],false);
         break;
      case"ruka":
      ToggleDisplayMem(rukaPosts,true);
      ToggleDisplayMem([...hazukiPosts,...nanasePosts,...miriPosts,...ririkaPosts],false);
         break;
   }
}
function GetCL(n){return document.getElementsByClassName(n);}
function ToggleDisplayMem(e,l){for(z=0;z<e.length;z++)l?e[z].classList.contains("hidden")&&e[z].classList.remove("hidden"):e[z].classList.contains("hidden")||e[z].classList.add("hidden"),CheckTableMem(e[z])}function CheckTableMem(e){var l=e.parentElement.parentElement;DetectVisibleElementMem(l)?l.classList.contains("hidden")&&l.classList.remove("hidden"):l.classList.contains("hidden")||l.classList.add("hidden")}function DetectVisibleElementMem(e){switch(e.tagName){case"TR":return"TH"!=e.childNodes[0].tagName&&!e.classList.contains("hidden");default:if(null!=e&&null!=e.childNodes&&e.childNodes.length>0){for(var l=0;l<e.childNodes.length;l++)if(DetectVisibleElementMem(e.childNodes[l]))return!0;return!1}}}
function getUrlParam(parameter,defaultvalue){
   var urlparameter=defaultvalue;
   if(window.location.href.indexOf(parameter)>-1){
       urlparameter=getUrlVars()[parameter];}
   return urlparameter;
}
function getUrlVars() {
   var vars={};
   var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value;});
   return vars;
}
function MatchMonth(month){
   switch(month){
      case "january":
         return 1;
      case "february":
         return 2;
      case "march":
         return 3;
      case "april":
         return 4;
      case "may":
         return 5;
      case "june":
         return 6;
      case "july":
         return 7;
      case "august":
         return 8
      case "september":
         return 9
      case "october":
         return 10;
      case "november":
         return 11;
      case "december":
         return 12;
   }
}