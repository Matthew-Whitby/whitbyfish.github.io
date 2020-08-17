const monthlist=["january","february","march","april","may","june","july","august","september","october","november","december"];
const memberList=["hazuki","nanase","miri","ririka","ruka"];
function ToggleSideNav(){
   let sideNav=document.getElementById("sideNav");
   let childNodes=sideNav.children,i;
   for(i=0;i<childNodes.length;i++){
      if(childNodes[i].id!="sideNavToggle"){
         childNodes[i].style.display=(childNodes[i].style.display=="none")?"block":"none";
      }
   }
}
function ResetSelections(){
   let progress=document.getElementById("selectProgress");
   let progressc=progress.children;
   let year=document.getElementById("selectYear");
   let yearc=year.children;
   let month=document.getElementById("selectMonth");
   let monthc=month.children;
   let member=document.getElementById("selectMember");
   let memberc=member.children;
   let progressAns=ResetSelection(progress,progressc);
   if(progressAns[0])ChangeDisplay(progressAns[1]);
   let yearAns=ResetSelection(year,yearc);
   if(yearAns[0])SelectYear(yearAns[1]);
   let monthAns=ResetSelection(month,monthc);
   if(monthAns[0])SelectMonth(monthAns[1]);
   let memAns=ResetSelection(member,memberc);
   if(memAns[0])SelectMember(memAns[1]);
}
function ResetSelection(l,c){
   if(c[l.selectedIndex].value!="all"){
      let i;
      for(i=0;i<c.length;i++)if(c[i].value=="all"){l.selectedIndex=i;return [true,c[i].value];}
   }return [false];
}
function SelectYear(val){
   let years=GetCL("year"),i;
   for(i=0;i<years.length;i++){
      if(val=="all")years[i].style.display="initial";
      else if(years[i].id==val)years[i].style.display="initial";
      else years[i].style.display="none";
   }
}
function SelectMonth(val){
   let months=GetCL("month"),i;
   for(i=0;i<months.length;i++){
      let classes=months[i].classList;
      let j,monthClass;
      for(j=0;j<classes.length;j++){
         if(IsMonth(classes[j]))monthClass=classes[j];
      }
      if(val=="all")months[i].style.display="initial";
      else if(monthClass==val)months[i].style.display="initial";
      else months[i].style.display="none";
   }
}
function SelectNotOnSite(){
   let done=GetCL("done");
   for(i=0;i<done.length;i++){
      done[i].style.display=done[i].classList.contains("notsite")?"initial":"none";
   }
}
function SelectMember(val){
   let hazukiPosts=GetCL("hazuki");
   let nanasePosts=GetCL("nanase");
   let miriPosts=GetCL("miri");
   let ririkaPosts=GetCL("ririka");
   let rukaPosts=GetCL("ruka");
   switch(val){
      case"all":
         ToggleDisplayMem([...hazukiPosts,...nanasePosts,...miriPosts,...ririkaPosts,...rukaPosts],true);
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
function ToggleDisplayMem(e,l){for(z=0;z<e.length;z++)l?e[z].parentElement.classList.contains("mHidden")&&e[z].parentElement.classList.remove("mHidden"):e[z].parentElement.classList.contains("mHidden")||e[z].parentElement.classList.add("mHidden"),CheckTableMem(e[z])}function CheckTableMem(e){var l=e.parentElement.parentElement.parentElement;DetectVisibleElementMem(l)?l.classList.contains("mHidden")&&l.classList.remove("mHidden"):l.classList.contains("mHidden")||l.classList.add("mHidden")}function DetectVisibleElementMem(e){switch(e.tagName){case"TR":return"TH"!=e.childNodes[0].tagName&&!e.classList.contains("mHidden");default:if(null!=e&&null!=e.childNodes&&e.childNodes.length>0){for(var l=0;l<e.childNodes.length;l++)if(DetectVisibleElementMem(e.childNodes[l]))return!0;return!1}}}
function getUrlParam(parameter,defaultvalue){
   var urlparameter=defaultvalue;
   if(window.location.href.indexOf(parameter)>-1){
       urlparameter=getUrlVars()[parameter];}
   return urlparameter;
}
function getUrlVars() {
   var vars={};
   window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value;});
   return vars;
}
function MonthToNum(month){switch(month){case"january":return 1;case"february":return 2;case"march":return 3;case"april":return 4;case"may":return 5;case"june":return 6;case"july":return 7;case"august":return 8;case"september":return 9;case"october":return 10;case"november":return 11;case"december":return 12}}
function NumToMonth(month){switch(month){case 13:case 1:return"january";case 2:return"february";case 3:return"march";case 4:return"april";case 5:return"may";case 6:return"june";case 7:return"july";case 8:return"august";case 9:return"september";case 10:return"october";case 11:return"november";case 12:return"december";}}
function IsMonth(n){n=n.toLowerCase();return(monthlist.includes(n))?true:false;}
function CheckParameters(){
   let selectedYear=getUrlParam('y','all');
    if(selectedYear==null)selectedYear="all";
    let yearSelector=document.getElementById("selectYear");
    let yearOptions=yearSelector.children,x;
    for(x=0;x<yearOptions.length;x++){
      if(yearOptions[x].value==selectedYear){
        yearSelector.selectedIndex=x;
        SelectYear(yearOptions[x].value);
      }
    }
    let selectedMonth=getUrlParam('m','all');
    if(selectedMonth==null)selectedMonth="all";
    let monthSelector=document.getElementById("selectMonth");
    let monthOptions=monthSelector.children;
    for(x=0;x<monthOptions.length;x++){
      numMonth=MonthToNum(monthOptions[x].value);
      if(monthOptions[x].value==selectedMonth||selectedMonth==numMonth){
        monthSelector.selectedIndex=x;
        SelectMonth(monthOptions[x].value);
      }
    }
    let selectedMember=getUrlParam('mem','all');
    if(selectedMember==null)selectedMember="all";
    let memberSelector=document.getElementById("selectMember");
    let memberOptions=memberSelector.children;
    for(x=0;x<memberOptions.length;x++){
      if(memberOptions[x].value==selectedMember){
        memberSelector.selectedIndex=x;
        SelectMember(memberOptions[x].value);
      }
    }
    let selectedProg=getUrlParam('p','all');
    if(selectedProg==null)selectedProg="all";
    let progressSelector=document.getElementById("selectProgress");
    let progressOptions=progressSelector.children;
    for(x=0;x<progressOptions.length;x++){
      if(progressOptions[x].value==selectedProg){
         progressSelector.selectedIndex=x;
        ChangeDisplay(progressOptions[x].value);
      }
    }
    let notOnSite=getUrlParam('new','all');
    if(notOnSite==null)notOnSite="all";
    if(notOnSite!="all")SelectNotOnSite();
}

