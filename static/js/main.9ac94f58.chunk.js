(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{12:function(n,e,t){"use strict";t.d(e,"a",(function(){return r})),t.d(e,"f",(function(){return o})),t.d(e,"b",(function(){return a})),t.d(e,"e",(function(){return u})),t.d(e,"c",(function(){return i})),t.d(e,"d",(function(){return s}));var c="https://pokedex-ortiz.herokuapp.com/",r="".concat(c,"/pokemons"),o="name=",a="".concat(c,"/types"),u=12,i=1,s=404},17:function(n,e,t){n.exports={container:"NavBar_container__3eHrS",nav:"NavBar_nav__1FWUI",selected:"NavBar_selected__5ZUgm"}},18:function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return s})),t.d(e,"i",(function(){return l})),t.d(e,"h",(function(){return f})),t.d(e,"e",(function(){return d})),t.d(e,"g",(function(){return p})),t.d(e,"a",(function(){return O})),t.d(e,"d",(function(){return h})),t.d(e,"f",(function(){return m}));var c=t(4),r=t(12),o=t(16),a=t.n(o),u=r.c;function i(){return function(n){a.a.get("".concat(r.a,"?limit=").concat(r.e,"&page=").concat(u++)).then((function(e){var t=e.data;return n({type:c.f,payload:t}),n({type:c.e,payload:t.length===r.e})})).catch((function(e){return e.response&&e.response.status===r.d?console.log("NO MORE POKEMONS :("):console.error(e),n({type:c.e,payload:!1})}))}}function s(){return function(n){a.a.get("".concat(r.b)).then((function(e){return n({type:c.g,payload:e.data})})).catch((function(n){console.error(n)}))}}function l(n){return function(e){a.a.get("".concat(r.a,"?").concat(r.f).concat(n)).then((function(n){return e({type:c.a,payload:n.data})})).catch((function(n){return e({type:c.a,payload:null})}))}}function f(n){return a.a.get("".concat(r.a,"/").concat(n))}function d(n){return function(e){a.a.post("".concat(r.a),n).then((function(n){return e({type:c.b,payload:n.data})})).catch((function(n){return e({type:c.c,payload:n.response})}))}}function p(){return function(n){return n({type:c.j})}}function O(n,e,t){return function(r){var o;if(n.length)o=e?function(n,e,t){return t.filter((function(t){var c=t.id.length>10?"DB":"API";return t.types.filter((function(e){return n.includes(e.name)})).length===n.length&&c===e}))}(n,e,t):function(n,e){return e.filter((function(e){return e.types.filter((function(e){return n.includes(e.name)})).length===n.length}))}(n,t);else{if(!e)return r({type:c.i,payload:null});o=function(n,e){return e.filter((function(e){return(e.id.length>10?"DB":"API")===n}))}(e,t)}r({type:c.d,payload:o})}}var j="name",b="attack";function h(n,e,t,r){return function(o){var a=t.slice();return a=n&&e?r?g(a,j,b,n,e):g(a,b,j,e,n):n?v(a,j,n):v(a,b,e),o({type:c.h,payload:a})}}function m(){return function(n){return n({type:c.i,payload:null})}}function _(n,e){return"string"===typeof n?"ASC"===e?function(n,e){return n.localeCompare(e)}:function(n,e){return e.localeCompare(n)}:"ASC"===e?function(n,e){return n-e}:function(n,e){return e-n}}function g(n,e,t,c,r){var o=_(n[0][e],c),a=_(n[0][t],r);return n.sort((function(n,c){return n[e]===c[e]?a(n[t],c[t]):o(n[e],c[e])}))}function v(n,e,t){var c=_(n[0][e],t);return n.sort((function(n,t){return c(n[e],t[e])}))}},21:function(n,e,t){n.exports={container:"Header_container__1VC87",logo:"Header_logo__3_SJs",logoContainer:"Header_logoContainer__gaEZM"}},22:function(n,e,t){n.exports={searchForm:"SearchBar_searchForm__bTf69",searchInput:"SearchBar_searchInput__9M243",searchIcon:"SearchBar_searchIcon__RP80o"}},4:function(n,e,t){"use strict";t.d(e,"e",(function(){return c})),t.d(e,"f",(function(){return r})),t.d(e,"g",(function(){return o})),t.d(e,"d",(function(){return a})),t.d(e,"h",(function(){return u})),t.d(e,"i",(function(){return i})),t.d(e,"a",(function(){return s})),t.d(e,"b",(function(){return l})),t.d(e,"c",(function(){return f})),t.d(e,"j",(function(){return d}));var c="LOAD_MORE_POKEMONS",r="LOAD_POKEMONS",o="LOAD_TYPES",a="FILTER_BY",u="ORDER_BY",i="REMOVE_FILTER",s="ADD_SEARCHED_NAME",l="CREATED_POKEMON",f="ERROR_CREATED_POKEMON",d="RESET_CREATED_POKEMON"},53:function(n,e,t){},54:function(n,e,t){},84:function(n,e,t){"use strict";t.r(e);var c=t(1),r=t(20),o=t.n(r),a=(t(53),t(54),t(14)),u=t(6),i=t(18),s=t(13),l=t(21),f=t.n(l),d=t(30),p=t(22),O=t.n(p),j=t(31),b=t(2),h=function(){var n=Object(c.useState)(""),e=Object(d.a)(n,2),t=e[0],r=e[1],o=Object(u.f)(),s=Object(a.c)();return Object(b.jsxs)("form",{onSubmit:function(n){n.preventDefault(),s(Object(i.i)(t)),o.push("/pokemon/search")},className:O.a.searchForm,children:[Object(b.jsx)("input",{className:O.a.searchInput,onChange:function(n){r(n.target.value)},placeholder:"buscar",type:"search",name:"search",pattern:".*\\S.*",required:!0}),Object(b.jsx)("span",{className:"".concat(O.a.searchIcon),children:Object(b.jsx)(j.f,{})})]})},m=t(17),_=t.n(m),g=function(){return Object(b.jsxs)("div",{className:_.a.container,children:[Object(b.jsx)(s.c,{exact:!0,to:"/home",className:_.a.nav,activeClassName:_.a.selected,children:" inicio "}),Object(b.jsx)(s.c,{exact:!0,to:"/pokemon/create",className:_.a.nav,activeClassName:_.a.selected,children:"  crear pokemon "})]})},v=function(){return Object(b.jsxs)("div",{className:f.a.container,children:[Object(b.jsx)("div",{className:f.a.logoContainer,children:Object(b.jsx)(s.b,{to:"/home",children:Object(b.jsx)("img",{className:f.a.logo,src:"./pokemon-logo.png",alt:"Logo - Pokedex website"})})}),Object(b.jsx)(g,{}),Object(b.jsx)(h,{})]})},E=t(5),k=t(29),y=t.n(k),P=t(47),x=t(42),N=t(43),S=t(45),D=t(44),C=function(n){return function(e){Object(S.a)(c,e);var t=Object(D.a)(c);function c(n){var e;return Object(x.a)(this,c),(e=t.call(this,n)).state={component:null},e}return Object(N.a)(c,[{key:"componentDidMount",value:function(){var e=Object(P.a)(y.a.mark((function e(){var t,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:t=e.sent,c=t.default,this.setState({component:c});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var n=this.state.component;return n?Object(b.jsx)(n,Object(E.a)({},this.props)):null}}]),c}(c.Component)},M={LANDING:{path:"/",component:C((function(){return t.e(5).then(t.bind(null,95))}))},HOME:{path:"/home",component:C((function(){return t.e(4).then(t.bind(null,99))}))},POKEMONFACTORY:{path:"/pokemon/create",component:C((function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,96))}))},POKEMONID:{path:"/pokemon/:id",component:C((function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,97))}))}};function R(n){var e=n.path,t=n.component;return Object(b.jsx)(u.a,{exact:!0,path:e,component:t},e)}var I=function(){var n=Object(a.c)(),e=Object(a.d)((function(n){return n.loadMorePokemons})),t=Object(u.g)();return Object(c.useEffect)((function(){e&&n(Object(i.b)())}),[n,e]),Object(c.useEffect)((function(){n(Object(i.c)())}),[n]),console.log(t),Object(b.jsxs)("div",{id:"App",children:["/"!==t.pathname?Object(b.jsx)(v,{}):null,Object(b.jsx)(u.c,{children:Object.values(M).map(R)})]})},A=function(n){n&&n instanceof Function&&t.e(8).then(t.bind(null,98)).then((function(e){var t=e.getCLS,c=e.getFID,r=e.getFCP,o=e.getLCP,a=e.getTTFB;t(n),c(n),r(n),o(n),a(n)}))},T=t(23),B=t(4),F={pokemons:[],loadMorePokemons:!0,types:[],filteredPokemons:[],filter:!1,searchedPokemon:null,createdPokemon:void 0},L=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0,t=e.type,c=e.payload;switch(t){case B.g:return Object(E.a)(Object(E.a)({},n),{},{types:c});case B.f:return Object(E.a)(Object(E.a)({},n),{},{pokemons:n.pokemons.concat(c),loadMorePokemons:!1});case B.e:return Object(E.a)(Object(E.a)({},n),{},{loadMorePokemons:c});case B.d:return Object(E.a)(Object(E.a)({},n),{},{filteredPokemons:c,filter:!0});case B.i:return Object(E.a)(Object(E.a)({},n),{},{filteredPokemons:[],filter:!1});case B.h:return Object(E.a)(Object(E.a)({},n),{},{filteredPokemons:c,filter:!0});case B.a:return c?n.pokemons.filter((function(n){return n.id===c.id})).length?Object(E.a)(Object(E.a)({},n),{},{searchedPokemon:c}):Object(E.a)(Object(E.a)({},n),{},{searchedPokemon:c,pokemons:n.pokemons.concat(c)}):Object(E.a)(Object(E.a)({},n),{},{searchedPokemon:null});case B.b:return Object(E.a)(Object(E.a)({},n),{},{pokemons:[c].concat(n.pokemons),createdPokemon:c});case B.c:return Object(E.a)(Object(E.a)({},n),{},{createdPokemon:c});case B.j:return Object(E.a)(Object(E.a)({},n),{},{createdPokemon:null});default:return n}},w=t(48),K=Object(T.c)(L,Object(T.b)(Object(T.a)(w.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));o.a.render(Object(b.jsx)(a.a,{store:K,children:Object(b.jsx)(s.a,{children:Object(b.jsx)(I,{})})}),document.getElementById("root")),A()}},[[84,2,3]]]);
//# sourceMappingURL=main.9ac94f58.chunk.js.map