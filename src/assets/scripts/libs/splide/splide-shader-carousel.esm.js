var O = Object.defineProperty;
var k = (a, e, t) => e in a ? O(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var i = (a, e, t) => (k(a, typeof e != "symbol" ? e + "" : e, t), t);
import b, { EventInterface as T, Throttle as z, RequestInterval as _, CLASS_LOADING as y, CLASS_INITIALIZED as w, LOOP as H, CLASS_SR as F } from "@splidejs/splide";
import { Scene as W, PlaneGeometry as j, Mesh as G, WebGLRenderer as q, PerspectiveCamera as B, Vector2 as d, ShaderMaterial as Z, TextureLoader as R, VideoTexture as Y } from "three";
const J = `varying vec2 vUv;\r
uniform float fTime;\r
\r
void main() {\r
  vUv = uv;\r
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r
}`;
class K {
  constructor(e, t) {
    i(this, "canvas");
    i(this, "renderer");
    i(this, "mesh");
    i(this, "camera");
    i(this, "scene", new W());
    i(this, "geometry", new j(1, 1));
    this.renderer = this.createRenderer(e), this.canvas = e, this.camera = this.createCamera(), this.mesh = new G(this.geometry, t), this.scene.add(this.mesh);
  }
  decode(e) {
    e.forEach((t) => {
      this.renderer.initTexture(t);
    });
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  setSize(e, t) {
    const r = e / t || 1, [n, o] = this.computeViewDimension(r);
    this.mesh.scale.set(n, o, 1), this.renderer.setSize(e, t), this.camera.aspect = r, this.camera.updateProjectionMatrix();
  }
  createRenderer(e) {
    const t = new q({ canvas: e });
    return t.setPixelRatio(window.devicePixelRatio), t;
  }
  createCamera() {
    const e = new B(45, 1, 1, 1e4);
    return e.position.z = 50, e;
  }
  computeViewDimension(e) {
    const { camera: t } = this, r = t.fov * Math.PI / 180, n = Math.abs(t.position.z * Math.tan(r / 2) * 2);
    return [n * e, n];
  }
}
class Q {
  constructor(e, t, r = [], n) {
    i(this, "material");
    i(this, "textures", []);
    i(this, "uniforms", {
      tTexture: { value: null },
      tNextTexture: { value: null },
      tMask: { value: null },
      fIntensity: { value: 0.5 },
      fProgress: { value: 0 },
      vUVOffset: { value: new d(1, 1) },
      vRatio: { value: new d(1, 1) },
      vNextRatio: { value: new d(1, 1) }
    });
    i(this, "sources");
    i(this, "mask");
    i(this, "index", 0);
    i(this, "nextIndex", 0);
    this.material = new Z({
      vertexShader: e,
      fragmentShader: t,
      uniforms: this.uniforms
    }), this.sources = r, this.mask = n;
  }
  destroy() {
    this.sources.length = 0;
  }
  add(e) {
    this.sources.push(...e);
  }
  load() {
    return this.loadMask().then(() => this.loadSources().then((e) => (this.textures.push(...e.map((t) => ({ texture: t, ratio: new d(1, 1) }))), this.uniforms.tTexture.value = e[0] || null, e)));
  }
  setSize(e, t) {
    this.textures.forEach((r, n) => {
      const o = e / t || 1, [v, c] = this.getTextureDimension(r.texture);
      r.ratio = new d(
        Math.min(o / (v / c), 1),
        Math.min(1 / o / (c / v), 1)
      ), n === this.index && (this.uniforms.vRatio.value = r.ratio), n === this.nextIndex && (this.uniforms.vNextRatio.value = r.ratio);
    });
  }
  setIndex(e, t) {
    const { textures: r, index: n } = this;
    0 <= e && e < r.length && n !== e && (t === void 0 && n > e || t ? (this.setProgress(1), this.setTexture(e, n), this.nextIndex = n) : (this.setProgress(0), this.setTexture(n, e), this.nextIndex = e), this.index = e);
  }
  getIndex() {
    return this.index;
  }
  setTexture(e, t) {
    const r = this.textures[e], n = this.textures[t];
    if (r && n) {
      const { uniforms: o } = this;
      o.tTexture.value = r.texture, o.vRatio.value = r.ratio, o.tNextTexture.value = n.texture, o.vNextRatio.value = n.ratio;
    }
  }
  setProgress(e) {
    this.uniforms.fProgress.value = e;
  }
  setParams(e) {
    const { intensity: t = 0.5, uvOffset: r = [1, 1] } = e;
    this.uniforms.fIntensity.value = t, this.uniforms.vUVOffset.value = r;
  }
  getLength() {
    return this.textures.length;
  }
  loadSources() {
    return Promise.all(this.sources.map((e) => e instanceof HTMLVideoElement ? this.loadVideo(e) : new R().loadAsync(e instanceof HTMLImageElement ? e.src : e).then((t) => (t.needsUpdate = !0, t))));
  }
  loadVideo(e) {
    return new Promise((t) => {
      const r = new Y(e);
      r.needsUpdate = !0, e.readyState >= 2 ? t(r) : e.addEventListener("canplay", function n() {
        t(r), e.removeEventListener("canplay", n);
      });
    });
  }
  loadMask() {
    return this.mask ? new R().loadAsync(this.mask).then((e) => {
      this.uniforms.tMask.value = e;
    }) : Promise.resolve();
  }
  getTextureDimension(e) {
    const { image: t } = e;
    return t instanceof HTMLVideoElement ? [t.videoWidth, t.videoHeight] : [t.width, t.height];
  }
}
const U = {
  awaitInit: !0
};
function P(a, e, t) {
  return Math.max(Math.min(a, t), e);
}
class X {
  constructor(e, t, r = {}) {
    i(this, "canvas");
    i(this, "renderer");
    i(this, "material");
    i(this, "event");
    i(this, "options");
    i(this, "interval");
    this.canvas = e, this.options = Object.assign({}, U, r), this.event = T(), this.material = new Q(r.vertexShader || J, t, r.sources, r.mask), this.renderer = new K(e, this.material.material);
  }
  mount(e, t) {
    e && this.material.add(e);
    const { preDecoding: r } = this.options;
    this.material.load().then(() => {
      this.resize(), r === "load" && this.decode(), r === "nearby" && this.decodeAround(), t && t();
    }).catch(console.error), this.resize(), this.listen();
  }
  mountAsync(e) {
    return new Promise((t) => {
      this.mount(e, t);
    });
  }
  destroy() {
    this.event.destroy(), this.material.destroy();
  }
  go(e, t) {
    const r = t === void 0, n = this.material.getIndex();
    e = P(e, 0, this.getLength() - 1), e !== n && (this.material.setIndex(e, t), this.transition(r && n > e || !!t));
  }
  resize() {
    const e = this.getWidth(), t = this.getHeight();
    e && t && (this.renderer.setSize(e, t), this.material.setSize(e, t)), this.render();
  }
  setProgress(e) {
    this.material.setProgress(P(e, 0, 1));
  }
  getWidth() {
    var e;
    return ((e = this.canvas.parentElement) == null ? void 0 : e.clientWidth) || 0;
  }
  getHeight() {
    var e;
    return ((e = this.canvas.parentElement) == null ? void 0 : e.clientHeight) || 0;
  }
  getLength() {
    return this.material.getLength();
  }
  decode() {
    this.renderer.decode(this.material.textures.map((e) => e.texture));
  }
  decodeAround() {
    const { material: e } = this, t = e.getLength();
    if (t) {
      const { textures: r } = this.material, n = e.getIndex(), o = (n + 1) % t, v = (n - 1 + t) % t;
      this.renderer.decode([r[o].texture, r[v].texture]);
    }
  }
  render() {
    this.renderer.render();
  }
  listen() {
    this.event.bind(window, "resize", z(() => {
      this.resize(), this.render();
    }));
  }
  transition(e) {
    this.interval && this.interval.cancel();
    const { speed: t = 1e3 } = this.options;
    this.interval = _(
      t,
      this.onTransitionEnd.bind(this),
      this.onProgress.bind(this, e),
      1
    ), this.interval.start();
  }
  onProgress(e, t) {
    const { easingFunc: r = (n) => 1 - Math.pow(1 - n, 4) } = this.options;
    t = r(t), this.setProgress(e ? 1 - t : t), this.render();
  }
  onTransitionEnd() {
    this.interval = void 0, this.options.preDecoding === "nearby" && this.decodeAround();
  }
}
const ne = "shaderCarousel:initialized", E = "shaderCarousel:ready", p = "shaderCarousel:error";
function $(a, e, t) {
  const { on: r, emit: n } = T(a), { track: o } = e.Elements, v = document.createElement("canvas");
  let c;
  const h = [], x = [], g = [];
  function S() {
    N(), L(), M(), V(), I();
  }
  function I() {
    if (h.length > 1) {
      const { classList: s } = a.root;
      s.add(y), c == null || c.mountAsync(h).then(() => {
        v.style.visibility = "visible", s.add(w), s.remove(y), n(E);
      }).catch((u) => {
        throw n(p), new Error(u);
      }), C();
    } else
      console.error("Requires at least 2 images."), n(p);
  }
  function C() {
    r("move", (s, u) => {
      const { length: m } = a;
      let l;
      (t.continuous || a.is(H)) && (u === m - 1 && s === 0 ? l = !1 : u === 0 && s === m - 1 && (l = !0)), c == null || c.go(s, l);
    });
  }
  function D() {
    o.removeChild(v), g.forEach((s) => {
      var u;
      (u = s.parentElement) == null || u.removeChild(s);
    }), x.forEach((s) => {
      s.style.display = "";
    }), h.length = 0, g.length = 0, x.length = 0, c == null || c.destroy(), c = void 0;
  }
  function N() {
    const { style: s } = v;
    s.position = "absolute", s.zIndex = "-1", s.top = "0", s.left = "0", s.visibility = "hidden", o.appendChild(v);
  }
  function L() {
    c = new X(v, a.fragmentShader, {
      speed: t.speed,
      mask: t.mask,
      easingFunc: t.easingFunc || U.easingFunc,
      preDecoding: t.preDecoding,
      vertexShader: t.vertexShader
    });
  }
  function M() {
    const { sources: s } = t;
    s && s.length ? h.push(...s) : e.Slides.forEach(A);
  }
  function A(s) {
    var m;
    const u = s.slide.querySelector("img");
    if (u) {
      const { alt: l } = u;
      if (l && t.keepAlt) {
        const f = document.createElement("span");
        f.textContent = l, f.classList.add(F), (m = u.parentElement) == null || m.insertBefore(f, u), g.push(f);
      }
      s.isClone || (h.push(u.src), x.push(u)), u.style.display = "none";
    }
  }
  function V() {
    const { material: s } = t;
    s && (c == null || c.material.setParams({
      intensity: s.intensity,
      uvOffset: s.uvOffset
    }));
  }
  return {
    mount: S,
    destroy: D
  };
}
class se extends b {
  constructor(t, r, n) {
    super(t, Object.assign({}, U, n));
    i(this, "fragmentShader");
    this.fragmentShader = r;
  }
  static isAvailable() {
    try {
      const t = document.createElement("canvas"), r = t.getContext("webgl") || t.getContext("experimental-webgl");
      return !!(WebGLRenderingContext && r);
    } catch {
      return !1;
    }
  }
  mount(t = {}) {
    return super.mount(Object.assign(t, { BackgroundShaderCarousel: $ })), this.options.awaitInit && this.root.classList.remove(w), this;
  }
  mountAsync(t) {
    return new Promise((r, n) => {
      this.mount(t);
      const { on: o } = T(this);
      o(E, r), o(p, n);
    });
  }
}
const ie = `varying vec2 vUv;\r
uniform sampler2D tTexture;\r
uniform sampler2D tNextTexture;\r
uniform float fProgress;\r
uniform float fIntensity;\r
uniform vec2 vRatio;\r
uniform vec2 vNextRatio;\r
uniform vec2 vUVOffset;\r
\r
vec2 mirrorUV(vec2 uv) {\r
  vec2 vec = mod(uv, 2.0);\r
  return mix(vec, 2.0 - vec, step(1.0, vec));\r
}\r
\r
float normalizeTexture(vec4 texture) {\r
  float fMax = length(vec4(1.0));\r
  return length(texture) / fMax;\r
}\r
\r
void main() {\r
  vec2 currUv = vUv * vRatio + (1.0 - vRatio) * 0.5;\r
  vec2 nextUv = vUv * vNextRatio + (1.0 - vNextRatio) * 0.5;\r
\r
  vec4 currTexture = texture2D(tTexture, currUv);\r
  vec4 nextTexture = texture2D(tNextTexture, nextUv);\r
\r
  vec2 currTranslatedUv = currUv + fProgress * normalizeTexture(nextTexture) * fIntensity * vUVOffset;\r
  vec2 nextTranslatedUv = nextUv + (1.0 - fProgress) * normalizeTexture(nextTexture) * fIntensity * vUVOffset;\r
\r
  vec4 currColor = texture2D(tTexture, mirrorUV(currTranslatedUv));\r
  vec4 nextColor = texture2D(tNextTexture, mirrorUV(nextTranslatedUv));\r
\r
  gl_FragColor = mix(currColor, nextColor, fProgress);\r
}`, oe = `varying vec2 vUv;\r
uniform sampler2D tTexture;\r
uniform sampler2D tNextTexture;\r
uniform sampler2D tMask;\r
uniform float fProgress;\r
uniform float fIntensity;\r
uniform vec2 vRatio;\r
uniform vec2 vNextRatio;\r
uniform vec2 vUVOffset;\r
\r
vec2 mirror(vec2 uv) {\r
  vec2 vec = mod(uv, 2.0);\r
  return mix(vec, 2.0 - vec, step(1.0, vec));\r
}\r
\r
void main() {\r
  vec2 currUv = vUv * vRatio + (1.0 - vRatio) * 0.5;\r
  vec2 nextUv = vUv * vNextRatio + (1.0 - vNextRatio) * 0.5;\r
\r
  vec4 curr = texture2D(tTexture, currUv);\r
  vec4 next = texture2D(tNextTexture, nextUv);\r
  vec4 mask = texture2D(tMask, vUv);\r
\r
  vec2 currTranslatedUv = currUv + mask.xy * fProgress * fIntensity * vUVOffset;\r
  vec2 nextTranslatedUv = nextUv - mask.xy * (1.0 - fProgress) * fIntensity * vUVOffset;\r
\r
  vec4 currColor = texture2D(tTexture, mirror(currTranslatedUv));\r
  vec4 nextColor = texture2D(tNextTexture, mirror(nextTranslatedUv));\r
\r
  gl_FragColor = mix(currColor, nextColor, fProgress);\r
}`, ae = `varying vec2 vUv;\r
uniform sampler2D tTexture;\r
uniform sampler2D tNextTexture;\r
uniform float fProgress;\r
uniform vec2 vRatio;\r
uniform vec2 vNextRatio;\r
\r
const float PI  = 3.141592653589793;\r
\r
vec2 mirror(vec2 uv) {\r
  vec2 vec = mod(uv, 2.0);\r
  return mix(vec, 2.0 - vec, step(1.0, vec));\r
}\r
\r
void main() {\r
  vec2 currUv = vUv * vRatio + (1.0 - vRatio) * 0.5;\r
  vec2 nextUv = vUv * vNextRatio + (1.0 - vNextRatio) * 0.5;\r
\r
  float progress = fProgress * 6.0 + (pow(currUv.x, 4.0) - 1.0) - currUv.y * 4.0;\r
  progress = clamp(progress, 0.0, 1.0);\r
\r
  //  vec2 offset = vec2( 0.2, sin( currUv.x * PI * 2.0 ) * 0.2 - sin( currUv.y * PI * 2.0 ) * 0.3 - fProgress );\r
  vec2 offset = vec2(- 0.2, 1.5 - sin(currUv.x * 2.0));\r
  vec2 currTranslatedUv = currUv + vec2(-0.5, 1.0) * progress + offset * fProgress;\r
  vec2 nextTranslatedUv = nextUv + vec2(-0.5, 1.0) * (1.0 - progress) + offset * (1.0 - fProgress);\r
\r
  vec4 currColor = texture2D(tTexture, mirror(currTranslatedUv));\r
  vec4 nextColor = texture2D(tNextTexture, mirror(nextTranslatedUv));\r
\r
  gl_FragColor = mix(currColor, nextColor, progress);\r
}`;
export {
  p as EVENT_SHADER_CAROUSEL_ERROR,
  ne as EVENT_SHADER_CAROUSEL_INITIALIZED,
  E as EVENT_SHADER_CAROUSEL_READY,
  se as SplideShaderCarousel,
  se as default,
  ie as dissolveShader,
  oe as maskShader,
  ae as wipeShader
};
