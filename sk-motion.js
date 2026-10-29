(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var EASE = 'cubic-bezier(.16,1,.3,1)';

  /* page-transition curtain: cover immediately if we arrived via an internal link */
  var curtain = null;
  var makeCurtain = function (covering) {
    var c = document.createElement('div');
    c.setAttribute('aria-hidden', 'true');
    c.style.cssText = 'position:fixed;inset:0;z-index:9998;background:#22362b;pointer-events:none;display:flex;align-items:center;justify-content:center;transform:translateY(' + (covering ? '0' : '100%') + ');transition:transform .75s ' + EASE;
    var mark = document.createElement('img');
    mark.src = 'images/logo-lime-on-ink.svg';
    mark.alt = '';
    mark.style.cssText = 'height:34px;width:auto;opacity:' + (covering ? '1' : '0') + ';transition:opacity .4s ease';
    c.appendChild(mark);
    (document.body || document.documentElement).appendChild(c);
    return c;
  };
  try {
    if (!reduced && sessionStorage.getItem('sk-tx')) { sessionStorage.removeItem('sk-tx'); curtain = makeCurtain(true); }
  } catch (e) {}
  var lift = function () {
    if (!curtain) return;
    var c = curtain; curtain = null;
    c.firstChild.style.opacity = '0';
    setTimeout(function () { c.style.transform = 'translateY(-100%)'; }, 120);
    setTimeout(function () { c.remove(); }, 1000);
  };
  setTimeout(lift, 1600);

  window.SKMotion = {
    init: function (opts) {
      opts = opts || {};
      var amt = opts.amt == null ? 1 : opts.amt;
      var cleanups = [];
      var on = function (t, ev, fn, o) { t.addEventListener(ev, fn, o); cleanups.push(function () { t.removeEventListener(ev, fn, o); }); };
      var narrow = function () { return window.innerWidth < 900; };

      /* responsive: sticky columns only when there is room for them */
      var stickies = function () {
        document.querySelectorAll('[data-sticky]').forEach(function (el) { el.style.position = narrow() ? 'static' : 'sticky'; });
      };
      stickies(); on(window, 'resize', stickies);

      setTimeout(lift, 160);
      if (reduced || amt === 0) return function () { cleanups.forEach(function (f) { f(); }); };

      /* ---------- reveals: fade-up, mask-wipe headings, curtain images ---------- */
      var isHead = function (el) { return /^H[12]$/.test(el.tagName) || el.getAttribute('data-reveal') === 'mask'; };
      var show = function (el) {
        el.style.opacity = '1'; el.style.transform = 'none';
        if (el._clip) { el.style.clipPath = 'inset(0% 0% 0% 0% round ' + (el._r || '0px') + ')'; setTimeout(function () { el.style.clipPath = ''; }, 1300); }
      };
      var hide = function (el) {
        var k = el.getAttribute('data-reveal');
        el.style.willChange = 'opacity, transform, clip-path';
        if (isHead(el)) {
          el._clip = true;
          el.style.transition = 'opacity .9s ' + EASE + ', transform 1.2s ' + EASE + ', clip-path 1.2s ' + EASE;
          el.style.opacity = '0';
          el.style.clipPath = 'inset(0% 0% 100% 0%)';
          el.style.transform = 'translateY(' + (36 * amt) + 'px)';
          return;
        }
        if (k === 'scale') {
          el._clip = true; el._r = getComputedStyle(el).borderTopLeftRadius || '0px';
          el.style.transition = 'opacity .6s ease, transform 1.4s ' + EASE + ', clip-path 1.4s ' + EASE;
          el.style.opacity = '0';
          el.style.clipPath = 'inset(14% 10% 14% 10% round ' + el._r + ')';
          el.style.transform = 'scale(' + (1 - 0.04 * amt) + ')';
          return;
        }
        el.style.transition = 'opacity .9s ' + EASE + ', transform 1.1s ' + EASE;
        el.style.opacity = '0';
        el.style.transform = k === 'left' ? 'translateX(' + (-40 * amt) + 'px)' : k === 'right' ? 'translateX(' + (40 * amt) + 'px)' : 'translateY(' + (40 * amt) + 'px)';
      };
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting && !(e.boundingClientRect.bottom < 0)) return;
          var el = e.target, d = +(el.getAttribute('data-delay') || 0);
          setTimeout(function () { show(el); }, d);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      cleanups.push(function () { io.disconnect(); });

      /* ---------- counters ---------- */
      var count = function (el) {
        var to = parseFloat(el.getAttribute('data-count'));
        if (!isFinite(to)) return;
        var pre = el.getAttribute('data-pre') || '', suf = el.getAttribute('data-suf') || '';
        var t0 = performance.now(), dur = 1600;
        var step = function (now) {
          var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
          el.textContent = pre + Math.round(to * e).toLocaleString('en-GB') + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.4 });
      cleanups.push(function () { cio.disconnect(); });

      var scan = function () {
        if (opts.reveals !== false) document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(function (el) {
          el.setAttribute('data-rv', '1');
          var r = el.getBoundingClientRect();
          hide(el);
          if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
            var d = +(el.getAttribute('data-delay') || 0) + 140;
            setTimeout(function () { show(el); }, d);
          } else io.observe(el);
        });
        if (opts.counters !== false) document.querySelectorAll('[data-count]:not([data-cv])').forEach(function (el) { el.setAttribute('data-cv', '1'); cio.observe(el); });
        stickies();
      };

      /* ---------- scroll progress bar ---------- */
      var bar = document.createElement('div');
      bar.setAttribute('aria-hidden', 'true');
      bar.style.cssText = 'position:fixed;left:0;top:0;right:0;height:2px;z-index:9997;background:#cbf24c;transform-origin:0 50%;transform:scaleX(0);pointer-events:none';
      document.body.appendChild(bar);
      cleanups.push(function () { bar.remove(); });

      /* ---------- scroll-linked: parallax, zoom, progress ---------- */
      var tick = function () {
        var vh = window.innerHeight;
        var max = Math.max(1, document.documentElement.scrollHeight - vh);
        bar.style.transform = 'scaleX(' + Math.min(1, window.scrollY / max).toFixed(4) + ')';
        if (opts.par !== false) document.querySelectorAll('[data-par]').forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          var c = (r.top + r.height / 2 - vh / 2) / vh;
          var k = (parseFloat(el.getAttribute('data-par')) || 0) * (narrow() ? 0.5 : 1);
          el.style.transform = 'translate3d(0,' + (-c * k * 150 * amt).toFixed(1) + 'px,0)';
        });
        document.querySelectorAll('[data-zoom]').forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect();
          var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
          el.style.transform = 'scale(' + (1.14 - p * 0.14 * amt).toFixed(3) + ')';
        });
        document.querySelectorAll('[data-rv]').forEach(function (el) {
          if (el.style.opacity === '0' && el.getBoundingClientRect().bottom < 0) show(el);
        });
      };
      var q = false;
      var onScroll = function () { if (q) return; q = true; requestAnimationFrame(function () { q = false; tick(); }); };
      on(window, 'scroll', onScroll, { passive: true });
      on(window, 'resize', onScroll);

      /* ---------- smooth wheel scrolling (desktop only) ---------- */
      if (fine && opts.smooth !== false) {
        var target = window.scrollY, cur = window.scrollY, running = false, own = false;
        var loop = function () {
          cur += (target - cur) * 0.1;
          if (Math.abs(target - cur) < 0.4) { cur = target; running = false; }
          own = true; window.scrollTo(0, cur);
          if (running) requestAnimationFrame(loop);
        };
        var canScroll = function (n, dy) {
          while (n && n !== document.body && n.nodeType === 1) {
            var s = getComputedStyle(n);
            if (/(auto|scroll)/.test(s.overflowY) && n.scrollHeight > n.clientHeight + 1) {
              if ((dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 1) || (dy < 0 && n.scrollTop > 0)) return true;
            }
            n = n.parentNode;
          }
          return false;
        };
        on(window, 'wheel', function (e) {
          if (e.ctrlKey || e.defaultPrevented || canScroll(e.target, e.deltaY)) return;
          e.preventDefault();
          if (!running) { target = cur = window.scrollY; }
          var max = document.documentElement.scrollHeight - window.innerHeight;
          target = Math.max(0, Math.min(max, target + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
          if (!running) { running = true; requestAnimationFrame(loop); }
        }, { passive: false });
        on(window, 'scroll', function () { if (own) { own = false; return; } if (!running) { target = cur = window.scrollY; } });
      }

      /* ---------- custom cursor + magnetic pills + image hover (fine pointers) ---------- */
      if (fine) {
        var dot = document.createElement('div'), ring = document.createElement('div');
        dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
        dot.style.cssText = 'position:fixed;left:0;top:0;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#cbf24c;z-index:9999;pointer-events:none;mix-blend-mode:difference;transition:opacity .3s ease';
        ring.style.cssText = 'position:fixed;left:0;top:0;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;border:1px solid rgba(203,242,76,.7);z-index:9999;pointer-events:none;display:flex;align-items:center;justify-content:center;font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#22362b;transition:width .45s ' + EASE + ',height .45s ' + EASE + ',margin .45s ' + EASE + ',background .3s ease,border-color .3s ease,opacity .3s ease';
        document.body.appendChild(ring); document.body.appendChild(dot);
        cleanups.push(function () { dot.remove(); ring.remove(); });
        var mx = -100, my = -100, rx = -100, ry = -100, alive = true;
        var follow = function () {
          rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
          ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
          if (alive) requestAnimationFrame(follow);
        };
        requestAnimationFrame(follow);
        cleanups.push(function () { alive = false; });
        var setRing = function (mode) {
          if (mode === 'view') { ring.style.width = ring.style.height = '84px'; ring.style.margin = '-42px 0 0 -42px'; ring.style.background = '#cbf24c'; ring.style.borderColor = '#cbf24c'; ring.textContent = 'View'; dot.style.opacity = '0'; }
          else if (mode === 'link') { ring.style.width = ring.style.height = '58px'; ring.style.margin = '-29px 0 0 -29px'; ring.style.background = 'rgba(203,242,76,.14)'; ring.style.borderColor = 'rgba(203,242,76,.9)'; ring.textContent = ''; dot.style.opacity = '1'; }
          else { ring.style.width = ring.style.height = '38px'; ring.style.margin = '-19px 0 0 -19px'; ring.style.background = 'transparent'; ring.style.borderColor = 'rgba(203,242,76,.7)'; ring.textContent = ''; dot.style.opacity = '1'; }
        };
        var mag = null;
        on(window, 'pointermove', function (e) {
          mx = e.clientX; my = e.clientY;
          dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
          if (mag) {
            var r = mag.getBoundingClientRect();
            var dx = (mx - (r.left + r.width / 2)) * 0.28, dy = (my - (r.top + r.height / 2)) * 0.38;
            mag.style.translate = dx.toFixed(1) + 'px ' + dy.toFixed(1) + 'px';
          }
        }, { passive: true });
        on(document, 'pointerleave', function () { dot.style.opacity = ring.style.opacity = '0'; });
        on(document, 'pointerenter', function () { dot.style.opacity = ring.style.opacity = '1'; });
        var isPill = function (el) { return el && /border-radius:\s*999px/.test(el.getAttribute('style') || ''); };
        on(document, 'pointerover', function (e) {
          var a = e.target.closest && e.target.closest('a,button,summary,label,input,textarea,select');
          if (!a) { setRing(''); return; }
          var img = a.tagName === 'A' ? a.querySelector('img:not([src*="logo"]):not([src*="acc-"])') : null;
          setRing(img ? 'view' : 'link');
          if (img && !img._hz) {
            img._hz = true;
            img.style.transition = (img.style.transition ? img.style.transition + ', ' : '') + 'scale 1.1s ' + EASE;
          }
          if (img) img.style.scale = '1.06';
          if (isPill(a) && mag !== a) {
            mag = a;
            if (!a._mg) { a._mg = true; a.style.transition = (a.style.transition ? a.style.transition + ', ' : '') + 'translate .5s ' + EASE; }
          }
        });
        on(document, 'pointerout', function (e) {
          var a = e.target.closest && e.target.closest('a,button');
          if (!a || (e.relatedTarget && a.contains(e.relatedTarget))) return;
          var img = a.querySelector && a.querySelector('img');
          if (img && img._hz) img.style.scale = '1';
          if (mag === a) { a.style.translate = '0px 0px'; mag = null; }
        });
      }

      /* ---------- page transitions between site pages ---------- */
      on(document, 'click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a || a.target === '_blank') return;
        var href = a.getAttribute('href');
        if (!/\.dc\.html/.test(href)) return;
        var url = new URL(href, location.href);
        if (url.pathname === location.pathname && url.search === location.search) return;
        e.preventDefault();
        try { sessionStorage.setItem('sk-tx', '1'); } catch (err) {}
        var c = makeCurtain(false);
        requestAnimationFrame(function () { requestAnimationFrame(function () { c.style.transform = 'translateY(0)'; c.firstChild.style.opacity = '1'; }); });
        setTimeout(function () { location.href = url.href; }, 640);
      });

      scan(); tick();
      var mo = new MutationObserver(function () { scan(); tick(); });
      mo.observe(document.body, { childList: true, subtree: true });
      cleanups.push(function () { mo.disconnect(); });
      return function () { cleanups.forEach(function (f) { f(); }); };
    }
  };
})();
