(self.webpackChunkzmbush_com=self.webpackChunkzmbush_com||[]).push([[235],{3646:function(t,e,r){var n=r(7228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},9100:function(t,e,r){var n=r(9489),o=r(7067);function i(e,r,a){return o()?(t.exports=i=Reflect.construct,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=i=function(t,e,r){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return r&&n(i,r.prototype),i},t.exports.__esModule=!0,t.exports.default=t.exports),i.apply(null,arguments)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},9713:function(t){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},t.exports.__esModule=!0,t.exports.default=t.exports},7067:function(t){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},6860:function(t){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},8206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,r){var n=r(3646),o=r(6860),i=r(379),a=r(8206);t.exports=function(t){return n(t)||o(t)||i(t)||a()},t.exports.__esModule=!0,t.exports.default=t.exports},648:function(t,e,r){var n=r(7854),o=r(1694),i=r(614),a=r(4326),u=r(5112)("toStringTag"),c=n.Object,l="Arguments"==a(function(){return arguments}());t.exports=o?a:function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=function(t,e){try{return t[e]}catch(r){}}(e=c(t),u))?r:l?a(e):"Object"==(n=a(e))&&i(e.callee)?"Arguments":n}},6135:function(t,e,r){"use strict";var n=r(4948),o=r(3070),i=r(9114);t.exports=function(t,e,r){var a=n(e);a in t?o.f(t,a,i(0,r)):t[a]=r}},9974:function(t,e,r){var n=r(1702),o=r(9662),i=n(n.bind);t.exports=function(t,e){return o(t),void 0===e?t:i?i(t,e):function(){return t.apply(e,arguments)}}},1246:function(t,e,r){var n=r(648),o=r(8173),i=r(7497),a=r(5112)("iterator");t.exports=function(t){if(null!=t)return o(t,a)||o(t,"@@iterator")||i[n(t)]}},8554:function(t,e,r){var n=r(7854),o=r(6916),i=r(9662),a=r(9670),u=r(6330),c=r(1246),l=n.TypeError;t.exports=function(t,e){var r=arguments.length<2?c(t):e;if(i(r))return a(o(r,t));throw l(u(t)+" is not iterable")}},7659:function(t,e,r){var n=r(5112),o=r(7497),i=n("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||a[i]===t)}},408:function(t,e,r){var n=r(7854),o=r(9974),i=r(6916),a=r(9670),u=r(6330),c=r(7659),l=r(6244),s=r(7976),f=r(8554),p=r(1246),d=r(9212),m=n.TypeError,h=function(t,e){this.stopped=t,this.result=e},g=h.prototype;t.exports=function(t,e,r){var n,x,y,v,b,E,w,O=r&&r.that,j=!(!r||!r.AS_ENTRIES),Z=!(!r||!r.IS_ITERATOR),_=!(!r||!r.INTERRUPTED),k=o(e,O),R=function(t){return n&&d(n,"normal",t),new h(!0,t)},S=function(t){return j?(a(t),_?k(t[0],t[1],R):k(t[0],t[1])):_?k(t,R):k(t)};if(Z)n=t;else{if(!(x=p(t)))throw m(u(t)+" is not iterable");if(c(x)){for(y=0,v=l(t);v>y;y++)if((b=S(t[y]))&&s(g,b))return b;return new h(!1)}n=f(t,x)}for(E=n.next;!(w=i(E,n)).done;){try{b=S(w.value)}catch(z){d(n,"throw",z)}if("object"==typeof b&&b&&s(g,b))return b}return new h(!1)}},9212:function(t,e,r){var n=r(6916),o=r(9670),i=r(8173);t.exports=function(t,e,r){var a,u;o(t);try{if(!(a=i(t,"return"))){if("throw"===e)throw r;return r}a=n(a,t)}catch(c){u=!0,a=c}if("throw"===e)throw r;if(u)throw a;return o(a),r}},7497:function(t){t.exports={}},1694:function(t,e,r){var n={};n[r(5112)("toStringTag")]="z",t.exports="[object z]"===String(n)},8559:function(t,e,r){var n=r(2109),o=r(408),i=r(6135);n({target:"Object",stat:!0},{fromEntries:function(t){var e={};return o(t,(function(t,r){i(e,t,r)}),{AS_ENTRIES:!0}),e}})},9534:function(t,e,r){"use strict";r(8559);var n,o=r(1880),i=r(5444),a=r(3040),u=r(5971),c=r(594),l=r(4382),s=r(8535),f=r(8837),p=r.n(f),d=r(6907),m=r.n(d),h={java:u.zEo,node:u.jPo,python:u.osz,ruby:a.ZnK,rust:u.z4v,mui:c.I1f,react:u.huN,aseprite:c.vFV,bevy:p(),tiled:m()};e.Z=function(t){var e,r=t.refName,a=(0,i.useStaticQuery)("2442489728"),u=Object.fromEntries(a.technologies.nodes.map((function(t){return[t.ref,t]})))[r];if(r in h){var c=h[r];e=(0,l.tZ)(c,{size:"2.5rem",height:"2.5rem",width:"2.5rem"})}else e=(0,l.tZ)("b",null,"Unknown ",r);if(u)return(0,l.tZ)("a",{css:(0,s.iv)(n||(n=(0,o.Z)(["\n          display: inline-block;\n          color: inherit;\n          margin-right: 1rem;\n\n          &:last-of-type {\n            margin-right: 0;\n          }\n        "]))),href:u.url,title:u.tagline},e);throw new Error("tech-icon: Could not find icon for: "+r)}},6631:function(t,e,r){"use strict";r.r(e);var n=r(9394),o=r(7294),i=r(9903),a=r(9534),u=r(4382),c=function(t){var e=t.partners,r=t.siteUrl,n=t.siteName,i=t.siteMsg,a=t.sourceUrl;return(0,u.tZ)(o.Fragment,null,r?(0,u.tZ)("p",null,i||"You can see it in action"," ",n?"at: ":null,(0,u.tZ)("a",{href:r},n||"here"),"."):null,e?(0,u.tZ)("p",null,"I built this project with"," ",e.map((function(t,r){return(0,u.tZ)(o.Fragment,{key:t.ref},e.length>1&&r===e.length-1?" and ":null,(0,u.tZ)("a",{href:t.url},t.name),r===e.length-1?".":null,e.length>2&&r!==e.length-1?",":null)}))):null,a?(0,u.tZ)("p",null,"You can view the code for this project ",(0,u.tZ)("a",{href:a},"here"),"."):null)},l={blog:i.Z,projects:i.Z};e.default=function(t){var e=t.data;if(!e.mdx||!e.mdx.frontmatter||!e.mdx.body)return(0,u.tZ)(o.Fragment,null,(0,u.tZ)(i.Z,{pageTitle:"ERROR"},"Unable to render blog post. Expected data is not present."),(0,u.tZ)("code",{className:"language-json"},JSON.stringify(e,null,2)));var r=e.mdx,s=r.frontmatter,f=r.body,p=r.headings,d=r.fields,m=l.blog;return d&&d.source&&d.source in l&&(m=l[d.source]),(0,u.tZ)(m,{pageTitle:d.title,subtitle:s.subtitle||void 0,technologies:(0,u.tZ)(o.Fragment,null,(s.technologies||[]).map((function(t){return(0,u.tZ)(a.Z,{key:t.ref,refName:t.ref})}))),date:d.date,headerImg:s.heroImage},(0,u.tZ)(n.MDXRenderer,{headings:p},f),(0,u.tZ)(c,s))}},9394:function(t,e,r){var n=r(6660);t.exports={MDXRenderer:n}},6660:function(t,e,r){var n=r(9100),o=r(319),i=r(9713),a=r(7316),u=["scope","children"];function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var s=r(7294),f=r(3497).mdx,p=r(2197).useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,i=a(t,u),c=p(e),d=s.useMemo((function(){if(!r)return null;var t=l({React:s,mdx:f},c),e=Object.keys(t),i=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+r])).apply(void 0,[{}].concat(o(i)))}),[r,e]);return s.createElement(d,l({},i))}},8837:function(t,e,r){var n=r(7294);function o(t){return n.createElement("svg",t,n.createElement("g",{transform:"translate(-33.38,-123.87)",id:"g24"},[n.createElement("g",{transform:"matrix(0.70544,0,0,0.70544,-355.03,-155.4)",id:"g6",key:0},n.createElement("g",{transform:"matrix(-0.40427,-0.17438,-0.17438,0.40427,678.78,389.85)",id:"g4"},n.createElement("path",{transform:"matrix(-0.5518,-0.23802,-0.23802,0.5518,1946.7,-620.61)",d:"m 2246,2340.2 c -0.016,3e-4 -0.031,0 -0.047,0 -0.9804,3.0675 -1.7386,6.3997 -1.8828,10.195 -0.2712,7.1263 0.453,11.464 -0.3672,16.08 -0.8202,4.6163 -3.2453,9.161 -9.4141,16.287 -7.3424,8.482 -18.979,15.045 -32.42,17.264 -2.5015,1.5971 -5.1421,3.0609 -7.9199,4.3633 10.462,3.9385 21.402,4.1531 30.076,1.3066 15.279,-5.0141 14.096,-8.6155 20.943,-19.107 2.1569,-3.3051 4.6474,-5.8282 7.1484,-7.9004 7.1248,3.1068 14.143,5.1015 18.516,4.6074 2.351,-5.4505 -0.057,-11.771 -4.0586,-17.746 3.2821,-10.196 -1.6986,-20.406 -12.73,-24.016 -2.8775,-0.9415 -5.4633,-1.3844 -7.8438,-1.3379 z m 8.2754,14.971 a 4.1669,4.2455 48.68 0 1 3.1973,1.3965 4.1669,4.2455 48.68 0 1 -0.4375,5.9336 4.1669,4.2455 48.68 0 1 -5.9394,-0.3262 4.1669,4.2455 48.68 0 1 0.4375,-5.9336 4.1669,4.2455 48.68 0 1 2.7421,-1.0703 z m -68.375,45.379 c 0.1273,0.075 0.2572,0.1408 0.3848,0.2149 0.131,-0.049 0.2642,-0.1009 0.3945,-0.1504 -0.2598,-0.023 -0.5188,-0.039 -0.7793,-0.064 z",id:"path2"}))),n.createElement("g",{transform:"matrix(-0.32026,0.25882,0.25882,0.32026,62.23,48.351)",id:"g12",key:1},n.createElement("g",{transform:"matrix(-0.35254,0.28491,0.28491,0.35254,477.11,-1021.8)",id:"g10"},n.createElement("path",{transform:"translate(5.0093e-5,-757.88)",d:"m 2191.1,2276.8 c -5.9729,-0.035 -12.098,2.348 -17.361,7.459 -6.9129,6.7127 -9.0602,12.756 -7.8477,20.295 l 0.332,2.0684 -2.0664,-0.336 c -15.188,-2.4609 -33.985,-1.2178 -55.371,7.4336 6.2868,2.6948 17.826,7.1926 30.631,13.342 l 4.0605,1.9512 -4.414,0.8945 c -16.909,3.4274 -36.973,13.328 -55.299,34.934 8.1981,-0.6372 24.953,-2.6089 42.428,-2.582 9.7138,0.015 19.287,0.687 27.086,2.709 7.7991,2.022 14.026,5.4353 16.367,11.285 l 0.1602,0.4004 -0.076,0.4238 c -0.3844,2.1831 -0.7613,4.1493 -1.1172,5.7598 -0.8163,3.6943 -4.0098,6.6817 -8.1953,9.3418 -4.1855,2.6601 -9.4961,4.9849 -15.014,6.9609 -11.035,3.9521 -22.78,6.4773 -27.965,6.959 -1.1021,0.1024 -1.5421,0.4983 -1.9668,1.2696 -0.4247,0.7712 -0.659,1.9824 -0.6934,3.25 -0.046,1.6926 0.181,3.1045 0.3672,4.0625 33.75,2.7665 58.848,-5.6513 76.959,-12.838 20.351,-9.3311 33.213,-27.758 36.006,-44.348 1.7499,-10.395 1.3746,-15.489 -0.3124,-19.828 -1.6873,-4.3387 -4.9223,-8.1914 -9.0254,-15.549 -2.6368,-4.7281 -4.1077,-9.367 -5.0196,-13.688 l -0.1933,-0.9102 0.7265,-0.582 c 7.5403,-6.0446 13.681,-12.644 15.91,-17.449 -4.5742,-4.8648 -12.479,-5.893 -21.322,-4.9473 l -0.7265,0.076 -0.5118,-0.5215 c -4.7125,-4.8006 -10.562,-7.2614 -16.535,-7.2969 z m 2.6484,11.232 a 5.6287,5.5245 76.403 0 1 5.502,4.3223 5.6287,5.5245 76.403 0 1 -4.0469,6.7695 5.6287,5.5245 76.403 0 1 -6.6934,-4.1719 5.6287,5.5245 76.403 0 1 4.0469,-6.7695 5.6287,5.5245 76.403 0 1 1.1914,-0.1504 z",id:"path8"}))),n.createElement("g",{transform:"matrix(-0.35631,0.047651,0.047651,0.35631,120.94,79.691)",id:"g22",key:2},n.createElement("g",{transform:"translate(-20.245,-6.1209)",id:"g20"},n.createElement("g",{transform:"translate(61.548,-5.6727)",id:"g18"},n.createElement("g",{transform:"matrix(-0.51463,0.068824,0.068824,0.51463,1184.4,-811.91)",id:"g16"},n.createElement("path",{transform:"translate(1.25e-4,-757.88)",d:"m 2230.9,2301.2 c -1.9108,-0.039 -3.9117,0.162 -5.9785,0.6328 -0.1394,0.032 -0.2613,0.071 -0.3984,0.1036 -2.274,2.2481 -4.8127,4.5047 -7.5293,6.7168 0.8746,3.8597 2.1735,7.8829 4.4707,12.002 3.9872,7.1495 7.2742,10.966 9.2031,15.926 1.9289,4.96 2.2639,10.794 0.4746,21.424 -2.2183,13.178 -10.24,27.132 -22.959,37.434 9.8717,-2.8792 18.287,-8.1915 23.858,-14.627 6.0132,-6.9464 8.0191,-10.876 8.7226,-14.836 0.7036,-3.9598 0.044,-8.2997 0.3242,-15.664 0.1805,-4.7447 1.1911,-8.8958 2.4766,-12.545 l 0.3086,-0.875 0.9219,-0.1211 c 8.2284,-1.0673 15.665,-3.167 19.51,-5.6484 -1.2349,-5.5522 -6.4807,-9.8603 -13.428,-13.135 l -0.6621,-0.3125 -0.166,-0.7129 c -2.2034,-9.4614 -9.5905,-15.563 -19.148,-15.762 z m 4.7832,11.686 a 4.8229,4.9139 17.729 0 1 1.4473,0.2246 4.8229,4.9139 17.729 0 1 3.0977,6.1484 4.8229,4.9139 17.729 0 1 -6.0899,3.2129 4.8229,4.9139 17.729 0 1 -3.0976,-6.1484 4.8229,4.9139 17.729 0 1 4.6425,-3.4375 z",id:"path14"})))))]))}o.defaultProps={fill:"currentColor",version:"1.1",viewBox:"0 0 36 36",id:"svg26",width:"36",height:"36"},t.exports=o,o.default=o},6907:function(t,e,r){var n=r(7294);function o(t){return n.createElement("svg",t,[n.createElement("rect",{x:".64611",y:"2.4021",width:"6.5875",height:"6.0464",key:0}),n.createElement("rect",{x:"9.114",y:"2.4021",width:"6.5875",height:"6.0464",key:1}),n.createElement("rect",{x:"17.546",y:"2.4021",width:"6.5875",height:"6.0464",key:2}),n.createElement("rect",{x:"9.114",y:"10.115",width:"6.5875",height:"6.0464",key:3}),n.createElement("rect",{x:"9.114",y:"17.828",width:"6.5875",height:"6.0464",key:4})])}o.defaultProps={fill:"currentColor",stroke:"currentColor",version:"1.0",viewBox:"0 0 25 25"},t.exports=o,o.default=o}}]);
//# sourceMappingURL=component---src-templates-article-tsx-f221f51cc56da3aca085.js.map