function BlogCount(){
   document.getElementById("totalCount").innerText="Total: "+TotalBlogs();
   document.getElementById("hazukiCount").innerText="Hazuki: "+GetCL("hazuki").length;
   document.getElementById("nanaseCount").innerText="Nanase: "+GetCL("nanase").length;
   document.getElementById("miriCount").innerText="Miri: "+GetCL("miri").length;
   document.getElementById("ririkaCount").innerText="Ririka: "+GetCL("ririka").length;
   document.getElementById("rukaCount").innerText="Ruka: "+GetCL("ruka").length;
}
function CalculatePercentage(){document.getElementById("percentage").innerText=(GetCL("done").length/5244)*100+"% Complete";}
function TotalBlogs(){return[...GetCL("hazuki"),...GetCL("nanase"),...GetCL("miri"),...GetCL("ririka"),...GetCL("ruka")].length}
function ScrollToTop(){window.scroll({top:0,left:0,behavior:'smooth'});var v=document.getElementsByClassName("isCurrent");if(v.length>0)v[0].classList.remove("isCurrent");}
  function ScrollToYear(year,clicked){var e=document.getElementById(year);e.scrollIntoView({behavior:'smooth'});var v=document.getElementsByClassName("isCurrent");if(v.length>0)v[0].classList.remove("isCurrent");clicked.classList.add("isCurrent");}
  function ChangeDisplay(e){var l=document.getElementsByClassName("done"),n=document.getElementsByClassName("inprogress"),s=document.getElementsByClassName("notdone");switch(e){case"all":ToggleDisplay(l,!0),ToggleDisplay(n,!0),ToggleDisplay(s,!0);break;case"complete":ToggleDisplay(l,!0),ToggleDisplay(n,!1),ToggleDisplay(s,!1);break;case"inprogress":ToggleDisplay(l,!1),ToggleDisplay(n,!0),ToggleDisplay(s,!1);break;case"notdone":ToggleDisplay(l,!1),ToggleDisplay(n,!1),ToggleDisplay(s,!0)}}
  function ToggleDisplay(e,l){for(z=0;z<e.length;z++)l?e[z].parentElement.parentElement.classList.contains("hidden")&&e[z].parentElement.parentElement.classList.remove("hidden"):e[z].parentElement.parentElement.classList.contains("hidden")||e[z].parentElement.parentElement.classList.add("hidden"),CheckTable(e[z])}function CheckTable(e){var l=e.parentElement.parentElement.parentElement.parentElement;DetectVisibleElement(l)?l.classList.contains("hidden")&&l.classList.remove("hidden"):l.classList.contains("hidden")||l.classList.add("hidden")}function DetectVisibleElement(e){switch(e.tagName){case"TR":return"TH"!=e.childNodes[0].tagName&&!e.classList.contains("hidden");default:if(null!=e&&null!=e.childNodes&&e.childNodes.length>0){for(var l=0;l<e.childNodes.length;l++)if(DetectVisibleElement(e.childNodes[l]))return!0;return!1}}}