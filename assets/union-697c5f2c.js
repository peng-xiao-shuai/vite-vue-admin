import{bK as a,bL as g,aA as w,aB as I,an as x,aD as A,aC as S}from"./index-b02eb4b8.js";function d(){}function N(n,e,t,s){for(var i=n.length,u=t+(s?1:-1);s?u--:++u<i;)if(e(n[u],u,n))return u;return-1}function v(n){return n!==n}function C(n,e,t){for(var s=t-1,i=n.length;++s<i;)if(n[s]===e)return s;return-1}function F(n,e,t){return e===e?C(n,e,t):N(n,v,t)}function L(n,e){var t=n==null?0:n.length;return!!t&&F(n,e,0)>-1}function O(n,e,t){for(var s=-1,i=n==null?0:n.length;++s<i;)if(t(e,n[s]))return!0;return!1}var R=1/0,E=a&&1/g(new a([,-0]))[1]==R?function(n){return new a(n)}:d;const T=E;var Y=200;function _(n,e,t){var s=-1,i=L,u=n.length,c=!0,l=[],r=l;if(t)c=!1,i=O;else if(u>=Y){var o=e?null:T(n);if(o)return g(o);c=!1,i=I,r=new w}else r=e?[]:l;n:for(;++s<u;){var f=n[s],h=e?e(f):f;if(f=t||f!==0?f:0,c&&h===h){for(var b=r.length;b--;)if(r[b]===h)continue n;e&&r.push(h),l.push(f)}else i(r,h,t)||(r!==l&&r.push(h),l.push(f))}return l}var $=x(function(n){return _(A(n,1,S,!0))});const k=$;export{L as a,O as b,_ as c,k as u};
