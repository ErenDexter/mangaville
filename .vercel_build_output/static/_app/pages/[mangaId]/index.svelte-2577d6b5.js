var t=Object.defineProperty,e=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(e,r,a)=>r in e?t(e,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[r]=a;import{S as l,i as n,s as c,k as o,e as h,t as i,M as u,d as f,n as d,c as p,a as m,g,b as x,D as v,f as b,E as y,G as E,O as I,A as w,P as k,F as D,h as V,N as j}from"../../chunks/vendor-76586ada.js";import{p as O}from"../../chunks/stores-38c1737a.js";import{s as P}from"../../chunks/db-78882d40.js";function T(t,e,r){const a=t.slice();return a[15]=e[r],a[17]=r,a}function N(t,e,r){const a=t.slice();return a[18]=e[r],a}function $(t){let e,r;return{c(){e=h("div"),r=i(t[3]),this.h()},l(a){e=p(a,"DIV",{class:!0});var s=m(e);r=g(s,t[3]),s.forEach(f),this.h()},h(){x(e,"class","w-full h-40 animate-bounce mt-5 flex justify-center items-center text-white text-2xl font-light")},m(t,a){b(t,e,a),y(e,r)},p:E,d(t){t&&f(e)}}}function A(t){let e,r,a,s,l,n=t[1],c=[];for(let o=0;o<n.length;o+=1)c[o]=B(N(t,n,o));let i=t[1][t[0]].chunk,u=[];for(let o=0;o<i.length;o+=1)u[o]=H(T(t,i,o));return{c(){e=h("div");for(let t=0;t<c.length;t+=1)c[t].c();r=o(),a=h("div"),s=o(),l=h("div");for(let t=0;t<u.length;t+=1)u[t].c();this.h()},l(t){e=p(t,"DIV",{class:!0});var n=m(e);for(let e=0;e<c.length;e+=1)c[e].l(n);r=d(n),a=p(n,"DIV",{class:!0}),m(a).forEach(f),s=d(n),l=p(n,"DIV",{class:!0});var o=m(l);for(let e=0;e<u.length;e+=1)u[e].l(o);o.forEach(f),n.forEach(f),this.h()},h(){x(a,"class","w-full h-0.5 bg-primary mx-auto mt-2"),x(l,"class","flex flex-wrap justify-center gap-2 mt-5"),x(e,"class","flex flex-wrap justify-center gap-3 mt-10")},m(t,n){b(t,e,n);for(let r=0;r<c.length;r+=1)c[r].m(e,null);y(e,r),y(e,a),y(e,s),y(e,l);for(let e=0;e<u.length;e+=1)u[e].m(l,null)},p(t,a){if(3&a){let s;for(n=t[1],s=0;s<n.length;s+=1){const l=N(t,n,s);c[s]?c[s].p(l,a):(c[s]=B(l),c[s].c(),c[s].m(e,r))}for(;s<c.length;s+=1)c[s].d(1);c.length=n.length}if(7&a){let e;for(i=t[1][t[0]].chunk,e=0;e<i.length;e+=1){const r=T(t,i,e);u[e]?u[e].p(r,a):(u[e]=H(r),u[e].c(),u[e].m(l,null))}for(;e<u.length;e+=1)u[e].d(1);u.length=i.length}},d(t){t&&f(e),j(c,t),j(u,t)}}}function B(t){let e,r,a,s,l,n,c,o=t[18].chunk[0].chapterId+"",u=t[18].chunk[t[18].chunk.length-1].chapterId+"";function d(){return t[8](t[18])}return{c(){e=h("button"),r=i(o),a=i(" - "),s=i(u),this.h()},l(t){e=p(t,"BUTTON",{class:!0});var l=m(e);r=g(l,o),a=g(l," - "),s=g(l,u),l.forEach(f),this.h()},h(){x(e,"class",l=(t[0]==t[18].index?"bg-primary border-primary":"bg-gray-800 border-gray-800")+" px-4 py-2  text-white rounded-md border-2 transition duration-300 ease-in-out  hover:border-primary")},m(t,l){b(t,e,l),y(e,r),y(e,a),y(e,s),n||(c=D(e,"click",d),n=!0)},p(a,n){t=a,2&n&&o!==(o=t[18].chunk[0].chapterId+"")&&V(r,o),2&n&&u!==(u=t[18].chunk[t[18].chunk.length-1].chapterId+"")&&V(s,u),3&n&&l!==(l=(t[0]==t[18].index?"bg-primary border-primary":"bg-gray-800 border-gray-800")+" px-4 py-2  text-white rounded-md border-2 transition duration-300 ease-in-out  hover:border-primary")&&x(e,"class",l)},d(t){t&&f(e),n=!1,c()}}}function H(t){let e,r,a,s,l,n=t[15].chapterId+"";return{c(){e=h("a"),r=h("button"),a=i(n),s=o(),this.h()},l(t){e=p(t,"A",{href:!0});var l=m(e);r=p(l,"BUTTON",{class:!0});var c=m(r);a=g(c,n),s=d(c),c.forEach(f),l.forEach(f),this.h()},h(){x(r,"class","w-16 lg:w-20 h-11 bg-gray-800 text-white rounded-md border-2 transition duration-300 ease-in-out border-gray-800 hover:border-primary"),x(e,"href",l="/"+t[2]+"/"+(100*t[0]+t[17]+1))},m(t,l){b(t,e,l),y(e,r),y(r,a),y(r,s)},p(t,r){3&r&&n!==(n=t[15].chapterId+"")&&V(a,n),1&r&&l!==(l="/"+t[2]+"/"+(100*t[0]+t[17]+1))&&x(e,"href",l)},d(t){t&&f(e)}}}function S(t){let e,r,a,s,l,n,c,I,w,k,D,V,j,O,P,T,N,B,H,S,U,z,F;function G(t,e){return 0!==t[1].length?A:$}document.title=e=t[3];let M=G(t),q=M(t);return{c(){r=o(),a=h("div"),s=h("h1"),l=i(t[3]),n=o(),c=h("div"),I=h("div"),w=h("h2"),k=i(t[3]),D=o(),V=h("div"),j=i(t[5]),O=o(),P=h("div"),T=i(t[4]),N=o(),B=h("div"),H=i(t[6]),S=o(),U=h("div"),z=h("div"),F=o(),q.c(),this.h()},l(e){u('[data-svelte="svelte-1az6e94"]',document.head).forEach(f),r=d(e),a=p(e,"DIV",{class:!0,style:!0});var o=m(a);s=p(o,"H1",{class:!0,style:!0});var h=m(s);l=g(h,t[3]),h.forEach(f),o.forEach(f),n=d(e),c=p(e,"DIV",{class:!0});var i=m(c);I=p(i,"DIV",{});var x=m(I);w=p(x,"H2",{class:!0});var v=m(w);k=g(v,t[3]),v.forEach(f),D=d(x),V=p(x,"DIV",{class:!0});var b=m(V);j=g(b,t[5]),b.forEach(f),O=d(x),P=p(x,"DIV",{class:!0});var y=m(P);T=g(y,t[4]),y.forEach(f),N=d(x),B=p(x,"DIV",{class:!0});var E=m(B);H=g(E,t[6]),E.forEach(f),x.forEach(f),i.forEach(f),S=d(e),U=p(e,"DIV",{class:!0});var $=m(U);z=p($,"DIV",{class:!0}),m(z).forEach(f),F=d($),q.l($),$.forEach(f),this.h()},h(){x(s,"class","my-72 text-3xl lg:text-6xl border-2 px-6 lg:py-4 py-3 font-medium text-white uppercase"),v(s,"background-color","rgba(0, 0, 0, 0.6)"),x(a,"class","flex justify-center mx-auto w-full h-auto bg-center bg-cover bg-no-repeat px-2 "),v(a,"background-image","url("+t[7]+")"),x(w,"class","text-2xl uppercase"),x(V,"class","text-sm text-primary font-medium uppercase"),x(P,"class","text-base font-light uppercase"),x(B,"class","text-lg text-left font-light mt-5"),x(c,"class","px-4 lg:px-20 text-white text-lg font-medium mt-6"),x(z,"class","w-20 h-1 bg-primary mx-auto mt-10"),x(U,"class","px-4 lg:px-20 text-white text-lg font-medium mt-6")},m(t,e){b(t,r,e),b(t,a,e),y(a,s),y(s,l),b(t,n,e),b(t,c,e),y(c,I),y(I,w),y(w,k),y(I,D),y(I,V),y(V,j),y(I,O),y(I,P),y(P,T),y(I,N),y(I,B),y(B,H),b(t,S,e),b(t,U,e),y(U,z),y(U,F),q.m(U,null)},p(t,[r]){8&r&&e!==(e=t[3])&&(document.title=e),M===(M=G(t))&&q?q.p(t,r):(q.d(1),q=M(t),q&&(q.c(),q.m(U,null)))},i:E,o:E,d(t){t&&f(r),t&&f(a),t&&f(n),t&&f(c),t&&f(S),t&&f(U),q.d()}}}function U(t,l,n){let c,o;I(t,P,(t=>n(9,c=t))),I(t,O,(t=>n(10,o=t)));const{mangaId:h}=o.params,i=h.replace(/-/g," "),{title:u,genre:f,duration:d,description:p,cover:m,link:g,source:x}=c.mangas.filter((t=>t.title===i))[0];let v=0,b=[];w((()=>{const t=g.replace(/\//g,",");k.get(`mv-api/manga/${x}/${h}/${t}`).then((t=>{P.update((l=>((t,l)=>{for(var n in l||(l={}))r.call(l,n)&&s(t,n,l[n]);if(e)for(var n of e(l))a.call(l,n)&&s(t,n,l[n]);return t})({[h]:t.data.chapters.reverse()},l)))})).then((()=>{const t=[...c[h]];n(1,b=function(t=[]){let e=[],r=0;for(;t.length>0;){const a={},s=t.splice(0,100);b&&(a.chunk=s,a.index=r,e.push(a),r++)}return e}(t))})).catch((t=>{console.log(t)}))}));return[v,b,h,u,f,d,p,m,t=>n(0,v=t.index)]}class z extends l{constructor(t){super(),n(this,t,U,S,c,{})}}export{z as default};