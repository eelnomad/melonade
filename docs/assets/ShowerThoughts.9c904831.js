import{_ as m,o as l,c as f,a as w,d as y,w as _,F as k,h as I,f as T,v as M,n as x,t as A,l as j,k as z}from"./index.cdea16b3.js";const B={name:"shower-thoughts",inject:["$http"],data(){return{alignments:["left","right","center"],isVisible:!0,reddit:{after:"",expires:0,token:null},useReddit:!1,thoughts:{},thoughtQueue:{},thoughtInterval:null,tokenBackOff:100,tokenInterval:null}},created(){document.addEventListener("visibilitychange",this.handleVisibilityChange),this.thoughtInterval=setInterval(()=>{this.isVisible&&(this.queueThought(),this.processThoughts())},1e3)},mounted(){},beforeUnmount(){document.removeEventListener("visibilitychange",this.handleVisibilityChange),clearInterval(this.thoughtInterval),clearInterval(this.tokenInterval)},computed:{},methods:{handleVisibilityChange(){this.isVisible=!document.hidden},queueThought:function(){if(Math.random()<.5-Object.keys(this.thoughtQueue).length*.1){const n=Object.keys(this.thoughts);if(n.length<5&&!this.fetchingThoughts&&this.useReddit?this.getThoughts():!this.useReddit&&Object.keys(this.thoughtQueue)==0&&this.getThoughts(),n.length===0)return;var e=n[Math.random()*n.length<<0],t=this.thoughts[e];t.id=e,t.url||(t.url="https://www.reddit.com/r/Showerthoughts");var a=Math.floor(Math.random()*60+20),h=Math.ceil(Math.random()+Math.random()+Math.random()),s=Math.floor(Math.max(1,Math.min(7,a*Math.max(1.25,h)/t.title.length/.65))*100)/100,r=Math.floor(s*h*2.6*100)/100,o=Math.floor(Math.random()*(100-a)),i=Math.floor(Math.random()*(100-r-10)),d=Math.floor(s*(Math.random()*.6+1.2)*100)/100;t.raw={top:i,left:o,height:r,width:a},t.style={width:a+"%",left:o+"%",top:i+"%","font-size":s+"vw","line-height":d+"vw",transition:"opacity "+Math.floor((Math.random()*2+2)*100)/100+"s ease-in","text-align":this.alignments[Math.floor(Math.random()*this.alignments.length)]},t.timer=Math.random()*4+6,t.active=!1,this.thoughtQueue[e]=t,delete this.thoughts[e]}},activateThought:function(e){var t=!0,a=e.raw.top,h=a+e.raw.height,s=e.raw.left,r=s+e.raw.width,o=(r-s)*(h-a);Object.values(this.thoughtQueue).forEach(i=>{if(i.active){var d=i.raw.top,n=d+i.raw.height,c=i.raw.left,u=c+i.raw.width,p=(u-c)*(n-d),g=Math.min(h,n)-Math.max(a,d),v=Math.min(r,u)-Math.max(s,c),b=g*v;Math.min(g,v)>0&&Math.max(b/o,b/p)>0&&(t=!1)}}),e.active=t},processThoughts:function(){Object.values(this.thoughtQueue).forEach(e=>{e.active?(e.timer<0&&delete this.thoughtQueue[e.id],e.timer--):this.activateThought(e)})},getThoughts:function(){if(!this.useReddit){this.thoughts={1:{title:"pies"},2:{title:"pizza"},3:{title:"cake"},4:{title:"imagine if these were actual shower thoughts and not just pies, cake, or pizza"}};return}if(this.fetchingThoughts=!0,Date.now()>this.reddit.expires){this.fetchingToken||this.getToken(),this.tokenInterval=setTimeout(this.getThoughts,this.tokenBackOff);return}const e="https://oauth.reddit.com/r/showerthoughts/hot?limit=100&after="+this.reddit.after;this.$http.get(e,{headers:{Authorization:this.reddit.token}}).then(t=>{t.data.data.children.forEach(a=>{this.thoughts[a.data.id]={title:a.data.title,url:a.data.url}}),this.fetchingThoughts=!1}).catch(t=>{this.fetchingThoughts=!1,console.log(t)})},getToken:function(){this.fetchingToken=!0;var e=new URLSearchParams;e.append("grant_type","https://oauth.reddit.com/grants/installed_client"),e.append("device_id","DO_NOT_TRACK_THIS_DEVICE"),this.$http.post("https://www.reddit.com/api/v1/access_token",e,{auth:{username:"TOF_jt6LhZBi1w",password:""}}).then(t=>{this.reddit.after=t.after,this.reddit.token="Bearer "+t.data.access_token,this.reddit.expires=Date.now()+t.data.expires_in,this.tokenBackOff=300,this.fetchingToken=!1}).catch(t=>{this.tokenBackOff*=2,this.fetchingToken=!1,console.log(t)})}}},O={id:"shower-thoughts",class:"main f-col f-center f-grow"},S=["href"],E=z('<div class="article f-row pV-xxl pH-l" data-v-b762fb18><span class="f-grow" data-v-b762fb18></span><div class="article-content" data-v-b762fb18><div class="article-timestamp" data-v-b762fb18>2023-11-15</div><div class="article-title pB-l" data-v-b762fb18> Shower Thoughts! A relaxing way to sit back and enjoy the entropy that is the human mind. </div><br data-v-b762fb18><div class="section-header" data-v-b762fb18>*Note: Due to API changes, this page no longer interacts with Reddit&#39;s API.</div><br data-v-b762fb18><div class="section-body" data-v-b762fb18>In the fast-paced world of the internet, moments of serenity are often hard to come by. Amidst the hustle and bustle of online interactions, there exists a unique corner on the web where users can unwind and let their thoughts flow freely\u2014the realm of Shower Thoughts. Shower thoughts are those fleeting, often profound ideas that occur to us when we least expect them. Inspired by this concept, I embarked on a creative journey to build a tranquil online space dedicated to showcasing these musings. In this article, I will share my experience of designing and developing a web page that elegantly displays shower thoughts fetched from Reddit&#39;s API, complete with a soothing breathing effect. Join me as I delve into the details of this implementation.</div><br data-v-b762fb18><br data-v-b762fb18><div class="section-header" data-v-b762fb18>Exploring Reddit&#39;s API:</div><br data-v-b762fb18><div class="section-body" data-v-b762fb18>To bring my vision to life, I utilized Reddit&#39;s API, a powerful resource that taps into the collective mind of the internet. After obtaining the necessary API credentials, I set out to retrieve shower thoughts\u2014captivating snippets of wisdom shared by Reddit users of /r/showerthoughts. Through API requests, I fetch a curated selection of these thoughts, ensuring a diverse and engaging collection for visitors to experience.</div><br data-v-b762fb18><br data-v-b762fb18><div class="section-header" data-v-b762fb18>Designing the User Interface:</div><br data-v-b762fb18><div class="section-body" data-v-b762fb18>A crucial aspect of this page was crafting a visually appealing interface. I opted for a simple background image of nature and a slow paced breathing effect, focusing on readability and gentle animations. The shower thoughts were randomly presented across the viewable screen, each with a varying font size to drive home the random nature of shower thoughts. To create a calming ambiance, I incorporated a subtle breathing effect\u2014a gentle fade-in and fade-out for each thought, reminiscent of a peaceful meditation exercise. This effect was achieved using CSS animations, providing visitors with a soothing visual experience.</div><br data-v-b762fb18><br data-v-b762fb18><div class="section-header" data-v-b762fb18>Implementing the Breathing Effect:</div><br data-v-b762fb18><div class="section-body" data-v-b762fb18>The trickiest part of this page was randomizing the font size and appearance location of each thought while keeping it constrained in the initial viewable bounds. My process started with generating a random width and number of rows within some constraints for how wide and tall the thought would appear on the screen. Then, based off of those numbers and because this was meant to be a quick project, I created a generalized formula for how large the font size and element heights should be. After that, they&#39;re placed in a queue to be displayed on the screen. A process runs through the queue and any shower thoughts what won&#39;t be overlapping with any currently existing elements and begins the transition process. Each thought only lasts on the screen for a short amount of time, randomly decided by math.rand(), before they fade back out, completing the lifecycle of a thought on the page.</div><br data-v-b762fb18><br data-v-b762fb18><div class="section-header" data-v-b762fb18>Conclusion:</div><br data-v-b762fb18><div class="section-body" data-v-b762fb18>Building a web page to display shower thoughts with a breathing effect proved to be a delightful and meditative endeavor. By harnessing the power of Reddit&#39;s API and combining it with creative design and animations, I created a serene online space where visitors can immerse themselves in the wisdom of the internet community. This project not only provided a platform for the expression of diverse thoughts but also served as a reminder of the beauty that emerges when technology and creativity harmonize. As the virtual page gently breathes in and out, it invites users to relax, reflect, and appreciate the profound musings that shower thoughts have to offer.</div></div><span class="f-grow" data-v-b762fb18></span></div>',1);function R(e,t,a,h,s,r){return l(),f("div",null,[w("div",O,[y(j,{name:"fade"},{default:_(()=>[(l(!0),f(k,null,I(s.thoughtQueue,(o,i)=>T((l(),f("a",{href:o.url,key:i,style:x(o.style),class:"thought-bubble",target:"_blank"},A(o.title),13,S)),[[M,o.active]])),128))]),_:1})]),E])}const P=m(B,[["render",R],["__scopeId","data-v-b762fb18"]]);export{P as default};
