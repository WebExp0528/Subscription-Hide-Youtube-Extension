(()=>{var r={228:r=>{r.exports=function(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}},646:(r,e,t)=>{var n=t(228);r.exports=function(r){if(Array.isArray(r))return n(r)}},860:r=>{r.exports=function(r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r))return Array.from(r)}},206:r=>{r.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},319:(r,e,t)=>{var n=t(646),o=t(860),i=t(379),a=t(206);r.exports=function(r){return n(r)||o(r)||i(r)||a()}},379:(r,e,t)=>{var n=t(228);r.exports=function(r,e){if(r){if("string"==typeof r)return n(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(r,e):void 0}}}},e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return r[n](o,o.exports,t),o.exports}t.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},t.d=(r,e)=>{for(var n in e)t.o(e,n)&&!t.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:e[n]})},t.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{"use strict";var r=t(319),e=t.n(r),n=function r(t){return new Promise((function(n){return t.createReader().readEntries((function(t){return Promise.all(t.filter((function(r){return"."!==r.name[0]})).map((function(e){return e.isDirectory?r(e):new Promise((function(r){return e.file(r)}))}))).then((function(r){var t;return(t=[]).concat.apply(t,e()(r))})).then(n)}))}))},o=function(r){return n(r).then((function(r){return r.map((function(r){return r.name+r.lastModifiedDate})).join()}))},i=function r(e,t){o(e).then((function(n){t&&t!==n?chrome.tabs.query({active:!0,currentWindow:!0},(function(r){r[0]&&chrome.tabs.reload(r[0].id),chrome.runtime.reload()})):setTimeout((function(){return r(e,n)}),1e3)}))};chrome&&chrome.management.getSelf((function(r){"development"===r.installType&&chrome.runtime.getPackageDirectoryEntry((function(r){return i(r)}))}))})()})();