function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(e){for(var n=1;n<arguments.length;n++){var s=null!=arguments[n]?arguments[n]:{},o=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(s).filter((function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable})))),o.forEach((function(n){t(e,n,s[n])}))}return e}function n(t,e){return e=null!=e?e:{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):function(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,s)}return n}(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))})),t}var s=class{async doFetch(t,s={}){const{timeout:o=8e3}=s,r=new AbortController,i=setTimeout((()=>r.abort()),o),a=await fetch(this.baseUrl+t,n(e({},s),{signal:r.signal}));return clearTimeout(i),a}async get(t,e=[]){const n=await this.doFetch(t);if(!n.ok)throw new Error(`Fetch error ${n.status}`);let s=await n.json();return e.forEach((t=>s=s[t])),s}constructor(t){this.baseUrl=t}};const o=new class extends s{async getPosts(){return await this.get("/posts")}async getPostById(t){return await this.get(`/posts/${t}`)}async getCommentsForPostWithId(t){return await this.get(`/posts/${t}/comments`)}async getComments(){return await this.get("/comments")}async getAlbums(){return await this.get("/albums")}async getPhotos(){return await this.get("/photos")}async getTodos(){return await this.get("/todos")}async getUsers(){return await this.get("/users")}async getPostsWithUsers(){const[t,e]=await Promise.all([this.getPosts(),this.getUsers()]);return t.forEach((t=>{const n=e.find((e=>e.id===t.userId));n&&(t.userObj={name:n.name,username:n.username,email:n.email})})),t}constructor(){super("https://jsonplaceholder.typicode.com")}};[{name:"posts",method:o.getPosts.bind(o)},{name:"post-by-id",method:o.getPostById.bind(o,3)},{name:"comments",method:o.getComments.bind(o)},{name:"comments-for-post-by-id",method:o.getCommentsForPostWithId.bind(o,3)},{name:"albums",method:o.getAlbums.bind(o)},{name:"photos",method:o.getPhotos.bind(o)},{name:"todos",method:o.getTodos.bind(o)},{name:"users",method:o.getUsers.bind(o)},{name:"posts-with-users",method:o.getPostsWithUsers.bind(o)}].forEach((t=>{const e=document.querySelector(`#fetch-${t.name}`),n=document.querySelector(`#fetch-${t.name}-output`);e.addEventListener("click",(e=>{n.innerText="Fetching data...",t.method().then((t=>{const e=JSON.stringify(t,null,4);n.innerHTML=e})).catch((t=>{n.innerHTML=t}))}))})),document.querySelectorAll(".btn-collapse").forEach((t=>{t.addEventListener("click",(function(t){const e=this.nextElementSibling.firstElementChild;"none"===e.style.display?e.style.display="block":e.style.display="none"}))}));
//# sourceMappingURL=index.72f3d951.js.map
