webpackJsonp([0],[,function(t,e){t.exports=[{_id:1,type:"Shower Thoughts",title:"What if the world suddenly stopped?",body:"Imagine what would happen if the earth just suddenly... stopped. Nothing else, only the earth. Would we be sent flying off into the final frontier?",create_date:"2017-07-26 10:37:42.231",background_image:"https://www.123freevectors.com/wp-content/uploads/naturevector/sketchy-globe-drawing-free-vector.jpg",font_preview_color:"black"},{_id:2,type:"Life",title:"The KingKiller Chronicles",body:"It's amazing, I'll tell you that!",create_date:"2017-07-26 10:37:42.231",background_image:"https://upload.wikimedia.org/wikipedia/en/5/56/TheNameoftheWind_cover.jpg",font_preview_color:"red"},{_id:3,type:"Life",title:"League of Legends: Never making it to plat again",body:"I'm too devoted to ARAM. It's a slippery slope once you try some ARAM.",create_date:"2017-07-26 10:37:42.231",background_image:"https://images.pexels.com/photos/34950/pexels-photo.jpg?w=1260&h=750&auto=compress&cs=tinysrgb",font_preview_color:"grey"},{_id:4,type:"Programming",title:"This website!",body:"Learning to develop with Vue. Its actually pretty nice! :D",create_date:"2017-07-26 10:37:42.231",background_image:"https://vuejs.org/images/logo.png",font_preview_color:"blue"},{_id:5,type:"Photos",title:"King Crab!",body:"Bask in its former glory!",create_date:"2017-07-26 10:37:42.231",background_image:"https://image.shutterstock.com/display_pic_with_logo/2959075/256752703/stock-photo-yellow-land-crab-cuba-256752703.jpg",font_preview_color:"purple"}]},,function(t,e,o){"use strict";var n=o(2),r=o(34),a=o(21),i=o.n(a),s=o(22),c=o.n(s),u=o(26),p=o.n(u),l=o(23),d=o.n(l),_=o(24),f=o.n(_);n.a.use(r.a),e.a=new r.a({routes:[{path:"/",name:"Blog",component:c.a},{path:"/About",name:"About",component:i.a},{path:"/:blog_id",name:":blog_id",component:p.a,children:[{path:"",component:d.a},{path:":post_id",component:f.a}]}]})},function(t,e,o){function n(t){o(15)}var r=o(0)(o(6),o(28),n,null,null);t.exports=r.exports},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(2),r=o(4),a=o.n(r),i=o(3);n.a.config.productionTip=!1,new n.a({el:"#app",router:i.a,template:"<App/>",components:{App:a.a}})},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(13);o.n(n);e.default={name:"app"}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"about"}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(1),r=o.n(n),a=o(25),i=o.n(a);e.default={name:"blog",data:function(){return{top:[]}},created:function(){this.getTop()},methods:{getTop:function(){r.a.sort(function(t,e){return t._id>e._id?-1:t._id<e._id?1:0});for(var t=[],e=[],o=0;o<r.a.length;o++)e.includes(r.a[o].type)||(e.push(r.a[o].type),t.push(r.a[o]));this.top=t}},components:{BlogType:i.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(1),r=o.n(n);e.default={name:"blogHome",data:function(){return{postList:[]}},created:function(){this.getPosts()},methods:{getPosts:function(){for(var t=[],e=0;e<r.a.length;e++)r.a[e].type===this.$route.params.blog_id&&t.push(r.a[e]);this.postList=t}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(1),r=o.n(n);e.default={name:"blogPost",data:function(){return{post:{}}},created:function(){this.getPost()},methods:{getPost:function(){for(var t=0;t<r.a.length;t++)r.a[t]._id.toString()===this.$route.params.post_id&&(this.post=r.a[t])}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"blogType",props:["post"],data:function(){return{active:!1}},methods:{mouseOver:function(){this.active=!this.active}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"blogWrapper"}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,o){function n(t){o(17)}var r=o(0)(o(7),o(30),n,"data-v-51efdae1",null);t.exports=r.exports},function(t,e,o){function n(t){o(20)}var r=o(0)(o(8),o(33),n,"data-v-c8af5304",null);t.exports=r.exports},function(t,e,o){function n(t){o(18)}var r=o(0)(o(9),o(31),n,"data-v-577fc4fd",null);t.exports=r.exports},function(t,e,o){function n(t){o(19)}var r=o(0)(o(10),o(32),n,"data-v-bcccbf84",null);t.exports=r.exports},function(t,e,o){function n(t){o(16)}var r=o(0)(o(11),o(29),n,"data-v-4c2ab9d8",null);t.exports=r.exports},function(t,e,o){function n(t){o(14)}var r=o(0)(o(12),o(27),n,"data-v-0502aa36",null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"blogWrapper"},[o("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("router-link",{attrs:{to:t.post.type+"/"+t.post._id},nativeOn:{mouseover:function(e){t.mouseOver(e)},mouseleave:function(e){t.mouseOver(e)}}},[o("div",{staticClass:"background",style:{"background-image":"url("+t.post.background_image+")"}},[t.active?o("div",{style:{color:t.post.font_preview_color},attrs:{id:"blog-preview"}},[o("h2",[t._v(t._s(t.post.title))]),t._v(" "),o("h3",[t._v(t._s(t.post.body))])]):o("div",{style:{color:t.post.font_preview_color},attrs:{id:"blog-category"}},[o("h1",[t._v(t._s(t.post.type))])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"about"}},[o("h1",[t._v("About me")]),t._v(" "),o("h2",[t._v("Just a dreamer :)")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"blogHome"}},[o("h1",[t._v(t._s(t.$route.params.blog_id))]),t._v(" "),t._l(t.postList,function(e){return[o("router-link",{attrs:{to:e.type+"/"+e._id.toString()}},[o("div",{style:{backgroundImage:"url("+e.background_image+")"},attrs:{id:"postItem"}},[o("h2",[t._v(t._s(e.title))]),t._v(" "),o("h4",[t._v(t._s(e.create_date))]),t._v(" "),o("h3",[t._v(t._s(e.body))])])])]})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"blogPost"},[o("h1",[t._v(t._s(t.$route.params.blog_id))]),t._v(" "),o("h2",[t._v(t._s(t.post.title))]),t._v(" "),o("h4",[t._v(t._s(t.post.create_date))]),t._v(" "),o("h3",[t._v(t._s(t.post.body))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"blog"}},t._l(t.top,function(t){return o("blog-type",{key:t._id,attrs:{id:"blog-type",post:t}})}))},staticRenderFns:[]}}],[5]);
//# sourceMappingURL=app.426081fe590f09415cf9.js.map