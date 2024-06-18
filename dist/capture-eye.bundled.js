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
function t(t,e,i,s){for(var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,v=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!h(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const r=s?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??w)(s?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S=globalThis,k=S.trustedTypes,_=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",T=`lit$${(Math.random()+"").slice(9)}$`,E="?"+T,z=`<${E}>`,A=document,M=()=>A.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,j="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,I=/>/g,B=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,R=/"/g,D=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),V=new WeakMap,W=A.createTreeWalker(A,129);function Y(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,h=n.exec(i),null!==h);)c=n.lastIndex,n===O?"!--"===h[1]?n=N:void 0!==h[1]?n=I:void 0!==h[2]?(D.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=B):void 0!==h[3]&&(n=B):n===B?">"===h[0]?(n=o??O,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?B:'"'===h[3]?R:H):n===R||n===H?n=B:n===N||n===I?n=O:(n=B,o=void 0);const d=n===B&&t[e+1].startsWith("/>")?" ":"";r+=n===O?i+z:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+T+d):i+T+(-2===l?e:d)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[h,l]=G(t,e);if(this.el=J.createElement(h,i),W.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=s.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(T),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),W.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===E)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(T,t+1));)a.push({type:7,index:o}),t+=T.length-1}o++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);W.currentNode=s;let o=W.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new K(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=W.nextNode(),r++)}return W.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new q(s,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.k(M()),this.k(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===Q?t=Q:t!==Q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class it extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??Q)===F)return;const i=this._$AH,s=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Q&&(i===Q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=S.litHtmlPolyfillSupport;ot?.(J,K),(S.litHtmlVersions??=[]).push("3.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class rt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new K(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const nt=globalThis.litElementPolyfillSupport;nt?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},lt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return ct({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const pt={dataApi:"https://verify.numbersprotocol.io/api/1.1/wf/captureEyeData",ipfsGateway:"https://ipfs-pin.numbersprotocol.io/ipfs",explorer:"https://mainnet.num.network",profile:"https://verify.numbersprotocol.io/asset-profile",collect:"https://captureappiframe.numbersprotocol.io/checkout",captureEyeIcon:"https://static-cdn.numbersprotocol.io/capture-eye-blue-32x32.png",closeIcon:"https://static-cdn.numbersprotocol.io/capture-eye-close-icon.png",contentCopyIcon:"https://c.animaapp.com/twFYQx58/img/content-copy@2x.png",helpIcon:"https://c.animaapp.com/twFYQx58/img/help-2@2x.png",previewIcon:"https://c.animaapp.com/twFYQx58/img/placeholder-image.png",fontFaceCssUrl:"https://static-cdn.numbersprotocol.io/fonts/degular.css"},mt={not_available:"N/A",loading:"Loading..."},ft={original:"original",curated:"curated"};class vt{constructor(){this.modalElement=null}get isHidden(){return!this.modalElement||this.modalElement.modalHidden}get nid(){return this?.modalElement?.nid??""}static getInstance(){return vt.instance||(vt.instance=new vt),vt.instance}initializeModal(){this.modalElement||(this.modalElement=document.createElement("capture-eye-modal"),document.body.appendChild(this.modalElement))}updateModal(t,e,i){this.modalElement&&(this.positionModal(i),this.modalElement.modalHidden=!1,this.modalElement.nid!==t&&(this.modalElement.nid=t,this.modalElement.layout=e,this.modalElement.resetModalProps(),this.fetchAssetData(t).then((t=>this.updateModalProperties(t)))))}positionModal(t){this.modalElement&&(this.modalElement.style.position="absolute",this.modalElement.style.top=`${t.top}px`,this.modalElement.style.left=`${t.left}px`,this.modalElement.style.transform="none")}hideModal(){this.modalElement&&(this.modalElement.modalHidden=!0)}async fetchAssetData(t){const e={"Content-Type":"application/json"};try{const i=await fetch(`${pt.dataApi}?nid=${t}`,{method:"GET",headers:e});if(!i.ok){const t=await i.json();return void console.error(`Error ${i.status}: ${t.message}`)}const{response:{data:s}}=await i.json();if(console.debug(s),!s)return;const o=s.fullAssetTree||{},{"_api_c2_assetTree.assetCreator":r="","_api_c2_assetTree.assetTimestampCreatedReadable":n="","_api_c2_assetTree.assetSourceType":a="","_api_c2_assetTree.usedBy":h=""}=o,l={assetCreator:r,assetTimestamp:n,assetHeadline:s.headline??"",assetInitialTransaction:s.initial_transaction??"",assetThumbnailUrl:s.thumnail_url??"",explorerUrl:s.initial_transaction?`${pt.explorer}/tx/${s.initial_transaction}`:"",assetSourceType:a,assetCaptureTime:s.integrity_capture_time??"",assetBackendOwnerName:s.backend_owner_name??"",assetUsedBy:h};return console.debug(l),l}catch(t){return void console.error("Fetch error:",t)}}updateModalProperties(t){this.modalElement&&t&&(this.modalElement.creatorName=t.assetCreator,this.modalElement.date=t.assetTimestamp,this.modalElement.headline=t.assetHeadline,this.modalElement.blockchain="Numbers Mainnet",this.modalElement.transaction=t.assetInitialTransaction,this.modalElement.thumbnailUrl=t.assetThumbnailUrl,this.modalElement.explorerUrl=t.explorerUrl,this.modalElement.assetSourceType=t.assetSourceType,this.modalElement.captureTime=t.assetCaptureTime,this.modalElement.backendOwnerName=t.assetBackendOwnerName,this.modalElement.usedBy=t.assetUsedBy,this.modalElement.bannerImageSrc="https://static-cdn.numbersprotocol.io/collab/defiance_media_banner.webp",this.modalElement.bannerLink="https://defiance.media/")}}function gt(t){if(t.length<8)return"";return`${t.slice(0,4)}...${t.slice(-4)}`}let bt=class extends rt{constructor(){super(),this.nid="",this.layout=ft.original,this.modalHidden=!0,this.creatorName=mt.loading,this.date=mt.loading,this.headline=mt.loading,this.blockchain=mt.loading,this.transaction=mt.loading,this.thumbnailUrl="",this.explorerUrl="",this.assetSourceType=mt.loading,this.captureTime=mt.loading,this.backendOwnerName=mt.loading,this.usedBy=mt.loading,this.bannerImageSrc="",this.bannerLink="",this.imageLoaded=!1}resetModalProps(){this.creatorName=mt.loading,this.date=mt.loading,this.headline=mt.loading,this.blockchain=mt.loading,this.transaction=mt.loading,this.thumbnailUrl="",this.explorerUrl="",this.bannerImageSrc="",this.bannerLink="",this.imageLoaded=!1}firstUpdated(){this.updateModalVisibility()}updated(t){t.has("modalHidden")&&this.updateModalVisibility()}updateModalVisibility(){const t=this.shadowRoot?.querySelector(".modal");t&&(this.modalHidden?(t.classList.add("modal-hidden"),t.classList.remove("modal-visible")):(t.classList.remove("modal-hidden"),t.classList.add("modal-visible")))}isOriginal(){return this.layout==ft.original}renderTop(){const t=this.thumbnailUrl?this.thumbnailUrl:"https://via.placeholder.com/100",e=this.isOriginal()?this.creatorName:this.assetSourceType,i=this.captureTime;return L`
      <div class="section-title">Produced by</div>
      <div class="profile-container">
        ${this.thumbnailUrl?L`<img src=${t} alt="Profile" class="profile-img" />`:L`<div class="shimmer-profile-img"></div>`}
        <div class="profile-text">
          <div class="top-name">
            ${e!==mt.loading?e:L`<div class="shimmer-text"></div>`}
          </div>
          <div class="top-date">
            ${i!==mt.loading?i:L`<div class="shimmer-text"></div>`}
          </div>
        </div>
      </div>
      <div class="headline">
        ${this.headline!==mt.loading?this.headline:L`<div class="shimmer-text"></div>`}
      </div>
      <hr class="thin-hr" />
    `}renderMiddle(){const t=gt(this.transaction);return L`
      <div class="section-title">
        ${this.isOriginal()?"Origins":"Curated By"}
      </div>
      ${this.isOriginal()?L`<p>
              ${this.blockchain!==mt.loading?`Blockchain: ${this.blockchain}`:L`<div class="shimmer-text"></div>`}
            </p>
            <span>Transaction:</span>
            ${t?L`<a href=${this.explorerUrl} target="_blank"
                  >${gt(this.transaction)}</a
                >`:L`<span
                  >${this.transaction!==mt.loading?"N/A":L`<div class="shimmer-text"></div>`}</span
                >`}`:L`<p>
            ${this.backendOwnerName!==mt.loading?this.backendOwnerName:L`<div class="shimmer-text"></div>`}
          </p>`}
      <hr class="thin-hr" />
    `}renderBottom(){const t=this.isOriginal()?`${pt.profile}/${this.nid}`:this.usedBy;return L`
      <a href=${t} target="_blank"
        ><button class="view-more-btn">View More</button></a
      >
      <div class="powered-by">
        ${this.usedBy!==mt.loading?"Powered by Numbers Protocol":L`<div class="shimmer-text"></div>`}
      </div>
    `}handleImageLoad(){this.imageLoaded=!0}render(){return L`
      <div class="modal ${this.modalHidden?"modal-hidden":"modal-visible"}">
        <div class="modal-container">
          <div class="modal-content">
            <div class="card">
              ${this.renderTop()} ${this.renderMiddle()} ${this.renderBottom()}
            </div>
          </div>
          ${this.bannerLink&&this.bannerImageSrc?L`<a href=${this.bannerLink} target="_blank">
                <img
                  src=${this.bannerImageSrc}
                  alt="Full width"
                  class="full-width-img"
                  @load=${this.handleImageLoad}
                  style="display: ${this.imageLoaded?"block":"none"}"
                />
                ${this.imageLoaded?"":L`<div class="shimmer full-width-img"></div>`}
              </a>`:L`<div class="shimmer full-width-img"></div>`}
          <div class="capture-eye-button-modal" @click=${this.hideModal}>
            <img src=${pt.closeIcon} alt="Close" />
          </div>
        </div>
      </div>
    `}hideModal(){this.modalHidden=!0}};bt.styles=n`
    :host {
      --background-color: #fff;
      --primary-color: #486cd9;
      --hover-color: #6ebff2;
      --text-color: #333;
      --secondary-text-color: #888;
      --border-radius: 1rem;
      --box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      --font-family: 'Degular-Semibold', Helvetica;
      --font-size: 1rem;
      --font-size-small: 0.875rem;
      --padding: 1rem;
    }

    :host {
      font-family: var(--font-family);
      font-size: var(--font-size);
      color: var(--text-color);
      letter-spacing: 0.05em;
    }

    .modal {
      z-index: 1000;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      position: absolute;
    }

    .modal-visible {
      opacity: 1;
    }

    .modal-container {
      background-color: var(--background-color);
      border-radius: var(--border-radius);
      width: 20rem;
      box-shadow: var(--box-shadow);
    }

    .modal-hidden {
      display: none;
    }

    .modal-content {
      margin-top: var(--padding);
      padding: var(--padding);
    }

    .capture-eye-button-modal {
      position: absolute;
      top: var(--button-top, 0); /* Use CSS variables to set the position */
      left: var(--button-left, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001; /* Ensure it is above the modal */
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 14;
    }

    hr.thin-hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }

    .section-title {
      color: var(--secondary-text-color);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding-top: 10px;
      padding-bottom: 5px;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 2;
      display: block;
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
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .top-date {
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      max-width: 100%;
      font-size: var(--font-size-small);
    }

    .headline {
      color: var(--secondary-text-color);
      margin-bottom: 1rem;
      font-family: 'Degular-Regular', Helvetica;
      font-weight: 400;
      font-size: var(--font-size-small);
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
  `,t([ct({type:String})],bt.prototype,"nid",void 0),t([ct({type:String})],bt.prototype,"layout",void 0),t([ct({type:Boolean})],bt.prototype,"modalHidden",void 0),t([dt()],bt.prototype,"creatorName",void 0),t([dt()],bt.prototype,"date",void 0),t([dt()],bt.prototype,"headline",void 0),t([dt()],bt.prototype,"blockchain",void 0),t([dt()],bt.prototype,"transaction",void 0),t([dt()],bt.prototype,"thumbnailUrl",void 0),t([dt()],bt.prototype,"explorerUrl",void 0),t([dt()],bt.prototype,"assetSourceType",void 0),t([dt()],bt.prototype,"captureTime",void 0),t([dt()],bt.prototype,"backendOwnerName",void 0),t([dt()],bt.prototype,"usedBy",void 0),t([dt()],bt.prototype,"bannerImageSrc",void 0),t([dt()],bt.prototype,"bannerLink",void 0),t([dt()],bt.prototype,"imageLoaded",void 0),t([function(t,e){return(i,s,o)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:n}="object"==typeof s?i:o??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return ut(0,0,{get(){if(e){let e=t.call(this);return void 0===e&&(e=r(this),n.call(this,e)),e}return r(this)}})}return ut(0,0,{get(){return r(this)}})}}(".modal")],bt.prototype,"modalElement",void 0),bt=t([at("capture-eye-modal")],bt);let yt=class extends rt{get assetUrl(){return`${pt.ipfsGateway}/${this.nid}`}get assetProfileUrl(){return`${pt.profile}/${this.nid}`}constructor(){super(),this.nid="",this.layout=ft.original,function(){const t=document.createElement("link");t.href=pt.fontFaceCssUrl,t.rel="stylesheet",document.head.appendChild(t)}()}buttonTemplate(){return L`
      <div class="capture-eye-button" @click=${this.showModal}>
        <img src=${pt.captureEyeIcon} alt="Capture Eye" />
      </div>
    `}render(){return L`
      <div class="capture-eye-container">
        <slot
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        ></slot>
        ${this.buttonTemplate()}
      </div>
    `}async connectedCallback(){super.connectedCallback(),vt.getInstance().initializeModal()}async showModal(){const t=vt.getInstance(),e=this.getButtonElement().getBoundingClientRect();t.updateModal(this.nid,this.layout,{top:e.top+window.scrollY,left:e.left+window.scrollX}),this.setButtonActive(!0),console.debug(bt.name)}getButtonElement(){return this.shadowRoot?.querySelector(".capture-eye-button")}handleMouseEnter(){this.setButtonActive(!0)}handleMouseLeave(){const t=vt.getInstance();(t.isHidden||t.nid!==this.nid)&&this.setButtonActive(!1)}setButtonActive(t){const e=this.getButtonElement();e&&(t?e.classList.add("active"):e.classList.remove("active"))}};yt.styles=n`
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
  `,t([ct({type:String})],yt.prototype,"nid",void 0),t([ct({type:String})],yt.prototype,"layout",void 0),yt=t([at("capture-eye")],yt);export{yt as CaptureEye};
//# sourceMappingURL=capture-eye.bundled.js.map
