import{_ as i,r as n,o as e,b as c,w as l,a as _,t as d,c as u,d as m,F as v,h as x,T as k,j as y}from"./index.57e84583.js";const C={name:"small-projects-card",props:["route"],data(){return{}},methods:{toTop(){window.scrollTo(0,0)}},created(){}};function w(a,p,t,h,f,r){const s=n("router-link");return e(),c(s,{id:"small-projects-card",to:{name:t.route.name},onClick:r.toTop},{default:l(()=>[_("h1",null,d(t.route.name),1),_("h3",null,d(t.route.description),1)]),_:1},8,["to","onClick"])}const T=i(C,[["render",w],["__scopeId","data-v-bece0553"]]);const $={name:"small-projects",data(){return{}},created(){},mounted(){},methods:{},computed:{routes(){return this.$route.matched[0].children.filter(a=>a.path!="")}},components:{SmallProjectsCard:T}},S={id:"small-projects"},g={class:"content pT-xxl",id:"small-projects-list"};function B(a,p,t,h,f,r){const s=n("router-view"),j=n("small-projects-card");return e(),u("div",S,[m(s,null,{default:l(({Component:o})=>[m(k,{name:"fade",mode:"out-in"},{default:l(()=>[(e(),c(y(o),{class:"content"}))]),_:2},1024)]),_:1}),_("div",g,[(e(!0),u(v,null,x(r.routes,o=>(e(),c(j,{key:o.path,route:o,class:"card"},null,8,["route"]))),128))])])}const b=i($,[["render",B]]);export{b as default};
