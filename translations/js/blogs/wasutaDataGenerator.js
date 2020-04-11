var fs=require('fs');
let contents=fs.readFileSync('W:\\whitby\\Documents\\GitHub\\whitbyfish.github.io\\translations\\wasutaextra\\blogs\\index.html','utf8');
let lines=contents.split('\r\n');
let out=[],i,output="";
let GenerateDone=/<td class="([a-z]*)"><a class="[a-z]*" href="([\s\S]*)">([\s\S]*)\(([\d]*\/[\d]*\/[\d]* [\d]*:[\d]*)\)<\/a><\/td>/g;
let GenerateUndone=/<td class="([a-z]*)"><a class="[a-z]*">([\s\S]*)\(([\d]*\/[\d]*\/[\d]* [\d]*:[\d]*)\)<\/a><\/td>/g;
for(i=0;i<lines.length;i++){
   let tempDone=lines[i].match(GenerateDone);
   let tempNDone=lines[i].match(GenerateUndone);
   if(tempDone!=null)
      out.push(tempDone[0].replace(GenerateDone,"{a:\"$1\",t:\"$3\",d:\"$4\",l:\"$2\"},"));
   else if(tempNDone!=null)
      out.push(tempNDone[0].replace(GenerateUndone,"{a:\"$1\",t:\"$2\",d:\"$3\",l:\"\"},"))
}
for(i=0;i<out.length;i++)output+=out[i]+"\n";
fs.writeFile('W:\\whitby\\Documents\\GitHub\\whitbyfish.github.io\\translations\\js\\blogs\\out.txt',output,function(err){
   if(err)return console.log(err);
   console.log('SAVED');
 });