/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,i,e,s){for(var o,r=arguments.length,n=r<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s,h=t.length-1;h>=0;h--)(o=t[h])&&(n=(r<3?o(n):r>3?o(i,e,n):o(i,e))||n);return r>3&&n&&Object.defineProperty(i,e,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const i=globalThis,e=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class r{constructor(t,i,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new r(e,t,s)},h=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,b=(t,i)=>t,y={toAttribute(t,i){switch(i){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},w=(t,i)=>!a(t,i),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=$){if(i.state&&(i.attribute=!1),this._$Ei(),this.elementProperties.set(t,i),!i.noAccessor){const e=Symbol(),s=this.getPropertyDescriptor(t,e,i);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get(){return s?.call(this)},set(i){const r=s?.call(this);o.call(this,i),this.requestUpdate(t,r,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,i=[...d(t),...u(t)];for(const e of i)this.createProperty(e,t[e])}const t=this[Symbol.metadata];if(null!==t){const i=litPropertyMetadata.get(t);if(void 0!==i)for(const[t,e]of i)this.elementProperties.set(t,e)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(h(t))}else void 0!==t&&i.push(h(t));return i}static _$Eu(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const e of i.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(e)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=i.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$EO(t,i){const e=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,e);if(void 0!==s&&!0===e.reflect){const o=(void 0!==e.converter?.toAttribute?e.converter:y).toAttribute(i,e.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,i){const e=this.constructor,s=e._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=e.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s,this[s]=o.fromAttribute(i,t.type),this._$Em=null}}requestUpdate(t,i,e,s=!1,o){if(void 0!==t){if(e??=this.constructor.getPropertyOptions(t),!(e.hasChanged??w)(s?o:this[t],i))return;this.C(t,i,e)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,i,e){this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[i,e]of t)!0!==e.wrapped||this._$AL.has(i)||void 0===this[i]||this.C(i,this[i],e)}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(i)):this._$ET()}catch(i){throw t=!1,this._$ET(),i}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S=globalThis,k=S.trustedTypes,_=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",C=`lit$${(Math.random()+"").slice(9)}$`,A="?"+C,E=`<${A}>`,M=document,z=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,O="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,B=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,L=/^(?:script|style|textarea|title)$/i,D=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),F=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),Y=new WeakMap,V=M.createTreeWalker(M,129);function W(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(i):i}const G=(t,i)=>{const e=t.length-1,s=[];let o,r=2===i?"<svg>":"",n=j;for(let i=0;i<e;i++){const e=t[i];let h,a,c=-1,l=0;for(;l<e.length&&(n.lastIndex=l,a=n.exec(e),null!==a);)l=n.lastIndex,n===j?"!--"===a[1]?n=N:void 0!==a[1]?n=B:void 0!==a[2]?(L.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=I):void 0!==a[3]&&(n=I):n===I?">"===a[0]?(n=o??j,c=-1):void 0===a[1]?c=-2:(c=n.lastIndex-a[2].length,h=a[1],n=void 0===a[3]?I:'"'===a[3]?H:R):n===H||n===R?n=I:n===N||n===B?n=j:(n=I,o=void 0);const d=n===I&&t[i+1].startsWith("/>")?" ":"";r+=n===j?e+E:c>=0?(s.push(h),e.slice(0,c)+T+e.slice(c)+C+d):e+C+(-2===c?i:d)}return[W(t,r+(t[e]||"<?>")+(2===i?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let o=0,r=0;const n=t.length-1,h=this.parts,[a,c]=G(t,i);if(this.el=J.createElement(a,e),V.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&h.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const i=c[r++],e=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(i);h.push({type:1,index:o,name:n[2],strings:e,ctor:"."===n[1]?tt:"?"===n[1]?it:"@"===n[1]?et:X}),s.removeAttribute(t)}else t.startsWith(C)&&(h.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),i=t.length-1;if(i>0){s.textContent=k?k.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],z()),V.nextNode(),h.push({type:2,index:++o});s.append(t[i],z())}}}else if(8===s.nodeType)if(s.data===A)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)h.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,i){const e=M.createElement("template");return e.innerHTML=t,e}}function Z(t,i,e=t,s){if(i===F)return i;let o=void 0!==s?e._$Co?.[s]:e._$Cl;const r=U(i)?void 0:i._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,e,s)),void 0!==s?(e._$Co??=[])[s]=o:e._$Cl=o),void 0!==o&&(i=Z(t,o._$AS(t,i.values),o,s)),i}class q{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:e}=this._$AD,s=(t?.creationScope??M).importNode(i,!0);V.currentNode=s;let o=V.nextNode(),r=0,n=0,h=e[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new K(o,o.nextSibling,this,t):1===h.type?i=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(i=new st(o,this,t)),this._$AV.push(i),h=e[++n]}r!==h?.index&&(o=V.nextNode(),r++)}return V.currentNode=M,s}p(t){let i=0;for(const e of this._$AV)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,e,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Z(this,t,i),U(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.$(M.createTextNode(t)),this._$AH=t}g(t){const{values:i,_$litType$:e}=t,s="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=J.createElement(W(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(i);else{const t=new q(s,this),e=t.u(this.options);t.p(i),this.$(e),this._$AH=t}}_$AC(t){let i=Y.get(t.strings);return void 0===i&&Y.set(t.strings,i=new J(t)),i}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const o of t)s===i.length?i.push(e=new K(this.k(z()),this.k(z()),this,this.options)):e=i[s],e._$AI(o),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,e,s,o){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=Q}_$AI(t,i=this,e,s){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,i,0),r=!U(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=Z(this,s[e+n],i,n),h===F&&(h=this._$AH[n]),r||=!U(h)||h!==this._$AH[n],h===Q?t=Q:t!==Q&&(t+=(h??"")+o[n+1]),this._$AH[n]=h}r&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class it extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class et extends X{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}_$AI(t,i=this){if((t=Z(this,t,i,0)??Q)===F)return;const e=this._$AH,s=t===Q&&e!==Q||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,o=t!==Q&&(e===Q||s);s&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=S.litHtmlPolyfillSupport;ot?.(J,K),(S.litHtmlVersions??=[]).push("3.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class rt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,e)=>{const s=e?.renderBefore??i;let o=s._$litPart$;if(void 0===o){const t=e?.renderBefore??null;s._$litPart$=o=new K(i.insertBefore(z(),t),t,void 0,e??{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const nt=globalThis.litElementPolyfillSupport;nt?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(i,e)=>{void 0!==e?e.addInitializer((()=>{customElements.define(t,i)})):customElements.define(t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,at={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},ct=(t=at,i,e)=>{const{kind:s,metadata:o}=e;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(e.name,t),"accessor"===s){const{name:s}=e;return{set(e){const o=i.get.call(this);i.set.call(this,e),this.requestUpdate(s,o,t)},init(i){return void 0!==i&&this.C(s,void 0,t),i}}}if("setter"===s){const{name:s}=e;return function(e){const o=this[s];i.call(this,e),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function lt(t){return(i,e)=>"object"==typeof e?ct(t,i,e):((t,i,e)=>{const s=i.hasOwnProperty(e);return i.constructor.createProperty(e,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(i,e):void 0})(t,i,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return lt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=(t,i,e)=>(e.configurable=!0,e.enumerable=!0,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const pt={dataApi:"https://verify.numbersprotocol.io/api/1.1/wf/captureEyeData",ipfsGateway:"https://ipfs-pin.numbersprotocol.io/ipfs",explorer:"https://mainnet.num.network",profile:"https://verify.numbersprotocol.io/asset-profile",collect:"https://captureappiframe.numbersprotocol.io/checkout",captureEyeIcon:"https://static-cdn.numbersprotocol.io/capture-eye-blue-32x32.png",closeIcon:"https://c.animaapp.com/twFYQx58/img/close@2x.png",contentCopyIcon:"https://c.animaapp.com/twFYQx58/img/content-copy@2x.png",helpIcon:"https://c.animaapp.com/twFYQx58/img/help-2@2x.png",previewIcon:"https://c.animaapp.com/twFYQx58/img/placeholder-image.png"},mt={not_available:"N/A",loading:"Loading..."},ft={original:"original",curated:"curated"};class vt{constructor(){this.modalElement=null,this.currentButtonElement=null}get isHidden(){return!this.modalElement||this.modalElement.modalHidden}get nid(){return this?.modalElement?.nid??""}static getInstance(){return vt.instance||(vt.instance=new vt),vt.instance}initializeModal(){this.modalElement||(this.modalElement=document.createElement("capture-eye-modal"),document.body.appendChild(this.modalElement))}updateModal(t,i,e,s=!0){if(this.modalElement){if(this.currentButtonElement===e)return void this.hideModal();this.currentButtonElement&&this.currentButtonElement!==e&&(this.unfocusCurrentButton(),this.removeModal()),this.currentButtonElement=e,s&&(this.positionModal(),this.modalElement.modalHidden=!1,this.setFocus(!0)),this.modalElement.nid!==t&&(this.modalElement.nid=t,this.modalElement.layout=i,this.modalElement.resetModalProps(),this.fetchAssetData(t).then((t=>this.updateModalProperties(t))))}}hideModal(){this.modalElement&&(this.modalElement.modalHidden=!0,this.setFocus(!1),this.currentButtonElement=null)}positionModal(){if(this.modalElement&&this.currentButtonElement){const t=this.currentButtonElement.getBoundingClientRect();this.modalElement.parentElement&&this.modalElement.parentElement.removeChild(this.modalElement),this.currentButtonElement.parentElement?.appendChild(this.modalElement);const i=this.currentButtonElement.parentElement?.getBoundingClientRect()||{top:0,left:0};this.modalElement.style.position="absolute",this.modalElement.style.top=t.top-i.top+"px",this.modalElement.style.left=t.left-i.left+"px"}}setFocus(t){this.modalElement&&this.currentButtonElement&&(t?(this.currentButtonElement.style.zIndex="10001",this.modalElement.style.zIndex="10000"):(this.currentButtonElement.style.zIndex="1000",this.modalElement.style.zIndex="1000"))}unfocusCurrentButton(){this.currentButtonElement&&(this.currentButtonElement.style.zIndex="1000")}removeModal(){this.modalElement&&this.modalElement.parentElement&&this.modalElement.parentElement.removeChild(this.modalElement)}async fetchAssetData(t){const i={"Content-Type":"application/json"};try{const e=await fetch(`${pt.dataApi}?nid=${t}`,{method:"GET",headers:i});if(!e.ok){const t=await e.json();return void console.error(`Error ${e.status}: ${t.message}`)}const{response:{data:s}}=await e.json();if(console.debug(s),!s)return;const o=s.fullAssetTree||{},{"_api_c2_assetTree.assetCreator":r="","_api_c2_assetTree.assetTimestampCreatedReadable":n="","_api_c2_assetTree.abstract":h="","_api_c2_assetTree.assetSourceType":a="","_api_c2_assetTree.usedBy":c=""}=o,l={assetCreator:r,assetTimestamp:n,assetAbstract:h,assetInitialTransaction:s.initial_transaction??"",assetThumbnailUrl:s.thumnail_url??"",explorerUrl:s.initial_transaction?`${pt.explorer}/tx/${s.initial_transaction}`:"",assetSourceType:a,assetCaptureTime:s.integrity_capture_time??"",assetBackendOwnerName:s.backend_owner_name??"",assetUsedBy:c};return console.debug(l),l}catch(t){return void console.error("Fetch error:",t)}}updateModalProperties(t){this.modalElement&&t&&(this.modalElement.creatorName=t.assetCreator,this.modalElement.date=t.assetTimestamp,this.modalElement.abstract=t.assetAbstract,this.modalElement.blockchain="Numbers Mainnet",this.modalElement.transaction=t.assetInitialTransaction,this.modalElement.thumbnailUrl=t.assetThumbnailUrl,this.modalElement.explorerUrl=t.explorerUrl,this.modalElement.assetSourceType=t.assetSourceType,this.modalElement.captureTime=t.assetCaptureTime,this.modalElement.backendOwnerName=t.assetBackendOwnerName,this.modalElement.usedBy=t.assetUsedBy,this.modalElement.bannerImageSrc="https://static-cdn.numbersprotocol.io/collab/defiance_media_banner.webp",this.modalElement.bannerLink="https://defiance.media/")}}function gt(t){if(t.length<8)return"";return`${t.slice(0,4)}...${t.slice(-4)}`}let bt=class extends rt{constructor(){super(),this.nid="",this.layout=ft.original,this.modalHidden=!0,this.creatorName=mt.loading,this.date=mt.loading,this.abstract=mt.loading,this.blockchain=mt.loading,this.transaction=mt.loading,this.thumbnailUrl="",this.explorerUrl="",this.assetSourceType=mt.loading,this.captureTime=mt.loading,this.backendOwnerName=mt.loading,this.usedBy=mt.loading,this.bannerImageSrc="",this.bannerLink="",this.imageLoaded=!1}resetModalProps(){this.creatorName=mt.loading,this.date=mt.loading,this.abstract=mt.loading,this.blockchain=mt.loading,this.transaction=mt.loading,this.thumbnailUrl="",this.explorerUrl="",this.bannerImageSrc="",this.bannerLink="",this.imageLoaded=!1}firstUpdated(){this.updateModalVisibility()}updated(t){t.has("modalHidden")&&this.updateModalVisibility()}updateModalVisibility(){const t=this.shadowRoot?.querySelector(".modal");t&&(this.modalHidden?(t.classList.add("modal-hidden"),t.classList.remove("modal-visible")):(t.classList.remove("modal-hidden"),t.classList.add("modal-visible")))}isOriginal(){return this.layout==ft.original}renderTop(){const t=this.thumbnailUrl?this.thumbnailUrl:"https://via.placeholder.com/100",i=this.isOriginal()?this.creatorName:this.assetSourceType,e=this.isOriginal()?this.date:this.captureTime;return D`
      <div class="section-title">Produced by</div>
      <div class="profile-container">
        ${this.thumbnailUrl?D`<img src=${t} alt="Profile" class="profile-img" />`:D`<div class="shimmer-profile-img"></div>`}
        <div class="profile-text">
          <div class="top-name">
            ${i!==mt.loading?i:D`<div class="shimmer-text"></div>`}
          </div>
          <div class="top-date">
            ${e!==mt.loading?e:D`<div class="shimmer-text"></div>`}
          </div>
        </div>
      </div>
      <div class="abstract">
        ${this.abstract!==mt.loading?this.abstract:D`<div class="shimmer-text"></div>`}
      </div>
      <hr class="thin-hr" />
    `}renderMiddle(){const t=gt(this.transaction);return D`
      <div class="section-title">
        ${this.isOriginal()?"Origins":"Curated By"}
      </div>
      ${this.isOriginal()?D`<p>
              ${this.blockchain!==mt.loading?`Blockchain: ${this.blockchain}`:D`<div class="shimmer-text"></div>`}
            </p>
            <span>Transaction:</span>
            ${t?D`<a href=${this.explorerUrl} target="_blank"
                  >${gt(this.transaction)}</a
                >`:D`<span
                  >${this.transaction!==mt.loading?"N/A":D`<div class="shimmer-text"></div>`}</span
                >`}`:D`<p>
            ${this.backendOwnerName!==mt.loading?this.backendOwnerName:D`<div class="shimmer-text"></div>`}
          </p>`}
      <hr class="thin-hr" />
    `}renderBottom(){const t=this.isOriginal()?`${pt.profile}/${this.nid}`:this.usedBy;return D`
      <a href=${t} target="_blank"
        ><button class="view-more-btn">View More</button></a
      >
      <div class="powered-by">
        ${this.usedBy!==mt.loading?"Powered by Numbers Protocol":D`<div class="shimmer-text"></div>`}
      </div>
    `}handleImageLoad(){this.imageLoaded=!0}render(){return D`
      <div class="modal ${this.modalHidden?"modal-hidden":"modal-visible"}">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
            </div>
          </div>
          ${this.bannerLink&&this.bannerImageSrc?D`<a href=${this.bannerLink} target="_blank">
                <img
                  src=${this.bannerImageSrc}
                  alt="Full width"
                  class="full-width-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this.imageLoaded?"block":"none"}"
                />
                ${this.imageLoaded?"":D`<div class="shimmer full-width-img"></div>`}
              </a>`:D`<div class="shimmer full-width-img"></div>`}
        </div>
      </div>
    `}};bt.styles=n`
    :host {
      --background-color: #fff;
      --primary-color: #486cd9;
      --hover-color: #6ebff2;
      --text-color: #333;
      --secondary-text-color: #888;
      --border-radius: 1rem;
      --box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      --font-family: 'Degular-Thin', Helvetica;
      --font-size: 1rem;
      --font-size-small: 0.875rem;
      --padding: 1rem;
    }

    :host {
      font-family: var(--font-family);
    }

    .modal {
      z-index: 1000;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .modal-visible {
      opacity: 1;
    }

    .modal-container {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      width: 20rem;
      box-shadow: var(--box-shadow);
      position: relative;
    }

    .modal-hidden {
      display: none;
    }

    .modal-content {
      margin-top: var(--padding);
      padding: var(--padding);
    }

    hr.thin-hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }

    .section-title {
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .profile-container {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .profile-img {
      border-radius: 0.5rem;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
    }

    .profile-text {
      display: flex;
      flex-direction: column;
    }

    .top-name {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .top-date {
      color: var(--secondary-text-color);
    }

    .abstract {
      color: var(--secondary-text-color);
      margin-bottom: 1rem;
    }

    .origins p {
      margin: 0;
      font-size: var(--font-size-small);
      color: var(--secondary-text-color);
    }

    .view-more-btn {
      display: inline-block;
      background-color: var(--primary-color);
      width: 100%;
      color: var(--background-color);
      font-size: var(--font-size-small);
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.5rem 2rem;
      border-radius: 100vw;
      text-align: center;
      transition: background-color 0.3s ease;
      border: none;
      cursor: pointer;
      margin-top: 1rem;
    }

    .view-more-btn:hover {
      background-color: var(--hover-color);
    }

    .powered-by {
      text-align: right;
      color: var(--secondary-text-color);
      font-size: var(--font-size-small);
      margin-top: 0.5rem;
    }

    .full-width-img {
      width: 100%;
      display: block;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }

    /* Shimmer effect */
    .shimmer {
      display: inline-block;
      height: 200px;
      width: 100%;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
    }

    .shimmer-text {
      display: inline-block;
      height: 1rem;
      width: 100%;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
    }

    .shimmer-profile-img {
      display: inline-block;
      background: linear-gradient(
        to right,
        #eeeeee 0%,
        #dddddd 20%,
        #eeeeee 40%,
        #eeeeee 100%
      );
      background-size: 200% auto;
      animation: shimmer 1.5s infinite linear;
      border-radius: 0.5rem;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `,t([lt({type:String})],bt.prototype,"nid",void 0),t([lt({type:String})],bt.prototype,"layout",void 0),t([lt({type:Boolean})],bt.prototype,"modalHidden",void 0),t([dt()],bt.prototype,"creatorName",void 0),t([dt()],bt.prototype,"date",void 0),t([dt()],bt.prototype,"abstract",void 0),t([dt()],bt.prototype,"blockchain",void 0),t([dt()],bt.prototype,"transaction",void 0),t([dt()],bt.prototype,"thumbnailUrl",void 0),t([dt()],bt.prototype,"explorerUrl",void 0),t([dt()],bt.prototype,"assetSourceType",void 0),t([dt()],bt.prototype,"captureTime",void 0),t([dt()],bt.prototype,"backendOwnerName",void 0),t([dt()],bt.prototype,"usedBy",void 0),t([dt()],bt.prototype,"bannerImageSrc",void 0),t([dt()],bt.prototype,"bannerLink",void 0),t([dt()],bt.prototype,"imageLoaded",void 0),t([function(t,i){return(e,s,o)=>{const r=i=>i.renderRoot?.querySelector(t)??null;if(i){const{get:t,set:n}="object"==typeof s?e:o??(()=>{const t=Symbol();return{get(){return this[t]},set(i){this[t]=i}}})();return ut(0,0,{get(){if(i){let i=t.call(this);return void 0===i&&(i=r(this),n.call(this,i)),i}return r(this)}})}return ut(0,0,{get(){return r(this)}})}}(".modal")],bt.prototype,"modalElement",void 0),bt=t([ht("capture-eye-modal")],bt);let yt=class extends rt{get assetUrl(){return`${pt.ipfsGateway}/${this.nid}`}get assetProfileUrl(){return`${pt.profile}${this.nid}`}constructor(){super(),this.prefetch=!1,this.nid="",this.layout=ft.original;const t=document.createElement("link");t.href="https://static-cdn.numbersprotocol.io/fonts/degular.css",t.rel="stylesheet",document.head.appendChild(t)}buttonTemplate(){return D`
      <div class="capture-eye-button" @click=${this.showModal}>
        <img src=${pt.captureEyeIcon} alt="Capture Eye" />
      </div>
    `}render(){return D`
      <div class="capture-eye-container">
        <slot
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        ></slot>
        ${this.buttonTemplate()}
      </div>
    `}async connectedCallback(){super.connectedCallback(),vt.getInstance().initializeModal(),this.prefetch&&customElements.whenDefined("capture-eye-modal").then((()=>{vt.getInstance().updateModal(this.nid,this.layout,this.getButtonElement(),!1)}))}async showModal(){const t=vt.getInstance(),i=this.getButtonElement();t.updateModal(this.nid,this.layout,i),this.setButtonActive(!0),console.debug(bt.name)}getButtonElement(){return this.shadowRoot?.querySelector(".capture-eye-button")}handleMouseEnter(){this.setButtonActive(!0)}handleMouseLeave(){const t=vt.getInstance();(t.isHidden||t.nid!==this.nid)&&this.setButtonActive(!1)}setButtonActive(t){const i=this.getButtonElement();i&&(t?i.classList.add("active"):i.classList.remove("active"))}};yt.styles=n`
    :host {
      font-family: 'Degular-Medium', Helvetica;
    }

    .capture-eye-container {
      position: relative;
    }

    .capture-eye-button {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
      display: none; /* Hidden by default */
    }
    .capture-eye-button:hover {
      opacity: 1;
    }
    :host(:hover) .capture-eye-button,
    .capture-eye-button.active {
      display: flex; /* Show button on hover or when active */
    }

    @media (min-width: 401px) {
      .capture-eye-button:hover::before {
        max-width: 170px;
        /* Adjust to your desired maximum width */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        content: 'Click me!';
        position: absolute;
        left: 220%;
        /* Adjust as needed */
        transform: translateX(-50%);
        padding: 5px 10px;
        background-color: #fff;
        /* Background color of the popup */
        color: #333;
        /* Text color */
        opacity: 0.7;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1;
        /* To make sure it stays on top */
        pointer-events: none;
        /* Ensure it doesn't interfere with other interactions */
        font-family: 'Degular-Medium', Helvetica;
      }
    }

    .capture-eye-no-scroll {
      overflow: hidden;
    }
  `,t([lt({type:Boolean})],yt.prototype,"prefetch",void 0),t([lt({type:String})],yt.prototype,"nid",void 0),t([lt({type:String})],yt.prototype,"layout",void 0),yt=t([ht("capture-eye")],yt);export{yt as CaptureEye};
//# sourceMappingURL=capture-eye.bundled.js.map
