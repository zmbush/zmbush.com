"use strict";(self.webpackChunkzmbush_com=self.webpackChunkzmbush_com||[]).push([[410],{3187:function(t,e,r){e.cB=void 0;var n=r(7152);Object.defineProperty(e,"cB",{enumerable:!0,get:function(){return n.helmetJsonLdProp}})},7152:function(t,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.helmetJsonLdProp=e.jsonLdScriptProps=e.JsonLd=void 0;var n=r(7294);function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(t,a,e.space)}}}e.JsonLd=function(t){return n.createElement("script",Object.assign({},o(t.item,t)))},e.jsonLdScriptProps=o,e.helmetJsonLdProp=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"application/ld+json",innerHTML:JSON.stringify(t,a,e.space)}};var i=Object.freeze({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}),u=new RegExp("[".concat(Object.keys(i).join(""),"]"),"g"),c=function(t){return i[t]},a=function(t,e){switch(typeof e){case"object":if(null===e)return;return e;case"number":case"boolean":case"bigint":return e;case"string":return e.replace(u,c);default:return}}},9903:function(t,e,r){var n,o=r(7462),i=r(1880),u=r(4382),c=r(8535),a=r(55),l=r(6770);e.Z=function(t){return(0,u.tZ)(l.Z,(0,o.Z)({css:(0,c.iv)(n||(n=(0,i.Z)(["\n      padding-top: 1rem;\n      max-width: ",";\n      margin: 0 auto;\n    "])),a.Z.breakpoints.value("article"))},t))}},4666:function(t,e,r){r.r(e);var n=r(4942),o=r(5444),i=r(5186),u=r(3187),c=r(9903),a=r(6100),l=r(9934),f=r(4382);function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){(0,n.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e.default=function(t){var e,r=t.data;return(0,f.tZ)(c.Z,{pageTitle:"My Blog Posts",headerImg:null===(e=r.allMdx.nodes[0].frontmatter)||void 0===e?void 0:e.headerImg},(0,f.tZ)(i.q,{script:[(0,u.cB)((0,l.X)((0,l.tH)((0,a.Z)().siteUrl,"blogs",r.allMdx.nodes.map((function(t){var e;return p(p({},t),{},{frontmatter:p(p({},t.frontmatter),{},{heroImage:null===(e=t.frontmatter)||void 0===e?void 0:e.headerImg})})})))))]}),(0,f.tZ)("p",null,"My posts will go here! "),r.allMdx.nodes.map((function(t){return(0,f.tZ)("article",{key:t.id},(0,f.tZ)("h2",null,t.fields.title),(0,f.tZ)("p",null,"Posted: ",t.fields.date),(0,f.tZ)(o.Link,{to:"/"+t.fields.slug},"Here"))})))}},9934:function(t,e,r){r.d(e,{Jd:function(){return f},tH:function(){return s},X:function(){return d}});var n=r(5785),o=r(4942),i=r(6125);function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){(0,o.Z)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var a=function(t,e){var r;void 0===e&&(e={});var n,o="boolean"==typeof(r="function"==typeof e?{cmp:e}:e).cycles&&r.cycles,i=r.cmp&&(n=r.cmp,function(t){return function(e,r){var o={key:e,value:t[e]},i={key:r,value:t[r]};return n(o,i)}}),u=[];return function t(e){if(e&&e.toJSON&&"function"==typeof e.toJSON&&(e=e.toJSON()),void 0===e)return"";if("number"==typeof e)return Number.isFinite(e)?""+e:"null";if("object"!=typeof e)return JSON.stringify(e);var r,n;if(Array.isArray(e)){for(n="[",r=0;r<e.length;r+=1)r&&(n+=","),n+=t(e[r])||"null";return n+"]"}if(null===e)return"null";if(-1!==u.indexOf(e)){if(o)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var c=u.push(e)-1,a=Object.keys(e).sort(i&&i(e));for(n="",r=0;r<a.length;r+=1){var l=a[r],f=t(e[l]);f&&(n&&(n+=","),n+=JSON.stringify(l)+":"+f)}return u.splice(c,1),"{"+n+"}"}(t)},l=function(t){return{"@type":"Person",name:t.name,url:t.url}},f=function(t,e){var r,n,o,u,c,a,f=e.frontmatter,s=e.fields,p=(0,i.d)(null==f||null===(r=f.heroImage)||void 0===r||null===(n=r.childImageSharp)||void 0===n?void 0:n.gatsbyImageData);return{"@type":"Article",mainEntityOfPage:{"@type":"WebPage",url:t+"/"+s.slug},author:null!=f&&f.author?l(f.author):void 0,headline:s.title,image:null!=p&&null!==(o=p.images)&&void 0!==o&&null!==(u=o.fallback)&&void 0!==u&&u.src?""+t+(null==p||null===(c=p.images)||void 0===c||null===(a=c.fallback)||void 0===a?void 0:a.src):void 0,datePublished:new Date(s.date).toISOString()}},s=function(t,e,r){return{"@type":"Blog",blogPost:r.map((function(e){return function(t,e){return c(c({},f(t,e)),{},{"@type":"BlogPosting"})}(t,e)})),mainEntityOfPage:{"@type":"WebPage",url:t+"/"+e},author:(0,n.Z)(new Set((0,n.Z)(r.map((function(t){var e=t.frontmatter;return a((null==e?void 0:e.author)||"")})))).values()).filter((function(t){return""!==t})).map((function(t){var e=JSON.parse(t);return l(e)}))}},p=function t(e,r,n){void 0===n&&(n="_"),"object"==typeof e?("@type"in e&&r(n,e),Object.entries(e).forEach((function(e){var o=e[0],i=e[1];return t(i,r,n+"."+o)}))):Array.isArray(e)&&e.forEach((function(e,o){return t(e,r,n+"."+o)}))},d=function(t){var e=c({"@context":"http://schema.org/"},t),r={};p(e,(function(t,e){if("_"!==t){var n=a(e);r[n]=(r[n]||0)+1}}));var n=0,o={};return p(e,(function(t,e){if("_"!==t){var i=a(e);r[i]>1&&(i in o?(Object.keys(e).forEach((function(t){return delete e[t]})),e["@id"]=o[i]):(o[i]=""+t+n,n+=1,e["@id"]=o[i]))}})),e}}}]);
//# sourceMappingURL=component---src-pages-blog-tsx-2e8179a053ba5e8950f3.js.map