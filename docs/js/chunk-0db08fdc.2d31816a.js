(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0db08fdc"],{"06ff":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=function(e){return Object(o["pushScopeId"])("data-v-a7ed4d4e"),e=e(),Object(o["popScopeId"])(),e},c={id:"about"},a={id:"animation"},i={id:"sky"},d=r((function(){return Object(o["createElementVNode"])("div",{id:"star-effect"},null,-1)})),s=r((function(){return Object(o["createElementVNode"])("div",{id:"sky-color"},null,-1)})),l=r((function(){return Object(o["createElementVNode"])("div",{id:"moon"},[Object(o["createElementVNode"])("div",{id:"crater"})],-1)})),u=r((function(){return Object(o["createElementVNode"])("h1",null,"About me",-1)})),m=r((function(){return Object(o["createElementVNode"])("h2",null,"Just a dreamer :) ... wow this is hideous ",-1)}));function h(e,t,n,r,h,b){var f=Object(o["resolveComponent"])("font-awesome-icon");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createElementVNode"])("div",a,[Object(o["createElementVNode"])("div",i,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(h.stars,(function(e,t){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{style:Object(o["normalizeStyle"])(e),key:t},null,4)})),128)),d]),s,l]),u,m,Object(o["createVNode"])(f,{icon:"xmark",size:"3x",onClick:t[0]||(t[0]=function(t){return e.$emit("close")}),id:"photoModalClose",class:"p-l",spin:""})])}var b={name:"about",data:function(){return{stars:[],location:"newyork",layerOne:[]}},created:function(){this.$store.commit("theme/setTheme",this.$store.getters["theme/themes"].BLACK),this.setStars(),this.layerOne.push(Math.random()),this.building=setInterval(function(){this.layerOne.push(Math.random())}.bind(this),1e4)},methods:{setStars:function(){for(var e=300*Math.random()+200,t=0;t<e;t++){var n=Math.max(Math.floor(2*(Math.random()+Math.random())),1);this.stars.push({position:"absolute",width:n+"px",height:n+"px",left:100*Math.random()+"%",top:100*Math.random()+"%",background:"white","z-index":"2","border-radius":"50%"})}}},components:{}},f=(n("36be"),n("d959")),p=n.n(f);const O=p()(b,[["render",h],["__scopeId","data-v-a7ed4d4e"]]);t["default"]=O},"36be":function(e,t,n){"use strict";n("66e2")},"66e2":function(e,t,n){}}]);
//# sourceMappingURL=chunk-0db08fdc.2d31816a.js.map