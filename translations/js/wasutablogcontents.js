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
   let posts=[...GetCL("hazuki"),...GetCL("nanase"),...GetCL("miri"),...GetCL("ririka"),...GetCL("ruka")];
   let i;
   for(i=0;i<posts.length;i++){
      let classes=posts[i].classList;
      let j,memberClass;
      for(j=0;j<classes.length;j++){
         let z;
         for(z=0;z<memberList.length;z++){
            if(classes[j]==memberList[z])memberClass=classes[j];
         }
      }
      if(val=="all")posts[i].style.display="table-row";
      else if(memberClass==val)posts[i].style.display="table-row";
      else posts[i].style.display="none";
   }
}
function GetCL(n){
   return document.getElementsByClassName(n);
}