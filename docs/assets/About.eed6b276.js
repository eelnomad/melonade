import{_ as l,o as n,c as d,a as t,F as h,h as _,n as u,p,i as m}from"./index.0f649b50.js";const v={name:"about",setup(){},data(){return{stars:[],location:"newyork",layerOne:[]}},created(){this.setStars(),this.layerOne.push(Math.random()),this.building=setInterval(function(){this.layerOne.push(Math.random())}.bind(this),1e4)},methods:{setStars:function(){for(var e=Math.random()*300+200,s=0;s<e;s++){var a=Math.max(Math.floor((Math.random()+Math.random())*2),1);this.stars.push({position:"absolute",width:a+"px",height:a+"px",left:Math.random()*100+"%",top:Math.random()*100+"%",background:"white","z-index":"2","border-radius":"50%"})}}},components:{}},o=e=>(p("data-v-c3ce8db8"),e=e(),m(),e),b={id:"about",class:"f-col f-center"},f={id:"animation"},y={id:"sky"},M=o(()=>t("div",{id:"star-effect"},null,-1)),x=o(()=>t("div",{id:"sky-color"},null,-1)),g=o(()=>t("div",{id:"moon"},[t("div",{id:"crater"})],-1)),k=o(()=>t("div",{id:"about-content"},[t("h1",null,"About Me"),t("br"),t("h2",null,"Hello! I'm a developer on a mission to positively impact people's lives"),t("h2",null,"and spread some joy through coding.")],-1));function I(e,s,a,S,i,w){return n(),d("div",b,[t("div",f,[t("div",y,[(n(!0),d(h,null,_(i.stars,(r,c)=>(n(),d("div",{style:u(r),key:c},null,4))),128)),M]),x,g]),k])}const B=l(v,[["render",I],["__scopeId","data-v-c3ce8db8"]]);export{B as default};