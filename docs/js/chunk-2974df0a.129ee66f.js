(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2974df0a"],{"0d3b":function(t,e,n){var r=n("d039"),a=n("b622"),o=n("c430"),i=a("iterator");t.exports=!r((function(){var t=new URL("b?a=1&b=2&c=3","http://a"),e=t.searchParams,n="";return t.pathname="c%20d",e.forEach((function(t,r){e["delete"]("b"),n+=r+t})),o&&!t.toJSON||!e.sort||"http://a/c%20d?a=1&c=3"!==t.href||"3"!==e.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!e[i]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host}))},"4de4":function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").filter,o=n("1dde"),i=o("filter");r({target:"Array",proto:!0,forced:!i},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},9861:function(t,e,n){"use strict";n("e260");var r=n("23e7"),a=n("da84"),o=n("d066"),i=n("c65b"),h=n("e330"),s=n("0d3b"),c=n("6eeb"),u=n("e2cc"),d=n("d44e"),l=n("9ed3"),g=n("69f3"),f=n("19aa"),m=n("1626"),p=n("1a2d"),v=n("0366"),w=n("f5df"),b=n("825a"),y=n("861d"),k=n("577e"),M=n("7c73"),T=n("5c6c"),R=n("9a1f"),S=n("35a1"),j=n("d6d6"),O=n("b622"),L=n("addb"),_=O("iterator"),x="URLSearchParams",E=x+"Iterator",U=g.set,I=g.getterFor(x),z=g.getterFor(E),B=o("fetch"),F=o("Request"),P=o("Headers"),C=F&&F.prototype,N=P&&P.prototype,A=a.RegExp,D=a.TypeError,G=a.decodeURIComponent,H=a.encodeURIComponent,V=h("".charAt),q=h([].join),J=h([].push),Q=h("".replace),$=h([].shift),W=h([].splice),Z=h("".split),K=h("".slice),X=/\+/g,Y=Array(4),tt=function(t){return Y[t-1]||(Y[t-1]=A("((?:%[\\da-f]{2}){"+t+"})","gi"))},et=function(t){try{return G(t)}catch(e){return t}},nt=function(t){var e=Q(t,X," "),n=4;try{return G(e)}catch(r){while(n)e=Q(e,tt(n--),et);return e}},rt=/[!'()~]|%20/g,at={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},ot=function(t){return at[t]},it=function(t){return Q(H(t),rt,ot)},ht=l((function(t,e){U(this,{type:E,iterator:R(I(t).entries),kind:e})}),"Iterator",(function(){var t=z(this),e=t.kind,n=t.iterator.next(),r=n.value;return n.done||(n.value="keys"===e?r.key:"values"===e?r.value:[r.key,r.value]),n}),!0),st=function(t){this.entries=[],this.url=null,void 0!==t&&(y(t)?this.parseObject(t):this.parseQuery("string"==typeof t?"?"===V(t,0)?K(t,1):t:k(t)))};st.prototype={type:x,bindURL:function(t){this.url=t,this.update()},parseObject:function(t){var e,n,r,a,o,h,s,c=S(t);if(c){e=R(t,c),n=e.next;while(!(r=i(n,e)).done){if(a=R(b(r.value)),o=a.next,(h=i(o,a)).done||(s=i(o,a)).done||!i(o,a).done)throw D("Expected sequence with length 2");J(this.entries,{key:k(h.value),value:k(s.value)})}}else for(var u in t)p(t,u)&&J(this.entries,{key:u,value:k(t[u])})},parseQuery:function(t){if(t){var e,n,r=Z(t,"&"),a=0;while(a<r.length)e=r[a++],e.length&&(n=Z(e,"="),J(this.entries,{key:nt($(n)),value:nt(q(n,"="))}))}},serialize:function(){var t,e=this.entries,n=[],r=0;while(r<e.length)t=e[r++],J(n,it(t.key)+"="+it(t.value));return q(n,"&")},update:function(){this.entries.length=0,this.parseQuery(this.url.query)},updateURL:function(){this.url&&this.url.update()}};var ct=function(){f(this,ut);var t=arguments.length>0?arguments[0]:void 0;U(this,new st(t))},ut=ct.prototype;if(u(ut,{append:function(t,e){j(arguments.length,2);var n=I(this);J(n.entries,{key:k(t),value:k(e)}),n.updateURL()},delete:function(t){j(arguments.length,1);var e=I(this),n=e.entries,r=k(t),a=0;while(a<n.length)n[a].key===r?W(n,a,1):a++;e.updateURL()},get:function(t){j(arguments.length,1);for(var e=I(this).entries,n=k(t),r=0;r<e.length;r++)if(e[r].key===n)return e[r].value;return null},getAll:function(t){j(arguments.length,1);for(var e=I(this).entries,n=k(t),r=[],a=0;a<e.length;a++)e[a].key===n&&J(r,e[a].value);return r},has:function(t){j(arguments.length,1);var e=I(this).entries,n=k(t),r=0;while(r<e.length)if(e[r++].key===n)return!0;return!1},set:function(t,e){j(arguments.length,1);for(var n,r=I(this),a=r.entries,o=!1,i=k(t),h=k(e),s=0;s<a.length;s++)n=a[s],n.key===i&&(o?W(a,s--,1):(o=!0,n.value=h));o||J(a,{key:i,value:h}),r.updateURL()},sort:function(){var t=I(this);L(t.entries,(function(t,e){return t.key>e.key?1:-1})),t.updateURL()},forEach:function(t){var e,n=I(this).entries,r=v(t,arguments.length>1?arguments[1]:void 0),a=0;while(a<n.length)e=n[a++],r(e.value,e.key,this)},keys:function(){return new ht(this,"keys")},values:function(){return new ht(this,"values")},entries:function(){return new ht(this,"entries")}},{enumerable:!0}),c(ut,_,ut.entries,{name:"entries"}),c(ut,"toString",(function(){return I(this).serialize()}),{enumerable:!0}),d(ct,x),r({global:!0,forced:!s},{URLSearchParams:ct}),!s&&m(P)){var dt=h(N.has),lt=h(N.set),gt=function(t){if(y(t)){var e,n=t.body;if(w(n)===x)return e=t.headers?new P(t.headers):new P,dt(e,"content-type")||lt(e,"content-type","application/x-www-form-urlencoded;charset=UTF-8"),M(t,{body:T(0,k(n)),headers:T(0,e)})}return t};if(m(B)&&r({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return B(t,arguments.length>1?gt(arguments[1]):{})}}),m(F)){var ft=function(t){return f(this,C),new F(t,arguments.length>1?gt(arguments[1]):{})};C.constructor=ft,ft.prototype=C,r({global:!0,forced:!0},{Request:ft})}}t.exports={URLSearchParams:ct,getState:I}},a21a:function(t,e,n){},a434:function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),o=n("23cb"),i=n("5926"),h=n("07fa"),s=n("7b0b"),c=n("65f0"),u=n("8418"),d=n("1dde"),l=d("splice"),g=a.TypeError,f=Math.max,m=Math.min,p=9007199254740991,v="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!l},{splice:function(t,e){var n,r,a,d,l,w,b=s(this),y=h(b),k=o(t,y),M=arguments.length;if(0===M?n=r=0:1===M?(n=0,r=y-k):(n=M-2,r=m(f(i(e),0),y-k)),y+n-r>p)throw g(v);for(a=c(b,r),d=0;d<r;d++)l=k+d,l in b&&u(a,d,b[l]);if(a.length=r,n<r){for(d=k;d<y-r;d++)l=d+r,w=d+n,l in b?b[w]=b[l]:delete b[w];for(d=y;d>y-r+n;d--)delete b[d-1]}else if(n>r)for(d=y-r;d>k;d--)l=d+r-1,w=d+n-1,l in b?b[w]=b[l]:delete b[w];for(d=0;d<n;d++)b[d+k]=arguments[d+2];return b.length=y-r+n,a}})},addb:function(t,e,n){var r=n("4dae"),a=Math.floor,o=function(t,e){var n=t.length,s=a(n/2);return n<8?i(t,e):h(t,o(r(t,0,s),e),o(r(t,s),e),e)},i=function(t,e){var n,r,a=t.length,o=1;while(o<a){r=o,n=t[o];while(r&&e(t[r-1],n)>0)t[r]=t[--r];r!==o++&&(t[r]=n)}return t},h=function(t,e,n,r){var a=e.length,o=n.length,i=0,h=0;while(i<a||h<o)t[i+h]=i<a&&h<o?r(e[i],n[h])<=0?e[i++]:n[h++]:i<a?e[i++]:n[h++];return t};t.exports=o},d6d6:function(t,e,n){var r=n("da84"),a=r.TypeError;t.exports=function(t,e){if(t<e)throw a("Not enough arguments");return t}},dd31:function(t,e,n){"use strict";n("a21a")},fcba:function(t,e,n){"use strict";n.r(e);n("d3b7"),n("25f0");var r=n("7a23"),a={id:"shower-thoughts"},o=Object(r["createTextVNode"])("Home"),i={class:"overlay"},h=["href"];function s(t,e,n,s,c,u){var d=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",a,[Object(r["createVNode"])(d,{id:"home-button",to:"/"},{default:Object(r["withCtx"])((function(){return[o]})),_:1}),Object(r["createElementVNode"])("div",i,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(c.grid,(function(t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("span",{class:Object(r["normalizeClass"])(["opacity-"+t.toString()]),key:t},null,2)})),128))]),Object(r["createVNode"])(r["TransitionGroup"],{name:"fade",style:{background:"transparent"}},{default:Object(r["withCtx"])((function(){return[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(u.activeRandomThoughts,(function(t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("a",{id:"thought-bubble",key:t.key,style:Object(r["normalizeStyle"])(t.style),href:t.url},[Object(r["createElementVNode"])("h1",{class:Object(r["normalizeClass"])({visible:t.active})},Object(r["toDisplayString"])(t.thought),3)],12,h)})),128))]})),_:1})])}n("4de4"),n("3ca3"),n("ddb0"),n("9861"),n("a434");var c={name:"shower-thoughts",data:function(){return{thoughts:[],oldThoughts:[],grid:[],randomThoughts:[],access_token:""}},created:function(){this.getToken(),this.getShowerThoughts(),this.getGrid(),this.startMagic()},mounted:function(){window.addEventListener("resize",this.getGrid),window.addEventListener("focus",this.startMagic),window.addEventListener("blur",this.stopMagic)},beforeDestroy:function(){window.removeEventListener("resize",this.getGrid),window.removeEventListener("focus",this.startMagic),window.removeEventListener("blur",this.stopMagic),this.stopMagic()},computed:{activeRandomThoughts:function(){return this.randomThoughts.filter((function(t){return!0===t.active}))}},methods:{startMagic:function(){this.fadeInterval=setInterval(function(){this.randomizeFade()}.bind(this),3e3),this.thoughtInterval=setInterval(function(){this.addRandomThought(),this.removeRandomThought()}.bind(this),1e3)},stopMagic:function(){clearInterval(this.fadeInterval),clearInterval(this.thoughtInterval)},getToken:function(){localStorage.getItem("reddit_refresh")<=Math.floor(Date.now()/1e3)&&this.newRedditToken(),this.access_token=localStorage.getItem("reddit_access_token")},newRedditToken:function(){var t=this,e=new URLSearchParams;e.append("grant_type","https://oauth.reddit.com/grants/installed_client"),e.append("device_id",localStorage.getItem("melonade_device_id")),this.$http.post("https://www.reddit.com/api/v1/access_token",e,{auth:{username:"TOF_jt6LhZBi1w",password:""}}).then((function(e){localStorage.setItem("reddit_access_token","Bearer "+e.data.access_token),localStorage.setItem("reddit_refresh",Math.floor(Date.now()/1e3)+3600),t.access_token=localStorage.getItem("reddit_access_token")})).catch((function(){localStorage.removeItem("reddit_access_token")}))},getShowerThoughts:function(){var t=this;this.$http.get("https://oauth.reddit.com/r/showerthoughts/rising?limit=100",{headers:{Authorization:this.access_token}}).then((function(e){for(var n in e["data"]["data"]["children"])t.thoughts.push({thought:e["data"]["data"]["children"][n]["data"]["title"],url:e["data"]["data"]["children"][n]["data"]["url"]})})).catch((function(){t.getToken(),t.getShowerThoughts()}))},addRandomThought:function(){if(Math.random()<.5-.1*this.randomThoughts.length)if(this.thoughts.length>0){var t=Math.floor(Math.random()*this.thoughts.length),e=this.thoughts[t],n=60*Math.random()+20,r=Math.ceil(Math.random()+Math.random()+Math.random()),a=Math.max(1,Math.min(7,n*Math.max(1.25,r)/e.thought.length/.65)),o=a*r*2.6,i=Math.floor(Math.random()*(100-n)),h=Math.floor(Math.random()*(100-o-10)),s=a*(.6*Math.random()+1.2);e.url||(e.url="https://www.reddit.com/r/Showerthoughts"),e.raw={width:n,height:o,left:i,top:h,fontSize:a,lineHeight:s},e.style=this.generateStyle(e.raw),e.timer=4*Math.random()+5,e.key=Math.random(),e.active=!1,this.randomThoughts.push(e),this.thoughts.splice(t,1)}else this.getShowerThoughts(),this.oldThoughts=[]},removeRandomThought:function(){for(var t=0;t<this.randomThoughts.length;t++)this.randomThoughts[t].active?this.randomThoughts[t].timer<0?(this.oldThoughts.push(this.randomThoughts[t]),this.randomThoughts.splice(t,1),t--):this.randomThoughts[t].timer--:this.activateThought(this.randomThoughts[t])},activateThought:function(t){for(var e=!0,n=t.raw.top,r=n+t.raw.height,a=t.raw.left,o=a+t.raw.width,i=(o-a)*(r-n),h=0;h<this.randomThoughts.length;h++)if(this.randomThoughts[h].active){var s=this.randomThoughts[h].raw.top,c=s+this.randomThoughts[h].raw.height,u=this.randomThoughts[h].raw.left,d=u+this.randomThoughts[h].raw.width,l=(d-u)*(c-s),g=Math.min(r,c)-Math.max(n,s),f=Math.min(o,d)-Math.max(a,u),m=g*f;Math.min(g,f)>0&&Math.max(m/i,m/l)>0&&(e=!1)}t.active=e},getGrid:function(){var t=8*Math.ceil(8*document.documentElement.clientHeight/document.documentElement.clientWidth);while(this.grid.length>t)this.grid.pop();while(this.grid.length<t)this.grid.push(0)},randomizeFade:function(){for(var t=0;t<this.grid.length;t++)Math.random()>0&&(this.grid[t]=Math.floor(7*Math.random())+1);this.grid.pop(),this.grid.push(0)},generateStyle:function(t){var e=["left","right","center"];return{width:t.width+"%",left:t.left+"%",top:t.top+"%","font-size":t.fontSize+"vw","line-height":t.lineHeight+"vw",transition:"opacity "+(2*Math.random()+2)+"s ease","text-align":e[Math.floor(Math.random()*e.length)]}}}},u=(n("dd31"),n("d959")),d=n.n(u);const l=d()(c,[["render",s],["__scopeId","data-v-6c61adfa"]]);e["default"]=l}}]);
//# sourceMappingURL=chunk-2974df0a.129ee66f.js.map