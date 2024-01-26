/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  i =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s = Symbol(),
  e = new WeakMap();
class o {
  constructor(t, i, e) {
    if (((this._$cssResult$ = !0), e !== s))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    (this.cssText = t), (this.t = i);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (i && void 0 === t) {
      const i = void 0 !== s && 1 === s.length;
      i && (t = e.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && e.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const n = i
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let i = '';
              for (const s of t.cssRules) i += s.cssText;
              return ((t) =>
                new o('string' == typeof t ? t : t + '', void 0, s))(i);
            })(t)
          : t,
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ {
    is: r,
    defineProperty: h,
    getOwnPropertyDescriptor: a,
    getOwnPropertyNames: c,
    getOwnPropertySymbols: l,
    getPrototypeOf: d,
  } = Object,
  p = globalThis,
  u = p.trustedTypes,
  f = u ? u.emptyScript : '',
  v = p.reactiveElementPolyfillSupport,
  g = (t, i) => t,
  m = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? f : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  b = (t, i) => !r(t, i),
  y = { attribute: !0, type: String, converter: m, reflect: !1, hasChanged: b };
(Symbol.metadata ??= Symbol('metadata')),
  (p.litPropertyMetadata ??= new WeakMap());
class w extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = y) {
    if (
      (i.state && (i.attribute = !1),
      this._$Ei(),
      this.elementProperties.set(t, i),
      !i.noAccessor)
    ) {
      const s = Symbol(),
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && h(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: e, set: o } = a(this.prototype, t) ?? {
      get() {
        return this[i];
      },
      set(t) {
        this[i] = t;
      },
    };
    return {
      get() {
        return e?.call(this);
      },
      set(i) {
        const n = e?.call(this);
        o.call(this, i), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(g('elementProperties'))) return;
    const t = d(this);
    t.finalize(),
      void 0 !== t.l && (this.l = [...t.l]),
      (this.elementProperties = new Map(t.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(g('finalized'))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(g('properties')))
    ) {
      const t = this.properties,
        i = [...c(t), ...l(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const i = litPropertyMetadata.get(t);
      if (void 0 !== i)
        for (const [t, s] of i) this.elementProperties.set(t, s);
    }
    this._$Eh = new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      void 0 !== s && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) i.unshift(n(t));
    } else void 0 !== t && i.push(n(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$Eg = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$ES ??= []).push(t),
      void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$ES?.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$E_() {
    const t = new Map(),
      i = this.constructor.elementProperties;
    for (const s of i.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const s =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((s, e) => {
        if (i)
          s.adoptedStyleSheets = e.map((t) =>
            t instanceof CSSStyleSheet ? t : t.styleSheet
          );
        else
          for (const i of e) {
            const e = document.createElement('style'),
              o = t.litNonce;
            void 0 !== o && e.setAttribute('nonce', o),
              (e.textContent = i.cssText),
              s.appendChild(e);
          }
      })(s, this.constructor.elementStyles),
      s
    );
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$ES?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$ES?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i) {
    const s = this.constructor.elementProperties.get(t),
      e = this.constructor._$Eu(t, s);
    if (void 0 !== e && !0 === s.reflect) {
      const o = (
        void 0 !== s.converter?.toAttribute ? s.converter : m
      ).toAttribute(i, s.type);
      (this._$Em = t),
        null == o ? this.removeAttribute(e) : this.setAttribute(e, o),
        (this._$Em = null);
    }
  }
  _$AK(t, i) {
    const s = this.constructor,
      e = s._$Eh.get(t);
    if (void 0 !== e && this._$Em !== e) {
      const t = s.getPropertyOptions(e),
        o =
          'function' == typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== t.converter?.fromAttribute
            ? t.converter
            : m;
      (this._$Em = e),
        (this[e] = o.fromAttribute(i, t.type)),
        (this._$Em = null);
    }
  }
  requestUpdate(t, i, s, e = !1, o) {
    if (void 0 !== t) {
      if (
        ((s ??= this.constructor.getPropertyOptions(t)),
        !(s.hasChanged ?? b)(e ? o : this[t], i))
      )
        return;
      this.C(t, i, s);
    }
    !1 === this.isUpdatePending && (this._$Eg = this._$EP());
  }
  C(t, i, s) {
    this._$AL.has(t) || this._$AL.set(t, i),
      !0 === s.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this._$Ep) {
        for (const [t, i] of this._$Ep) this[t] = i;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0)
        for (const [i, s] of t)
          !0 !== s.wrapped ||
            this._$AL.has(i) ||
            void 0 === this[i] ||
            this.C(i, this[i], s);
    }
    let t = !1;
    const i = this._$AL;
    try {
      (t = this.shouldUpdate(i)),
        t
          ? (this.willUpdate(i),
            this._$ES?.forEach((t) => t.hostUpdate?.()),
            this.update(i))
          : this._$ET();
    } catch (i) {
      throw ((t = !1), this._$ET(), i);
    }
    t && this._$AE(i);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$ES?.forEach((t) => t.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$ET() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    (this._$Ej &&= this._$Ej.forEach((t) => this._$EO(t, this[t]))),
      this._$ET();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(w.elementStyles = []),
  (w.shadowRootOptions = { mode: 'open' }),
  (w[g('elementProperties')] = new Map()),
  (w[g('finalized')] = new Map()),
  v?.({ ReactiveElement: w }),
  (p.reactiveElementVersions ??= []).push('2.0.1');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis,
  S = $.trustedTypes,
  k = S ? S.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  x = '$lit$',
  C = `lit$${(Math.random() + '').slice(9)}$`,
  A = '?' + C,
  _ = `<${A}>`,
  E = document,
  T = () => E.createComment(''),
  z = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  M = Array.isArray,
  P = '[ \t\n\f\r]',
  j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  U = /-->/g,
  O = />/g,
  N = RegExp(
    `>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g'
  ),
  R = /'/g,
  L = /"/g,
  D = /^(?:script|style|textarea|title)$/i,
  I = (
    (t) =>
    (i, ...s) => ({ _$litType$: t, strings: i, values: s })
  )(1),
  q = Symbol.for('lit-noChange'),
  B = Symbol.for('lit-nothing'),
  W = new WeakMap(),
  H = E.createTreeWalker(E, 129);
function J(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return void 0 !== k ? k.createHTML(i) : i;
}
const V = (t, i) => {
  const s = t.length - 1,
    e = [];
  let o,
    n = 2 === i ? '<svg>' : '',
    r = j;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let h,
      a,
      c = -1,
      l = 0;
    for (; l < s.length && ((r.lastIndex = l), (a = r.exec(s)), null !== a); )
      (l = r.lastIndex),
        r === j
          ? '!--' === a[1]
            ? (r = U)
            : void 0 !== a[1]
            ? (r = O)
            : void 0 !== a[2]
            ? (D.test(a[2]) && (o = RegExp('</' + a[2], 'g')), (r = N))
            : void 0 !== a[3] && (r = N)
          : r === N
          ? '>' === a[0]
            ? ((r = o ?? j), (c = -1))
            : void 0 === a[1]
            ? (c = -2)
            : ((c = r.lastIndex - a[2].length),
              (h = a[1]),
              (r = void 0 === a[3] ? N : '"' === a[3] ? L : R))
          : r === L || r === R
          ? (r = N)
          : r === U || r === O
          ? (r = j)
          : ((r = N), (o = void 0));
    const d = r === N && t[i + 1].startsWith('/>') ? ' ' : '';
    n +=
      r === j
        ? s + _
        : c >= 0
        ? (e.push(h), s.slice(0, c) + x + s.slice(c) + C + d)
        : s + C + (-2 === c ? i : d);
  }
  return [J(t, n + (t[s] || '<?>') + (2 === i ? '</svg>' : '')), e];
};
class Z {
  constructor({ strings: t, _$litType$: i }, s) {
    let e;
    this.parts = [];
    let o = 0,
      n = 0;
    const r = t.length - 1,
      h = this.parts,
      [a, c] = V(t, i);
    if (
      ((this.el = Z.createElement(a, s)),
      (H.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (e = H.nextNode()) && h.length < r; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes())
          for (const t of e.getAttributeNames())
            if (t.endsWith(x)) {
              const i = c[n++],
                s = e.getAttribute(t).split(C),
                r = /([.?@])?(.*)/.exec(i);
              h.push({
                type: 1,
                index: o,
                name: r[2],
                strings: s,
                ctor:
                  '.' === r[1] ? X : '?' === r[1] ? Y : '@' === r[1] ? tt : Q,
              }),
                e.removeAttribute(t);
            } else
              t.startsWith(C) &&
                (h.push({ type: 6, index: o }), e.removeAttribute(t));
        if (D.test(e.tagName)) {
          const t = e.textContent.split(C),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = S ? S.emptyScript : '';
            for (let s = 0; s < i; s++)
              e.append(t[s], T()),
                H.nextNode(),
                h.push({ type: 2, index: ++o });
            e.append(t[i], T());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === A) h.push({ type: 2, index: o });
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(C, t + 1)); )
            h.push({ type: 7, index: o }), (t += C.length - 1);
        }
      o++;
    }
  }
  static createElement(t, i) {
    const s = E.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function G(t, i, s = t, e) {
  if (i === q) return i;
  let o = void 0 !== e ? s._$Co?.[e] : s._$Cl;
  const n = z(i) ? void 0 : i._$litDirective$;
  return (
    o?.constructor !== n &&
      (o?._$AO?.(!1),
      void 0 === n ? (o = void 0) : ((o = new n(t)), o._$AT(t, s, e)),
      void 0 !== e ? ((s._$Co ??= [])[e] = o) : (s._$Cl = o)),
    void 0 !== o && (i = G(t, o._$AS(t, i.values), o, e)),
    i
  );
}
class K {
  constructor(t, i) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: { content: i },
        parts: s,
      } = this._$AD,
      e = (t?.creationScope ?? E).importNode(i, !0);
    H.currentNode = e;
    let o = H.nextNode(),
      n = 0,
      r = 0,
      h = s[0];
    for (; void 0 !== h; ) {
      if (n === h.index) {
        let i;
        2 === h.type
          ? (i = new F(o, o.nextSibling, this, t))
          : 1 === h.type
          ? (i = new h.ctor(o, h.name, h.strings, this, t))
          : 6 === h.type && (i = new it(o, this, t)),
          this._$AV.push(i),
          (h = s[++r]);
      }
      n !== h?.index && ((o = H.nextNode()), n++);
    }
    return (H.currentNode = E), e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class F {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, e) {
    (this.type = 2),
      (this._$AH = B),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cv = e?.isConnected ?? !0);
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = G(this, t, i)),
      z(t)
        ? t === B || null == t || '' === t
          ? (this._$AH !== B && this._$AR(), (this._$AH = B))
          : t !== this._$AH && t !== q && this._(t)
        : void 0 !== t._$litType$
        ? this.g(t)
        : void 0 !== t.nodeType
        ? this.$(t)
        : ((t) => M(t) || 'function' == typeof t?.[Symbol.iterator])(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== B && z(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$(E.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    const { values: i, _$litType$: s } = t,
      e =
        'number' == typeof s
          ? this._$AC(t)
          : (void 0 === s.el &&
              (s.el = Z.createElement(J(s.h, s.h[0]), this.options)),
            s);
    if (this._$AH?._$AD === e) this._$AH.p(i);
    else {
      const t = new K(e, this),
        s = t.u(this.options);
      t.p(i), this.$(s), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = W.get(t.strings);
    return void 0 === i && W.set(t.strings, (i = new Z(t))), i;
  }
  T(t) {
    M(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t)
      e === i.length
        ? i.push((s = new F(this.k(T()), this.k(T()), this, this.options)))
        : (s = i[e]),
        s._$AI(o),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    void 0 === this._$AM && ((this._$Cv = t), this._$AP?.(t));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, o) {
    (this.type = 1),
      (this._$AH = B),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = o),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = B);
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o)
      (t = G(this, t, i, 0)),
        (n = !z(t) || (t !== this._$AH && t !== q)),
        n && (this._$AH = t);
    else {
      const e = t;
      let r, h;
      for (t = o[0], r = 0; r < o.length - 1; r++)
        (h = G(this, e[s + r], i, r)),
          h === q && (h = this._$AH[r]),
          (n ||= !z(h) || h !== this._$AH[r]),
          h === B ? (t = B) : t !== B && (t += (h ?? '') + o[r + 1]),
          (this._$AH[r] = h);
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === B
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? '');
  }
}
class X extends Q {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === B ? void 0 : t;
  }
}
class Y extends Q {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== B);
  }
}
class tt extends Q {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), (this.type = 5);
  }
  _$AI(t, i = this) {
    if ((t = G(this, t, i, 0) ?? B) === q) return;
    const s = this._$AH,
      e =
        (t === B && s !== B) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      o = t !== B && (s === B || e);
    e && this.element.removeEventListener(this.name, this, s),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    'function' == typeof this._$AH
      ? this._$AH.call(this.options?.host ?? this.element, t)
      : this._$AH.handleEvent(t);
  }
}
class it {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    G(this, t);
  }
}
const st = $.litHtmlPolyfillSupport;
st?.(Z, F), ($.litHtmlVersions ??= []).push('3.0.1');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends w {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return (this.renderOptions.renderBefore ??= t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, i, s) => {
        const e = s?.renderBefore ?? i;
        let o = e._$litPart$;
        if (void 0 === o) {
          const t = s?.renderBefore ?? null;
          e._$litPart$ = o = new F(i.insertBefore(T(), t), t, void 0, s ?? {});
        }
        return o._$AI(t), o;
      })(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return q;
  }
}
(et._$litElement$ = !0),
  (et.finalized = !0),
  globalThis.litElementHydrateSupport?.({ LitElement: et });
const ot = globalThis.litElementPolyfillSupport;
ot?.({ LitElement: et }), (globalThis.litElementVersions ??= []).push('4.0.1');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = {
    attribute: !0,
    type: String,
    converter: m,
    reflect: !1,
    hasChanged: b,
  },
  rt = (t = nt, i, s) => {
    const { kind: e, metadata: o } = s;
    let n = globalThis.litPropertyMetadata.get(o);
    if (
      (void 0 === n && globalThis.litPropertyMetadata.set(o, (n = new Map())),
      n.set(s.name, t),
      'accessor' === e)
    ) {
      const { name: e } = s;
      return {
        set(s) {
          const o = i.get.call(this);
          i.set.call(this, s), this.requestUpdate(e, o, t);
        },
        init(i) {
          return void 0 !== i && this.C(e, void 0, t), i;
        },
      };
    }
    if ('setter' === e) {
      const { name: e } = s;
      return function (s) {
        const o = this[e];
        i.call(this, s), this.requestUpdate(e, o, t);
      };
    }
    throw Error('Unsupported decorator location: ' + e);
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function ht(t) {
  return (i, s) =>
    'object' == typeof s
      ? rt(t, i, s)
      : ((t, i, s) => {
          const e = i.hasOwnProperty(s);
          return (
            i.constructor.createProperty(s, e ? { ...t, wrapped: !0 } : t),
            e ? Object.getOwnPropertyDescriptor(i, s) : void 0
          );
        })(t, i, s);
}
var at = function (t, i, s, e) {
  for (
    var o,
      n = arguments.length,
      r =
        n < 3
          ? i
          : null === e
          ? (e = Object.getOwnPropertyDescriptor(i, s))
          : e,
      h = t.length - 1;
    h >= 0;
    h--
  )
    (o = t[h]) && (r = (n < 3 ? o(r) : n > 3 ? o(i, s, r) : o(i, s)) || r);
  return n > 3 && r && Object.defineProperty(i, s, r), r;
};
let ct = class extends et {
  constructor() {
    super(...arguments),
      (this.showPanel = !1),
      (this.prefetch = !1),
      (this.nid = ''),
      (this.capture_token = ''),
      (this.assetCreator = 'Loading data from blockchain...'),
      (this.assetTimestampCreated = 'Loading data from blockchain...'),
      (this.digitalSourceType = 'Loading data from blockchain...'),
      (this.captureEyeIcon =
        'https://ipfs-pin.numbersprotocol.io/ipfs/bafkreihh5vsu7ru7o6gd54qicdn3mb5eqdpoc4f32shfacnhwelljt6ptu'),
      (this.profileBaseUrl = 'https://nftsearch.site/asset-profile?nid='),
      (this.assetDataFetched = !1),
      (this.assetDataNotFound = !1);
  }
  render() {
    return I`
      <slot></slot>
      <div class="inspector-component">
        <div class="inspector-wrapper">
          <div class="inspector-ref-eye" @click=${this.toggleShowPanel}>
            <img
              src=${this.captureEyeIcon}
              class="${this.assetDataNotFound ? 'grayed-out' : ''}"
              alt="Capture Eye"
            />
          </div>
          <div class="inspector-panel" ?hidden=${!this.showPanel}>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Registration Time</div>
              <p class="inspector-panel-text">${this.assetTimestampCreated}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Creator</div>
              <p class="inspector-panel-text">${this.assetCreator}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Source Type</div>
              <p class="inspector-panel-text">${this.digitalSourceType}</p>
            </div>
            <div class="inspector-panel-section">
              <div class="inspector-panel-heading">Asset ID</div>
              <a
                id="dynamicLink"
                class="inspector-panel-link w-inline-block"
                target="_blank"
                href="${this.profileBaseUrl}${this.nid}"
              >
                ${this.nid}
              </a>
            </div>
            <div class="inspector-panel-section">
              <a
                id="dynamicDestination"
                class="inspector-btn-view-more"
                target="_blank"
                href="${this.profileBaseUrl}${this.nid}"
              >
                <div>View More</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  async connectedCallback() {
    super.connectedCallback(), this.prefetch && (await this.fetchAssetData());
  }
  async toggleShowPanel() {
    (this.showPanel = !this.showPanel), await this.fetchAssetData();
  }
  async fetchAssetData() {
    if (this.assetDataFetched) return;
    const t = { 'Content-Type': 'application/json' };
    this.capture_token && (t.Authorization = `token ${this.capture_token}`);
    const i = await fetch(
      `https://eognt1jfpe04mq8.m.pipedream.net?nid=${this.nid}`,
      { method: 'GET', headers: t }
    );
    if (i.ok) {
      const t = await i.json();
      (this.assetCreator = t.assetCreator),
        (this.assetTimestampCreated = t.assetTimestampCreated),
        (this.digitalSourceType = t.digitalSourceType),
        (this.assetDataFetched = !0);
    } else
      console.log(
        `Error ${i.status}: ${await i.json().then((t) => t.message)}`
      ),
        (this.showPanel = !1),
        (this.assetDataNotFound = !0);
  }
};
(ct.styles = ((t, ...i) => {
  const e =
    1 === t.length
      ? t[0]
      : i.reduce(
          (i, s, e) =>
            i +
            ((t) => {
              if (!0 === t._$cssResult$) return t.cssText;
              if ('number' == typeof t) return t;
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                  t +
                  ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
              );
            })(s) +
            t[e + 1],
          t[0]
        );
  return new o(e, t, s);
})`
    :host {
      color: #000;
      font-family: degular, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      display: inline-block;
      position: relative;
    }

    p {
      color: rgba(204, 204, 204, 0.75);
      margin: 0;
      font-size: 1.125rem;
    }

    a {
      text-decoration: none;
    }

    img {
      max-width: 100%;
      display: inline-block;
    }

    .inspector-component {
      top: 0;
      left: 0;
      z-index: 1;
      color: #000;
      position: absolute;
    }

    .inspector-wrapper {
      margin-top: 1rem;
      margin-left: 1rem;
      position: relative;
    }

    .inspector-ref-eye {
      z-index: 999;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      border-radius: 100vw;
      justify-content: center;
      align-items: center;
      display: flex;
      position: relative;
    }

    .inspector-eye-icon {
      width: 2rem;
      height: 2rem;
    }

    .inspector-panel {
      z-index: 998;
      width: 20rem;
      max-width: 75vw;
      perspective-origin: 0 0;
      transform: scale3d(1none, 1none, 1none);
      transform-origin: 0 0;
      transform-style: preserve-3d;
      background-color: #fff;
      border-radius: 1rem;
      margin-top: 1rem;
      margin-left: 1rem;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      position: absolute;
      top: 0%;
      bottom: auto;
      left: 0%;
      right: auto;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    }

    .inspector-panel-section {
      border-bottom: 1px solid #e2e2e2;
      padding-top: 0.75rem;
      padding-bottom: 0.8rem;
    }

    .inspector-panel-heading {
      opacity: 0.6;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-size: 0.75rem;
    }

    .inspector-panel-link {
      opacity: 1;
      color: #486cd9;
      font-size: 0.9rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .inspector-panel-link:hover {
      opacity: 0.8;
      color: #6ebff2;
    }

    .inspector-panel-text {
      color: #000;
      font-size: 1rem;
    }

    .inspector-panel-link {
      overflow-wrap: break-word;
    }

    .inspector-panel-section:last-child {
      border: none;
    }

    .inspector-btn-view-more {
      display: inline-block;
      background-color: #486cd9;
      color: #fff;
      /* button text color */
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      padding-top: 0.5rem;
      padding-right: 2rem;
      padding-bottom: 0.6rem;
      padding-left: 2rem;
      border-radius: 100vw;
      text-align: center;
      transition: background-color 0.3s ease;
      /* smooth background color transition */
    }

    .inspector-btn-view-more:hover {
      background-color: #6ebff2;
      /* slightly darker color on hover */
      color: #fff;
      /* button text color */
    }

    .grayed-out {
      filter: grayscale(100%);
      /* Add any other styling for grayed-out image here */
    }

  `),
  at([ht({ type: Boolean })], ct.prototype, 'showPanel', void 0),
  at([ht({ type: Boolean })], ct.prototype, 'prefetch', void 0),
  at([ht()], ct.prototype, 'nid', void 0),
  at([ht()], ct.prototype, 'capture_token', void 0),
  at([ht({ attribute: !1 })], ct.prototype, 'assetCreator', void 0),
  at([ht({ attribute: !1 })], ct.prototype, 'assetTimestampCreated', void 0),
  at([ht({ attribute: !1 })], ct.prototype, 'digitalSourceType', void 0),
  (ct = at(
    [
      ((t) => (i, s) => {
        void 0 !== s
          ? s.addInitializer(() => {
              customElements.define(t, i);
            })
          : customElements.define(t, i);
      })('capture-eye'),
    ],
    ct
  ));
export { ct as CaptureEye };
