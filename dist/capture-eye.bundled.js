/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:h,defineProperty:a,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!h(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&a(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const n=s?.call(this);o.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??b)(s?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,v?.({ReactiveElement:x}),(p.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,S=$.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,A="?"+E,M=`<${A}>`,_=document,j=()=>_.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,I=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,F=/"/g,H=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),L=new WeakMap,Q=_.createTreeWalker(_,129);function Y(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let h,a,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,a=r.exec(i),null!==a);)l=r.lastIndex,r===z?"!--"===a[1]?r=P:void 0!==a[1]?r=I:void 0!==a[2]?(H.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=N):void 0!==a[3]&&(r=N):r===N?">"===a[0]?(r=o??z,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,h=a[1],r=void 0===a[3]?N:'"'===a[3]?F:R):r===F||r===R?r=N:r===P||r===I?r=z:(r=N,o=void 0);const d=r===N&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+M:c>=0?(s.push(h),i.slice(0,c)+C+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[a,c]=W(t,e);if(this.el=J.createElement(a,i),Q.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&h.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);h.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:V}),s.removeAttribute(t)}else t.startsWith(E)&&(h.push({type:6,index:o}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),Q.nextNode(),h.push({type:2,index:++o});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===A)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)h.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=T(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??_).importNode(e,!0);Q.currentNode=s;let o=Q.nextNode(),n=0,r=0,h=i[0];for(;void 0!==h;){if(n===h.index){let e;2===h.type?e=new K(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new it(o,this,t)),this._$AV.push(e),h=i[++r]}n!==h?.index&&(o=Q.nextNode(),n++)}return Q.currentNode=_,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),T(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&T(this._$AH)?this._$AA.nextSibling.data=t:this.$(_.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new J(t)),e}T(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.k(j()),this.k(j()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class V{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const s=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=Z(this,s[i+r],e,r),h===B&&(h=this._$AH[r]),n||=!T(h)||h!==this._$AH[r],h===D?t=D:t!==D&&(t+=(h??"")+o[r+1]),this._$AH[r]=h}n&&!s&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}class tt extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==D)}}class et extends V{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??D)===B)return;const i=this._$AH,s=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==D&&(i===D||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(J,K),($.litHtmlVersions??=[]).push("3.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ot extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new K(e.insertBefore(j(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ot._$litElement$=!0,ot.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ot});const nt=globalThis.litElementPolyfillSupport;nt?.({LitElement:ot}),(globalThis.litElementVersions??=[]).push("4.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},at=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function ct(t){return(e,i)=>"object"==typeof i?at(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const lt={dataApi:"https://eognt1jfpe04mq8.m.pipedream.net",ipfsGateway:"https://ipfs-pin.numbersprotocol.io/ipfs",explorer:"https://mainnet.num.network",profile:"https://verify.numbersprotocol.io/asset-profile?nid=",collect:"https://captureappiframe.numbersprotocol.io/checkout",captureEyeIcon:"https://ipfs-pin.numbersprotocol.io/ipfs/bafkreicf4sruldnh4g3bmxnqr6zjgfzfgvbqoa5iy2jncewqqlgg75utd4",closeIcon:"https://c.animaapp.com/twFYQx58/img/close@2x.png",contentCopyIcon:"https://c.animaapp.com/twFYQx58/img/content-copy@2x.png",helpIcon:"https://c.animaapp.com/twFYQx58/img/help-2@2x.png",previewIcon:"https://c.animaapp.com/twFYQx58/img/placeholder-image.png"};function dt(){return n`
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
      z-index: 1;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      opacity: 0.4;
    }
    .capture-eye-button:hover {
      opacity: 1;
    }

    .capture-eye-iframe {
      border: none;
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

    /* Modal styles */
    .modal {
      // display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 2; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background: rgb(0, 0, 0); /* Fallback color */
      background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    .modal-container {
      background-color: #fefefe;
      border-radius: 1rem;
      margin: 48px auto; /* 15% from the top and centered */
      width: 80%; /* Could be more or less, depending on screen size */
      height: 80%; /* Could be more or less, depending on screen size */
      background: #111112;
    }

    .modal-header {
      display: flex;
      height: 90px;
      align-items: center;
      border-bottom: 1px solid #383838;
    }

    .keyboard-arrow-left {
      display: inline-flex;
      align-items: flex-start;
      gap: 8px;
      padding: 4px;
      background-color: #383838;
      border-radius: 32px;
      margin-left: 40px;
    }

    @media (max-width: 600px) {
      .keyboard-arrow-left {
        margin-left: 20px;
      }
    }

    .keyboard-arrow-left .close {
      position: relative;
      width: 24px;
      height: 24px;
    }

    .modal-content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
  `}class ut{constructor(){this.modalElement=null,this.renderedOnce=!1}get isHidden(){return!this.modalElement||this.modalElement.modalHidden}static getInstance(){return ut.instance||(ut.instance=new ut),ut.instance}initializeModal(){this.modalElement||(this.modalElement=document.createElement("capture-eye-modal"),document.body.appendChild(this.modalElement))}updateModal(t,e=!0){if(console.log("update modal",e),this.modalElement){if(console.log("found modalElement",this.modalElement),this.modalElement.nid!==t||!this.renderedOnce){const e=this.modalElement.shadowRoot?.querySelector(".capture-eye-iframe");e&&e.remove(),this.modalElement.nid=t,this.createIframe(t),this.renderedOnce=!0,console.log("render nid",t)}e&&(this.modalElement.modalHidden=!1)}}hideModal(){this.modalElement&&(this.modalElement.modalHidden=!0)}createIframe(t){if(this.modalElement&&this.modalElement.shadowRoot){const e=document.createElement("iframe");e.src=`https://verify.numbersprotocol.io/version-test/asset-profile/?nid=${t}&iframe=yes`,e.width="80%",e.height="80%",e.allowFullscreen=!0,e.className="capture-eye-iframe";const i=this.modalElement.shadowRoot.querySelector(".modal-content");console.log("modalContentDiv",i),i&&(i.appendChild(e),console.log("append iframe"))}}}var pt=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,h=t.length-1;h>=0;h--)(o=t[h])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ft=class extends ot{constructor(){super(),this.nid="",this.modalHidden=!0}render(){return q`
      <div class="modal" ?hidden=${this.modalHidden}>
        <div class="modal-container">
          <div class="modal-header">
            <div class="keyboard-arrow-left" @click=${this.hideModal}>
              <img class="close" src=${lt.closeIcon} />
            </div>
          </div>
          <div class="modal-content"></div>
        </div>
      </div>
    `}hideModal(){this.modalHidden=!0}};ft.styles=dt(),pt([ct()],ft.prototype,"nid",void 0),pt([ct({type:Boolean})],ft.prototype,"modalHidden",void 0),ft=pt([rt("capture-eye-modal")],ft);var mt=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,h=t.length-1;h>=0;h--)(o=t[h])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let vt=class extends ot{get assetUrl(){return`${lt.ipfsGateway}/${this.nid}`}get assetProfileUrl(){return`${lt.profile}${this.nid}`}constructor(){super(),this.prefetch=!1,this.nid="";const t=document.createElement("link");t.href="https://static-cdn.numbersprotocol.io/fonts/degular.css",t.rel="stylesheet",document.head.appendChild(t)}buttonTemplate(){return q`
      <div
        class="capture-eye-button"
        @click=${this.showModal}
        @mouseover=${this.handleMouseOver}
      >
        <img src=${lt.captureEyeIcon} alt="Capture Eye" />
      </div>
    `}render(){return q`
      <div class="capture-eye-container">
        <slot></slot>
        ${this.buttonTemplate()}
      </div>
    `}async connectedCallback(){super.connectedCallback(),ut.getInstance().initializeModal(),this.prefetch&&customElements.whenDefined("capture-eye-modal").then((()=>{ut.getInstance().updateModal(this.nid,!1)}))}handleMouseOver(){const t=ut.getInstance();t.isHidden&&t.updateModal(this.nid,!1)}async showModal(){ut.getInstance().updateModal(this.nid),console.debug(ft.name)}};vt.styles=dt(),mt([ct({type:Boolean})],vt.prototype,"prefetch",void 0),mt([ct()],vt.prototype,"nid",void 0),vt=mt([rt("capture-eye")],vt);export{vt as CaptureEye};
