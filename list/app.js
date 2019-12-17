const app=new Vue({
   el:'#app',
   data:{
      newItem:'',
      title:'My List',
      items:[{
         id:0,
         name:'Bicycle',
         price:200,
         received:false,
      },{
         id:1,
         name:'plane',
         price:15,
         received:false,
      },{
         id:2,
         name:'car',
         price:2000,
         received:false,
      }]
   },
   methods:{
      addItem(){
         if(this.newItem){
            this.items.unshift({
               id:Date.now(),
               name:this.newItem,
               received:false,
            });
         }
      },
      removeItem(id){
         const removeIndex=this.items.findIndex(item=>item.id===id);
         this.items.splice(removeIndex,1);
      },
      toggleReceived(id){
         const item=this.items.find(item=>item.id===id);
         item.received=!item.received;
      }
   }
});