import{r as c}from"./index-DJO9vBfz.js";var i={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l=c,y=Symbol.for("react.element"),O=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,b=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function _(t,r,o){var e,n={},p=null,u=null;o!==void 0&&(p=""+o),r.key!==void 0&&(p=""+r.key),r.ref!==void 0&&(u=r.ref);for(e in r)m.call(r,e)&&!v.hasOwnProperty(e)&&(n[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)n[e]===void 0&&(n[e]=r[e]);return{$$typeof:y,type:t,key:p,ref:u,props:n,_owner:b.current}}s.Fragment=O;s.jsx=_;s.jsxs=_;i.exports=s;var d=i.exports;function f(t,r){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,e){return o.__proto__=e,o},f(t,r)}function j(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,f(t,r)}function a(){return a=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var e in o)({}).hasOwnProperty.call(o,e)&&(t[e]=o[e])}return t},a.apply(null,arguments)}export{a as _,j as a,f as b,d as j};
