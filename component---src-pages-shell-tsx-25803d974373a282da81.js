"use strict";(self.webpackChunkzmbush_com=self.webpackChunkzmbush_com||[]).push([[277],{4096:function(A,t,e){e.r(t),e.d(t,{default:function(){return g}});var n,a,c=e(1880),o=e(2698),l=e(9486),i=e(5785),d=e(7294),r=e(4382),f=function(A){var t=A.sh,e=A.command,n=d.useState((function(){return t.resultOf(e)})),a=n[0];n[1];return(0,r.tZ)("div",null,"$ ",e,(0,r.tZ)("br",null),(0,r.tZ)("pre",null,a))},u=e(6125),m={echo:function(){for(var A=arguments.length,t=new Array(A),e=0;e<A;e++)t[e]=arguments[e];return t.join(" ")},cat:function(){return"Meow!"},_10:function(){return[10,9,8,7,6,5,4,3,2,1,0,"Blastoff!"].join("\n")},emacs:function(){return"I'd rather not..."},vim:function(){return"I would love to"},hello:function(){return"Hi!"},molly:function(){return"Let's stay happy forever"},love:function(){return(0,r.tZ)(u.S,{src:"./molly-and-me.jpg",alt:"Molly and Me",__imageData:e(5401)})},bunnies:function(){var A=["http://25.media.tumblr.com/797ca7857d59a583c48bd3bdf399587a/tumblr_mkbsuybwbx1s4n655o1_250.gif","http://25.media.tumblr.com/556ece8d2e8a37778a669fec46cfc048/tumblr_mk5wu4khsl1s2g4gpo1_500.gif","http://25.media.tumblr.com/ac4cba33c1911ee5bca6e1d6eccc8848/tumblr_mk03o8tA8I1s5fgmlo1_500.gif","http://25.media.tumblr.com/42be686f0a3d3d3ba1f79884941ae212/tumblr_mjjmwtfb0i1s23il0o1_250.gif","http://media.tumblr.com/c5c16cd17c48cdeb5ea946c6dec3ec4d/tumblr_inline_mjh6nnIzUU1qa3yy9.gif","http://25.media.tumblr.com/b34d516ad3c8b5cc60a4b1e0e829d3f3/tumblr_mjf5id4UDO1s2g4gpo1_500.gif","http://25.media.tumblr.com/d5e5d7f09078b318652400ac836c3a92/tumblr_mjf4umnVW91s2g4gpo1_500.gif","http://24.media.tumblr.com/d6555aee4cfe75dbad720cb754e09679/tumblr_mj64zt00qb1s5fgmlo1_500.gif"],t=A[Math.floor(Math.random()*A.length)];return(0,r.tZ)("img",{src:t,alt:"bunny"})},help:function(){var A=Object.getOwnPropertyNames(m).map((function(A){return"_"===A[0]?A.slice(1):A}));return A.sort(),(0,r.tZ)("div",null,"Available Commands:"," ",A.map((function(A){return(0,r.tZ)("span",null,A," ")})))}},s={resultOf:function(A){var t=A.split(" "),e=t[0],n=t.slice(1);return"function"==typeof m[e]?m[e].apply(m,(0,i.Z)(n)):"function"==typeof m["_"+e]?m["_"+e].apply(m,(0,i.Z)(n)):""===e?"":e+": command not found"}},b=function(){var A=d.useState(s),t=A[0],e=(A[1],d.useState([])),n=e[0],a=e[1],c=d.useState(""),o=c[0],l=c[1],u=d.useCallback((function(A){switch(A.which){case 8:return!1;case 13:a([].concat((0,i.Z)(n),[o])),l("");break;default:l(o+String.fromCharCode(A.which))}}),[a,o,l]),m=d.useCallback((function(A){if(8===A.which)o.length>0&&l(o.substring(0,o.length-1))}),[o,l]);return d.useEffect((function(){return document.addEventListener("keypress",u),document.addEventListener("keydown",m),function(){document.removeEventListener("keypress",u),document.removeEventListener("keydown",m)}}),[u,m]),d.useEffect((function(){window.scrollTo(0,document.body.scrollHeight)}),[n]),(0,r.tZ)("div",null,n.map((function(A){return(0,r.tZ)(f,{key:""+A,sh:t,command:A})})),"$ ",o)},p=e(8535),h=(0,p.iv)(n||(n=(0,c.Z)(["\n  html {\n    background-color: black;\n  }\n"]))),g=function(){return(0,r.tZ)(o.Z,null,(0,r.tZ)(r.xB,{styles:h}),(0,r.tZ)(l.Z,null),(0,r.tZ)("div",{css:(0,p.iv)(a||(a=(0,c.Z)(["\n        font-family: 'Roboto Mono', monospace;\n        padding: 1rem;\n        color: #e040fb;\n      "])))},(0,r.tZ)(b,null)))}},5401:function(A){A.exports=JSON.parse('{"layout":"constrained","placeholder":{"fallback":"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwABBP/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAAB4B08qSGT/8QAGxAAAgIDAQAAAAAAAAAAAAAAAAECEQMSITL/2gAIAQEAAQUCxzikp9uxedkhH//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oACAECAQE/AYj/xAAaEAACAgMAAAAAAAAAAAAAAAAAAQIRECGh/9oACAEBAAY/ApJl8LGahj//xAAaEAEAAwEBAQAAAAAAAAAAAAABABEhQVEx/9oACAEBAAE/IakTLGDgudeRDpK/LkXZD6txVP/aAAwDAQACAAMAAAAQ3+//xAAXEQADAQAAAAAAAAAAAAAAAAAAASER/9oACAEDAQE/EE5TT//EABcRAQEBAQAAAAAAAAAAAAAAAAEAESH/2gAIAQIBAT8QNLyZ/8QAGhAAAgMBAQAAAAAAAAAAAAAAAREAITFB8P/aAAgBAQABPxBQA6zXqggIwQAE23uzmg8gkZGKVE+pIlCthgI25//Z"},"images":{"fallback":{"src":"/static/5d878dc9257a38891fe8f64fa318430d/f5201/molly-and-me.jpg","srcSet":"/static/5d878dc9257a38891fe8f64fa318430d/47852/molly-and-me.jpg 240w,\\n/static/5d878dc9257a38891fe8f64fa318430d/4a1eb/molly-and-me.jpg 480w,\\n/static/5d878dc9257a38891fe8f64fa318430d/f5201/molly-and-me.jpg 960w","sizes":"(min-width: 960px) 960px, 100vw"},"sources":[{"srcSet":"/static/5d878dc9257a38891fe8f64fa318430d/14864/molly-and-me.avif 240w,\\n/static/5d878dc9257a38891fe8f64fa318430d/20f92/molly-and-me.avif 480w,\\n/static/5d878dc9257a38891fe8f64fa318430d/81c80/molly-and-me.avif 960w","type":"image/avif","sizes":"(min-width: 960px) 960px, 100vw"},{"srcSet":"/static/5d878dc9257a38891fe8f64fa318430d/740b2/molly-and-me.webp 240w,\\n/static/5d878dc9257a38891fe8f64fa318430d/3d5e7/molly-and-me.webp 480w,\\n/static/5d878dc9257a38891fe8f64fa318430d/ba55a/molly-and-me.webp 960w","type":"image/webp","sizes":"(min-width: 960px) 960px, 100vw"}]},"width":960,"height":637}')}}]);
//# sourceMappingURL=component---src-pages-shell-tsx-25803d974373a282da81.js.map