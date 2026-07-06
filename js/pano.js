/* =============================================================
   KGMediaWorks — hero 360° panorama renderer
   Renders an equirectangular photo as an auto-rotating sphere on a
   <canvas class="hero__pano">. Non-interactive (no input listeners) —
   it just slowly pans. Zero dependencies (raw WebGL). If WebGL is
   unavailable or the image fails to load, the canvas stays hidden and
   the gradient hero scene shows instead.
   ============================================================= */
(function () {
  'use strict';

  var canvas = document.querySelector('.hero__pano');
  if (!canvas) return;
  var SRC = canvas.getAttribute('data-src') || 'assets/WEBSITECOVER.jpeg';

  var gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) ||
           canvas.getContext('experimental-webgl');
  if (!gl) return; // no WebGL → gradient scene stays visible

  var VS =
    'attribute vec2 aPos;varying vec2 vNdc;' +
    'void main(){vNdc=aPos;gl_Position=vec4(aPos,0.0,1.0);}';

  var FS =
    'precision highp float;varying vec2 vNdc;' +
    'uniform sampler2D uTex;uniform float uYaw;uniform float uAspect;uniform float uTanHalfFov;' +
    'const float PI=3.14159265359;' +
    'void main(){' +
    '  vec3 dir=normalize(vec3(vNdc.x*uTanHalfFov*uAspect, vNdc.y*uTanHalfFov, -1.0));' +
    '  float cy=cos(uYaw), sy=sin(uYaw);' +
    '  dir=vec3(cy*dir.x+sy*dir.z, dir.y, -sy*dir.x+cy*dir.z);' +
    '  float u=atan(dir.x, dir.z)/(2.0*PI)+0.5;' +
    '  float v=1.0-acos(clamp(dir.y,-1.0,1.0))/PI;' +
    '  gl_FragColor=texture2D(uTex, vec2(u, v));' +
    '}';

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  var vs = compile(gl.VERTEX_SHADER, VS), fs = compile(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  // Fullscreen triangle
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uYaw = gl.getUniformLocation(prog, 'uYaw'),
      uAspect = gl.getUniformLocation(prog, 'uAspect'),
      uTanHalfFov = gl.getUniformLocation(prog, 'uTanHalfFov'),
      uTex = gl.getUniformLocation(prog, 'uTex');

  var FOVY = 80.0 * Math.PI / 180.0;
  gl.uniform1f(uTanHalfFov, Math.tan(FOVY / 2));
  gl.uniform1i(uTex, 0);

  // Texture (1×1 navy placeholder until the photo loads)
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([8, 50, 78, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  var ready = false;
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    // Downscale if the photo exceeds the GPU's max texture size (or a sane cap).
    // Equirectangular heroes are often huge (e.g. 10000×5000) — 4096 wide is
    // plenty for a background and keeps GPU memory/upload reasonable.
    var cap = Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096, 4096);
    var source = img;
    if (img.width > cap || img.height > cap) {
      var scale = cap / Math.max(img.width, img.height);
      var oc = document.createElement('canvas');
      oc.width = Math.max(1, Math.round(img.width * scale));
      oc.height = Math.max(1, Math.round(img.height * scale));
      oc.getContext('2d').drawImage(img, 0, 0, oc.width, oc.height);
      source = oc;
    }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    ready = true;
    canvas.classList.add('is-loaded');
  };
  img.onerror = function () { /* leave the gradient scene showing */ };
  img.src = SRC;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var needResize = true;
  function sizeCanvas() {
    var w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    var h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uAspect, w / h);
    }
  }
  if (window.ResizeObserver) {
    new ResizeObserver(function () { needResize = true; }).observe(canvas);
  } else {
    window.addEventListener('resize', function () { needResize = true; });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var yaw = 0.3, last = performance.now();
  function frame(now) {
    var dt = Math.min((now - last) / 1000, 0.05); last = now;
    if (!reduce) yaw += dt * 0.055; // ~3°/sec — a slow, calm drift
    if (needResize) { sizeCanvas(); needResize = false; }
    if (ready) {
      gl.uniform1f(uYaw, yaw);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
