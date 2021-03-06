/*!
 * Fotorama 4.4.7 | http://fotorama.io/license/
 */
! function (a, b, c, d, e) {
	"use strict";

	function f(a) {
		var b = "bez_" + d.makeArray(arguments).join("_").replace(".", "p");
		if ("function" != typeof d.easing[b]) {
			var c = function (a, b) {
				var c = [null, null],
					d = [null, null],
					e = [null, null],
					f = function (f, g) {
						return e[g] = 3 * a[g], d[g] = 3 * (b[g] - a[g]) - e[g], c[g] = 1 - e[g] - d[g], f * (e[g] + f * (d[g] + f * c[g]))
					},
					g = function (a) {
						return e[0] + a * (2 * d[0] + 3 * c[0] * a)
					},
					h = function (a) {
						for (var b, c = a, d = 0; ++d < 14 && (b = f(c, 0) - a, !(Math.abs(b) < .001));) c -= b / g(c);
						return c
					};
				return function (a) {
					return f(h(a), 1)
				}
			};
			d.easing[b] = function (b, d, e, f, g) {
				return f * c([a[0], a[1]], [a[2], a[3]])(d / g) + e
			}
		}
		return b
	}

	function g() {}

	function h(a, b, c) {
		return Math.max(isNaN(b) ? -1 / 0 : b, Math.min(isNaN(c) ? 1 / 0 : c, a))
	}

	function i(a) {
		return a.match(/ma/) && a.match(/-?\d+(?!d)/g)[a.match(/3d/) ? 12 : 4]
	}

	function j(a) {
		return Ac ? +i(a.css("transform")) : +a.css("left").replace("px", "")
	}

	function k(a, b) {
		var c = {};
		return Ac ? c.transform = "translate3d(" + (a + (b ? .001 : 0)) + "px,0,0)" : c.left = a, c
	}

	function l(a) {
		return {
			"transition-duration": a + "ms"
		}
	}

	function m(a, b) {
		return +String(a).replace(b || "px", "") || e
	}

	function n(a) {
		return /%$/.test(a) && m(a, "%")
	}

	function o(a) {
		return (!!m(a) || !!m(a, "%")) && a
	}

	function p(a, b, c, d) {
		return (a - (d || 0)) * (b + (c || 0))
	}

	function q(a, b, c, d) {
		return -Math.round(a / (b + (c || 0)) - (d || 0))
	}

	function r(a) {
		var b = a.data();
		if (!b.tEnd) {
			var c = a[0],
				d = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd otransitionend",
					msTransition: "MSTransitionEnd",
					transition: "transitionend"
				};
			c.addEventListener(d[jc.prefixed("transition")], function (a) {
				b.tProp && a.propertyName.match(b.tProp) && b.onEndFn()
			}, !1), b.tEnd = !0
		}
	}

	function s(a, b, c, d) {
		var e, f = a.data();
		f && (f.onEndFn = function () {
			e || (e = !0, clearTimeout(f.tT), c())
		}, f.tProp = b, clearTimeout(f.tT), f.tT = setTimeout(function () {
			f.onEndFn()
		}, 1.5 * d), r(a))
	}

	function t(a, b, c) {
		if (a.length) {
			var d = a.data();
			Ac ? (a.css(l(0)), d.onEndFn = g, clearTimeout(d.tT)) : a.stop();
			var e = u(b, function () {
				return j(a)
			});
			return a.css(k(e, c)), e
		}
	}

	function u() {
		for (var a, b = 0, c = arguments.length; c > b && (a = b ? arguments[b]() : arguments[b], "number" != typeof a); b++);
		return a
	}

	function v(a, b) {
		return Math.round(a + (b - a) / 1.5)
	}

	function w() {
		return w.p = w.p || ("https://" === c.protocol ? "https://" : "http://"), w.p
	}

	function x(a) {
		var c = b.createElement("a");
		return c.href = a, c
	}

	function y(a, b) {
		if ("string" != typeof a) return a;
		a = x(a);
		var c, d;
		if (a.host.match(/youtube\.com/) && a.search) {
			if (c = a.search.split("v=")[1]) {
				var e = c.indexOf("&"); - 1 !== e && (c = c.substring(0, e)), d = "youtube"
			}
		} else a.host.match(/youtube\.com|youtu\.be/) ? (c = a.pathname.replace(/^\/(embed\/|v\/)?/, "").replace(/\/.*/, ""), d = "youtube") : a.host.match(/vimeo\.com/) && (d = "vimeo", c = a.pathname.replace(/^\/(video\/)?/, "").replace(/\/.*/, ""));
		return c && d || !b || (c = a.href, d = "custom"), c ? {
			id: c,
			type: d,
			s: a.search.replace(/^\?/, "")
		} : !1
	}

	function z(a, b, c) {
		var e, f, g = a.video;
		return "youtube" === g.type ? (f = w() + "img.youtube.com/vi/" + g.id + "/default.jpg", e = f.replace(/\/default.jpg$/, "/hqdefault.jpg"), a.thumbsReady = !0) : "vimeo" === g.type ? d.ajax({
			url: w() + "vimeo.com/api/v2/video/" + g.id + ".json",
			dataType: "jsonp",
			success: function (d) {
				a.thumbsReady = !0, A(b, {
					img: d[0].thumbnail_large,
					thumb: d[0].thumbnail_small
				}, a.i, c)
			}
		}) : a.thumbsReady = !0, {
			img: e,
			thumb: f
		}
	}

	function A(a, b, c, e) {
		for (var f = 0, g = a.length; g > f; f++) {
			var h = a[f];
			if (h.i === c && h.thumbsReady) {
				var i = {
					videoReady: !0
				};
				i[Qc] = i[Sc] = i[Rc] = !1, e.splice(f, 1, d.extend({}, h, i, b));
				break
			}
		}
	}

	function B(a) {
		function b(a, b, e) {
			var f = a.children("img").eq(0),
				g = a.attr("href"),
				h = a.attr("src"),
				i = f.attr("src"),
				j = b.video,
				k = e ? y(g, j === !0) : !1;
			k ? g = !1 : k = j, c(a, f, d.extend(b, {
				video: k,
				img: b.img || g || h || i,
				thumb: b.thumb || i || h || g
			}))
		}

		function c(a, b, c) {
			var e = c.thumb && c.img !== c.thumb,
				f = m(c.width || a.attr("width")),
				g = m(c.height || a.attr("height"));
			d.extend(c, {
				width: f,
				height: g,
				thumbratio: Q(c.thumbratio || m(c.thumbwidth || b && b.attr("width") || e || f) / m(c.thumbheight || b && b.attr("height") || e || g))
			})
		}
		var e = [];
		return a.children().each(function () {
			var a = d(this),
				f = P(d.extend(a.data(), {
					id: a.attr("id")
				}));
			if (a.is("a, img")) b(a, f, !0);
			else {
				if (a.is(":empty")) return;
				c(a, null, d.extend(f, {
					html: this,
					_html: a.html()
				}))
			}
			e.push(f)
		}), e
	}

	function C(a) {
		return 0 === a.offsetWidth && 0 === a.offsetHeight
	}

	function D(a) {
		return !d.contains(b.documentElement, a)
	}

	function E(a, b, c) {
		a() ? b() : setTimeout(function () {
			E(a, b)
		}, c || 100)
	}

	function F(a) {
		c.replace(c.protocol + "//" + c.host + c.pathname.replace(/^\/?/, "/") + c.search + "#" + a)
	}

	function G(a, b, c) {
		var d = a.data(),
			e = d.measures;
		if (e && (!d.l || d.l.W !== e.width || d.l.H !== e.height || d.l.r !== e.ratio || d.l.w !== b.w || d.l.h !== b.h || d.l.m !== c)) {
			var f = e.width,
				g = e.height,
				i = b.w / b.h,
				j = e.ratio >= i,
				k = "scaledown" === c,
				l = "contain" === c,
				m = "cover" === c;
			j && (k || l) || !j && m ? (f = h(b.w, 0, k ? f : 1 / 0), g = f / e.ratio) : (j && m || !j && (k || l)) && (g = h(b.h, 0, k ? g : 1 / 0), f = g * e.ratio), a.css({
				width: Math.ceil(f),
				height: Math.ceil(g),
				marginLeft: Math.floor(-f / 2),
				marginTop: Math.floor(-g / 2)
			}), d.l = {
				W: e.width,
				H: e.height,
				r: e.ratio,
				w: b.w,
				h: b.h,
				m: c
			}
		}
		return !0
	}

	function H(a, b) {
		var c = a[0];
		c.styleSheet ? c.styleSheet.cssText = b : a.html(b)
	}

	function I(a, b, c) {
		return b === c ? !1 : b >= a ? "left" : a >= c ? "right" : "left right"
	}

	function J(a, b, c, d) {
		if (!c) return !1;
		if (!isNaN(a)) return a - (d ? 0 : 1);
		for (var e, f = 0, g = b.length; g > f; f++) {
			var h = b[f];
			if (h.id === a) {
				e = f;
				break
			}
		}
		return e
	}

	function K(a, b, c) {
		c = c || {}, a.each(function () {
			var a, e = d(this),
				f = e.data();
			f.clickOn || (f.clickOn = !0, d.extend(W(e, {
				onStart: function (b) {
					a = b, (c.onStart || g).call(this, b)
				},
				onMove: c.onMove || g,
				onEnd: function (d) {
					d.moved || c.tail.checked || b.call(this, a)
				}
			}), c.tail))
		})
	}

	function L(a, b) {
		return '<div class="' + a + '">' + (b || "") + "</div>"
	}

	function M(a) {
		for (var b = a.length; b;) {
			var c = Math.floor(Math.random() * b--),
				d = a[b];
			a[b] = a[c], a[c] = d
		}
		return a
	}

	function N(a) {
		return "[object Array]" == Object.prototype.toString.call(a) && d.map(a, function (a) {
			return d.extend({}, a)
		})
	}

	function O(a, b) {
		wc.scrollLeft(a).scrollTop(b)
	}

	function P(a) {
		if (a) {
			var b = {};
			return d.each(a, function (a, c) {
				b[a.toLowerCase()] = c
			}), b
		}
	}

	function Q(a) {
		if (a) {
			var b = +a;
			return isNaN(b) ? (b = a.split("/"), +b[0] / +b[1] || e) : b
		}
	}

	function R(a, b) {
		a.preventDefault(), b && a.stopPropagation()
	}

	function S(a) {
		return a ? ">" : "<"
	}

	function T(a, b) {
		var c = Math.round(b.pos),
			e = b.onEnd || g;
		"undefined" != typeof b.overPos && b.overPos !== b.pos && (c = b.overPos, e = function () {
			T(a, d.extend({}, b, {
				overPos: b.pos,
				time: Math.max(Jc, b.time / 2)
			}))
		});
		var f = d.extend(k(c, b._001), b.width && {
			width: b.width
		});
		Ac ? (a.css(d.extend(l(b.time), f)), b.time > 10 ? s(a, "transform", e, b.time) : e()) : a.stop().animate(f, b.time, Tc, e)
	}

	function U(a, b, c, e, f, h) {
		var i = "undefined" != typeof h;
		if (i || (f.push(arguments), Array.prototype.push.call(arguments, f.length), !(f.length > 1))) {
			a = a || d(a), b = b || d(b);
			var j = a[0],
				k = b[0],
				l = "crossfade" === e.method,
				m = function () {
					if (!m.done) {
						m.done = !0;
						var a = (i || f.shift()) && f.shift();
						a && U.apply(this, a), (e.onEnd || g)(!!a)
					}
				},
				n = e.time / (h || 1);
			c.not(a.addClass(Hb).removeClass(Gb)).not(b.addClass(Gb).removeClass(Hb)).removeClass(Hb + " " + Gb), a.stop(), b.stop(), l && k && a.fadeTo(0, 0), a.fadeTo(l ? n : 1, 1, l && m), b.fadeTo(n, 0, m), j && l || k || m()
		}
	}

	function V(a) {
		var b = (a.touches || [])[0] || a;
		a._x = b.pageX, a._y = b.clientY
	}

	function W(c, e) {
		function f(a) {
			return n = d(a.target), t.checked = q = r = !1, l || t.flow || a.touches && a.touches.length > 1 || a.which > 1 || sc && sc.type !== a.type && uc || (q = e.select && n.is(e.select, s)) ? q : (p = "touchstart" === a.type, r = n.is("a, a *", s), V(a), m = sc = a, tc = a.type.replace(/down|start/, "move").replace(/Down/, "Move"), o = t.control, (e.onStart || g).call(s, a, {
				control: o,
				$target: n
			}), l = t.flow = !0, (!p || t.go) && R(a), void 0)
		}

		function h(a) {
			if (a.touches && a.touches.length > 1 || Gc && !a.isPrimary || tc !== a.type || !l) return l && i(), void 0;
			V(a);
			var b = Math.abs(a._x - m._x),
				c = Math.abs(a._y - m._y),
				d = b - c,
				f = (t.go || t.x || d >= 0) && !t.noSwipe,
				h = 0 > d;
			p && !t.checked ? (l = f) && R(a) : (R(a), (e.onMove || g).call(s, a, {
				touch: p
			})), t.checked = t.checked || f || h
		}

		function i(a) {
			var b = l;
			t.control = l = !1, b && (t.flow = !1), !b || r && !t.checked || (a && R(a), uc = !0, clearTimeout(vc), vc = setTimeout(function () {
				uc = !1
			}, 1e3), (e.onEnd || g).call(s, {
				moved: t.checked,
				$target: n,
				control: o,
				touch: p,
				startEvent: m,
				aborted: !a || "MSPointerCancel" === a.type
			}))
		}

		function j() {
			t.flow || setTimeout(function () {
				t.flow = !0
			}, 10)
		}

		function k() {
			t.flow && setTimeout(function () {
				t.flow = !1
			}, Ic)
		}
		var l, m, n, o, p, q, r, s = c[0],
			t = {};
		return Gc ? (s[Fc]("MSPointerDown", f, !1), b[Fc]("MSPointerMove", h, !1), b[Fc]("MSPointerCancel", i, !1), b[Fc]("MSPointerUp", i, !1)) : (s[Fc] && (s[Fc]("touchstart", f, !1), s[Fc]("touchmove", h, !1), s[Fc]("touchend", i, !1), b[Fc]("touchstart", j, !1), b[Fc]("touchend", k, !1), b[Fc]("touchcancel", k, !1), a[Fc]("scroll", k, !1)), c.on("mousedown", f), xc.on("mousemove", h).on("mouseup", i)), c.on("click", "a", function (a) {
			t.checked && R(a)
		}), t
	}

	function X(a, b) {
		function c(c) {
			j = l = c._x, q = d.now(), p = [
				[q, j]
			], m = n = C.noMove ? 0 : t(a, (b.getPos || g)(), b._001), (b.onStart || g).call(A, c)
		}

		function e(a, b) {
			s = B.min, u = B.max, w = B.snap, x = a.altKey, z = !1, y = b.control, y || c(a)
		}

		function f(e, f) {
			y && (y = !1, c(e)), C.noSwipe || (l = e._x, p.push([d.now(), l]), n = m - (j - l), o = I(n, s, u), s >= n ? n = v(n, s) : n >= u && (n = v(n, u)), C.noMove || (a.css(k(n, b._001)), z || (z = !0, f.touch || Gc || a.addClass(Wb)), (b.onMove || g).call(A, e, {
				pos: n,
				edge: o
			})))
		}

		function i(c) {
			if (!y) {
				c.touch || Gc || a.removeClass(Wb), r = (new Date).getTime();
				for (var e, f, i, j, k, o, q, t, v, z = r - Ic, B = null, C = Jc, D = b.friction, E = p.length - 1; E >= 0; E--) {
					if (e = p[E][0], f = Math.abs(e - z), null === B || i > f) B = e, j = p[E][1];
					else if (B === z || f > i) break;
					i = f
				}
				q = h(n, s, u);
				var F = j - l,
					G = F >= 0,
					H = r - B,
					I = H > Ic,
					J = !I && n !== m && q === n;
				w && (q = h(Math[J ? G ? "floor" : "ceil" : "round"](n / w) * w, s, u), s = u = q), J && (w || q === n) && (v = -(F / H), C *= h(Math.abs(v), b.timeLow, b.timeHigh), k = Math.round(n + v * C / D), w || (q = k), (!G && k > u || G && s > k) && (o = G ? s : u, t = k - o, w || (q = o), t = h(q + .03 * t, o - 50, o + 50), C = Math.abs((n - t) / (v / D)))), C *= x ? 10 : 1, (b.onEnd || g).call(A, d.extend(c, {
					pos: n,
					newPos: q,
					overPos: t,
					time: C,
					moved: I ? w : Math.abs(n - m) > (w ? 0 : 3)
				}))
			}
		}
		var j, l, m, n, o, p, q, r, s, u, w, x, y, z, A = a[0],
			B = a.data(),
			C = {};
		return C = d.extend(W(b.$wrap, {
			onStart: e,
			onMove: f,
			onEnd: i,
			select: b.select,
			control: b.control
		}), C)
	}

	function Y(a, b) {
		var c, e, f, h = a[0],
			i = {
				prevent: {}
			};
		return h[Fc] && h[Fc](Hc, function (a) {
			var h = a.wheelDeltaY || -1 * a.deltaY || 0,
				j = a.wheelDeltaX || -1 * a.deltaX || 0,
				k = Math.abs(j) > Math.abs(h),
				l = S(0 > j),
				m = e === l,
				n = d.now(),
				o = Ic > n - f;
			e = l, f = n, k && i.ok && (!i.prevent[l] || c) && (R(a, !0), c && m && o || (b.shift && (c = !0, clearTimeout(i.t), i.t = setTimeout(function () {
				c = !1
			}, Kc)), (b.onEnd || g)(a, b.shift ? l : j)))
		}, !1), i
	}

	function Z() {
		d.each(d.Fotorama.instances, function (a, b) {
			b.index = a
		})
	}

	function $(a) {
		d.Fotorama.instances.push(a), Z()
	}

	function _(a) {
		d.Fotorama.instances.splice(a.index, 1), Z()
	}
	var ab = "fotorama",
		bb = "fullscreen",
		cb = ab + "__wrap",
		db = cb + "--css2",
		eb = cb + "--css3",
		fb = cb + "--video",
		gb = cb + "--fade",
		hb = cb + "--slide",
		ib = cb + "--no-controls",
		jb = cb + "--no-shadows",
		kb = cb + "--pan-y",
		lb = cb + "--rtl",
		mb = ab + "__stage",
		nb = mb + "__frame",
		ob = nb + "--video",
		pb = mb + "__shaft",
		qb = mb + "--only-active",
		rb = ab + "__grab",
		sb = ab + "__pointer",
		tb = ab + "__arr",
		ub = tb + "--disabled",
		vb = tb + "--prev",
		wb = tb + "--next",
		xb = ab + "__nav",
		yb = xb + "-wrap",
		zb = xb + "__shaft",
		Ab = xb + "--dots",
		Bb = xb + "--thumbs",
		Cb = xb + "__frame",
		Db = Cb + "--dot",
		Eb = Cb + "--thumb",
		Fb = ab + "__fade",
		Gb = Fb + "-front",
		Hb = Fb + "-rear",
		Ib = ab + "__shadow",
		Jb = Ib + "s",
		Kb = Jb + "--left",
		Lb = Jb + "--right",
		Mb = ab + "__active",
		Nb = ab + "__select",
		Ob = ab + "--hidden",
		Pb = ab + "--fullscreen",
		Qb = ab + "__fullscreen-icon",
		Rb = ab + "__error",
		Sb = ab + "__loading",
		Tb = ab + "__loaded",
		Ub = Tb + "--full",
		Vb = Tb + "--img",
		Wb = ab + "__grabbing",
		Xb = ab + "__img",
		Yb = Xb + "--full",
		Zb = ab + "__dot",
		$b = ab + "__thumb",
		_b = $b + "-border",
		ac = ab + "__html",
		bc = ab + "__video",
		cc = bc + "-play",
		dc = bc + "-close",
		ec = ab + "__caption",
		fc = ab + "__caption__wrap",
		gc = ab + "__spinner",
		hc = d && d.fn.jquery.split(".");
	if (!hc || hc[0] < 1 || 1 == hc[0] && hc[1] < 8) throw "Fotorama requires jQuery 1.8 or later and will not run without it.";
	var ic = {},
		jc = function (a, b, c) {
			function d(a) {
				r.cssText = a
			}

			function e(a, b) {
				return typeof a === b
			}

			function f(a, b) {
				return !!~("" + a).indexOf(b)
			}

			function g(a, b) {
				for (var d in a) {
					var e = a[d];
					if (!f(e, "-") && r[e] !== c) return "pfx" == b ? e : !0
				}
				return !1
			}

			function h(a, b, d) {
				for (var f in a) {
					var g = b[a[f]];
					if (g !== c) return d === !1 ? a[f] : e(g, "function") ? g.bind(d || b) : g
				}
				return !1
			}

			function i(a, b, c) {
				var d = a.charAt(0).toUpperCase() + a.slice(1),
					f = (a + " " + u.join(d + " ") + d).split(" ");
				return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + v.join(d + " ") + d).split(" "), h(f, b, c))
			}
			var j, k, l, m = "2.6.2",
				n = {},
				o = b.documentElement,
				p = "modernizr",
				q = b.createElement(p),
				r = q.style,
				s = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
				t = "Webkit Moz O ms",
				u = t.split(" "),
				v = t.toLowerCase().split(" "),
				w = {},
				x = [],
				y = x.slice,
				z = function (a, c, d, e) {
					var f, g, h, i, j = b.createElement("div"),
						k = b.body,
						l = k || b.createElement("body");
					if (parseInt(d, 10))
						for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : p + (d + 1), j.appendChild(h);
					return f = ["&#173;", '<style id="s', p, '">', a, "</style>"].join(""), j.id = p, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = o.style.overflow, o.style.overflow = "hidden", o.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), o.style.overflow = i), !!g
				},
				A = {}.hasOwnProperty;
			l = e(A, "undefined") || e(A.call, "undefined") ? function (a, b) {
				return b in a && e(a.constructor.prototype[b], "undefined")
			} : function (a, b) {
				return A.call(a, b)
			}, Function.prototype.bind || (Function.prototype.bind = function (a) {
				var b = this;
				if ("function" != typeof b) throw new TypeError;
				var c = y.call(arguments, 1),
					d = function () {
						if (this instanceof d) {
							var e = function () {};
							e.prototype = b.prototype;
							var f = new e,
								g = b.apply(f, c.concat(y.call(arguments)));
							return Object(g) === g ? g : f
						}
						return b.apply(a, c.concat(y.call(arguments)))
					};
				return d
			}), w.csstransforms3d = function () {
				var a = !!i("perspective");
				return a
			};
			for (var B in w) l(w, B) && (k = B.toLowerCase(), n[k] = w[B](), x.push((n[k] ? "" : "no-") + k));
			return n.addTest = function (a, b) {
				if ("object" == typeof a)
					for (var d in a) l(a, d) && n.addTest(d, a[d]);
				else {
					if (a = a.toLowerCase(), n[a] !== c) return n;
					b = "function" == typeof b ? b() : b, "undefined" != typeof enableClasses && enableClasses && (o.className += " " + (b ? "" : "no-") + a), n[a] = b
				}
				return n
			}, d(""), q = j = null, n._version = m, n._prefixes = s, n._domPrefixes = v, n._cssomPrefixes = u, n.testProp = function (a) {
				return g([a])
			}, n.testAllProps = i, n.testStyles = z, n.prefixed = function (a, b, c) {
				return b ? i(a, b, c) : i(a, "pfx")
			}, n
		}(a, b),
		kc = {
			ok: !1,
			is: function () {
				return !1
			},
			request: function () {},
			cancel: function () {},
			event: "",
			prefix: ""
		},
		lc = "webkit moz o ms khtml".split(" ");
	if ("undefined" != typeof b.cancelFullScreen) kc.ok = !0;
	else
		for (var mc = 0, nc = lc.length; nc > mc; mc++)
			if (kc.prefix = lc[mc], "undefined" != typeof b[kc.prefix + "CancelFullScreen"]) {
				kc.ok = !0;
				break
			} kc.ok && (kc.event = kc.prefix + "fullscreenchange", kc.is = function () {
		switch (this.prefix) {
			case "":
				return b.fullScreen;
			case "webkit":
				return b.webkitIsFullScreen;
			default:
				return b[this.prefix + "FullScreen"]
		}
	}, kc.request = function (a) {
		return "" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
	}, kc.cancel = function () {
		return "" === this.prefix ? b.cancelFullScreen() : b[this.prefix + "CancelFullScreen"]()
	});
	var oc, pc = {
		lines: 12,
		length: 5,
		width: 2,
		radius: 7,
		corners: 1,
		rotate: 15,
		color: "rgba(128, 128, 128, .75)",
		hwaccel: !0
	};
	! function (a, b) {
		oc = b()
	}(this, function () {
		function a(a, c) {
			var d, e = b.createElement(a || "div");
			for (d in c) e[d] = c[d];
			return e
		}

		function c(a) {
			for (var b = 1, c = arguments.length; c > b; b++) a.appendChild(arguments[b]);
			return a
		}

		function d(a, b, c, d) {
			var e = ["opacity", b, ~~(100 * a), c, d].join("-"),
				f = .01 + 100 * (c / d),
				g = Math.max(1 - (1 - a) / b * (100 - f), a),
				h = m.substring(0, m.indexOf("Animation")).toLowerCase(),
				i = h && "-" + h + "-" || "";
			return o[e] || (p.insertRule("@" + i + "keyframes " + e + "{" + "0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}" + "100%{opacity:" + g + "}" + "}", p.cssRules.length), o[e] = 1), e
		}

		function f(a, b) {
			var c, d, f = a.style;
			for (b = b.charAt(0).toUpperCase() + b.slice(1), d = 0; d < n.length; d++)
				if (c = n[d] + b, f[c] !== e) return c;
			return f[b] !== e ? b : void 0
		}

		function g(a, b) {
			for (var c in b) a.style[f(a, c) || c] = b[c];
			return a
		}

		function h(a) {
			for (var b = 1; b < arguments.length; b++) {
				var c = arguments[b];
				for (var d in c) a[d] === e && (a[d] = c[d])
			}
			return a
		}

		function i(a) {
			for (var b = {
					x: a.offsetLeft,
					y: a.offsetTop
				}; a = a.offsetParent;) b.x += a.offsetLeft, b.y += a.offsetTop;
			return b
		}

		function j(a, b) {
			return "string" == typeof a ? a : a[b % a.length]
		}

		function k(a) {
			return "undefined" == typeof this ? new k(a) : (this.opts = h(a || {}, k.defaults, q), void 0)
		}

		function l() {
			function b(b, c) {
				return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c)
			}
			p.addRule(".spin-vml", "behavior:url(#default#VML)"), k.prototype.lines = function (a, d) {
				function e() {
					return g(b("group", {
						coordsize: k + " " + k,
						coordorigin: -i + " " + -i
					}), {
						width: k,
						height: k
					})
				}

				function f(a, f, h) {
					c(m, c(g(e(), {
						rotation: 360 / d.lines * a + "deg",
						left: ~~f
					}), c(g(b("roundrect", {
						arcsize: d.corners
					}), {
						width: i,
						height: d.width,
						left: d.radius,
						top: -d.width >> 1,
						filter: h
					}), b("fill", {
						color: j(d.color, a),
						opacity: d.opacity
					}), b("stroke", {
						opacity: 0
					}))))
				}
				var h, i = d.length + d.width,
					k = 2 * i,
					l = 2 * -(d.width + d.length) + "px",
					m = g(e(), {
						position: "absolute",
						top: l,
						left: l
					});
				if (d.shadow)
					for (h = 1; h <= d.lines; h++) f(h, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
				for (h = 1; h <= d.lines; h++) f(h);
				return c(a, m)
			}, k.prototype.opacity = function (a, b, c, d) {
				var e = a.firstChild;
				d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c))
			}
		}
		var m, n = ["webkit", "Moz", "ms", "O"],
			o = {},
			p = function () {
				var d = a("style", {
					type: "text/css"
				});
				return c(b.getElementsByTagName("head")[0], d), d.sheet || d.styleSheet
			}(),
			q = {
				lines: 12,
				length: 7,
				width: 5,
				radius: 10,
				rotate: 0,
				corners: 1,
				color: "#000",
				direction: 1,
				speed: 1,
				trail: 100,
				opacity: .25,
				fps: 20,
				zIndex: 2e9,
				className: "spinner",
				top: "auto",
				left: "auto",
				position: "relative"
			};
		k.defaults = {}, h(k.prototype, {
			spin: function (b) {
				this.stop();
				var c, d, e = this,
					f = e.opts,
					h = e.el = g(a(0, {
						className: f.className
					}), {
						position: f.position,
						width: 0,
						zIndex: f.zIndex
					}),
					j = f.radius + f.length + f.width;
				if (b && (b.insertBefore(h, b.firstChild || null), d = i(b), c = i(h), g(h, {
						left: ("auto" == f.left ? d.x - c.x + (b.offsetWidth >> 1) : parseInt(f.left, 10) + j) + "px",
						top: ("auto" == f.top ? d.y - c.y + (b.offsetHeight >> 1) : parseInt(f.top, 10) + j) + "px"
					})), h.setAttribute("role", "progressbar"), e.lines(h, e.opts), !m) {
					var k, l = 0,
						n = (f.lines - 1) * (1 - f.direction) / 2,
						o = f.fps,
						p = o / f.speed,
						q = (1 - f.opacity) / (p * f.trail / 100),
						r = p / f.lines;
					! function s() {
						l++;
						for (var a = 0; a < f.lines; a++) k = Math.max(1 - (l + (f.lines - a) * r) % p * q, f.opacity), e.opacity(h, a * f.direction + n, k, f);
						e.timeout = e.el && setTimeout(s, ~~(1e3 / o))
					}()
				}
				return e
			},
			stop: function () {
				var a = this.el;
				return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = e), this
			},
			lines: function (b, e) {
				function f(b, c) {
					return g(a(), {
						position: "absolute",
						width: e.length + e.width + "px",
						height: e.width + "px",
						background: b,
						boxShadow: c,
						transformOrigin: "left",
						transform: "rotate(" + ~~(360 / e.lines * i + e.rotate) + "deg) translate(" + e.radius + "px" + ",0)",
						borderRadius: (e.corners * e.width >> 1) + "px"
					})
				}
				for (var h, i = 0, k = (e.lines - 1) * (1 - e.direction) / 2; i < e.lines; i++) h = g(a(), {
					position: "absolute",
					top: 1 + ~(e.width / 2) + "px",
					transform: e.hwaccel ? "translate3d(0,0,0)" : "",
					opacity: e.opacity,
					animation: m && d(e.opacity, e.trail, k + i * e.direction, e.lines) + " " + 1 / e.speed + "s linear infinite"
				}), e.shadow && c(h, g(f("#000", "0 0 4px #000"), {
					top: "2px"
				})), c(b, c(h, f(j(e.color, i), "0 0 1px rgba(0,0,0,.1)")));
				return b
			},
			opacity: function (a, b, c) {
				b < a.childNodes.length && (a.childNodes[b].style.opacity = c)
			}
		});
		var r = g(a("group"), {
			behavior: "url(#default#VML)"
		});
		return !f(r, "transform") && r.adj ? l() : m = f(r, "animation"), k
	});
	var qc, rc, sc, tc, uc, vc, wc = d(a),
		xc = d(b),
		yc = "quirks" === c.hash.replace("#", ""),
		zc = jc.csstransforms3d,
		Ac = zc && !yc,
		Bc = zc || "CSS1Compat" === b.compatMode,
		Cc = kc.ok,
		Dc = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
		Ec = !Ac || Dc,
		Fc = "addEventListener",
		Gc = a.navigator.msPointerEnabled,
		Hc = "onwheel" in b.createElement("div") ? "wheel" : b.onmousewheel !== e ? "mousewheel" : "DOMMouseScroll",
		Ic = 250,
		Jc = 300,
		Kc = 1400,
		Lc = 5e3,
		Mc = 2,
		Nc = 64,
		Oc = 500,
		Pc = 333,
		Qc = "$stageFrame",
		Rc = "$navDotFrame",
		Sc = "$navThumbFrame",
		Tc = f([.1, 0, .25, 1]);
	jQuery.Fotorama = function (a, f) {
		function i() {
			d.each(ld, function (a, b) {
				if (!b.i) {
					b.i = Yd++;
					var c = y(b.video, !0);
					if (c) {
						var d = {};
						b.video = c, b.img || b.thumb ? b.thumbsReady = !0 : d = z(b, ld, Ud), A(ld, {
							img: d.img,
							thumb: d.thumb
						}, b.i, Ud)
					}
				}
			})
		}

		function j(a) {
			var b = "keydown." + ab,
				c = "keydown." + ab + Vd,
				d = "resize." + ab + Vd;
			a ? (xc.on(c, function (a) {
				pd && 27 === a.keyCode ? (R(a), cd(pd, !0, !0)) : (Ud.fullScreen || f.keyboard && !Ud.index) && (27 === a.keyCode ? (R(a), Ud.cancelFullScreen()) : 39 === a.keyCode || 40 === a.keyCode && Ud.fullScreen ? (R(a), Ud.show({
					index: ">",
					slow: a.altKey,
					user: !0
				})) : (37 === a.keyCode || 38 === a.keyCode && Ud.fullScreen) && (R(a), Ud.show({
					index: "<",
					slow: a.altKey,
					user: !0
				})))
			}), Ud.index || xc.off(b).on(b, "textarea, input, select", function (a) {
				!rc.hasClass(bb) && a.stopPropagation()
			}), wc.on(d, Ud.resize)) : (xc.off(c), wc.off(d))
		}

		function r(b) {
			b !== r.f && (b ? (a.html("").addClass(ab + " " + Wd).append(ae).before($d).before(_d), $(Ud)) : (ae.detach(), $d.detach(), _d.detach(), a.html(Zd.urtext).removeClass(Wd), _(Ud)), j(b), r.f = b)
		}

		function s() {
			ld = Ud.data = ld || N(f.data) || B(a), md = Ud.size = ld.length, !kd.ok && f.shuffle && M(ld), i(), ve = W(ve), md && r(!0)
		}

		function v() {
			var a = 2 > md || pd;
			ye.noMove = a || Ed, ye.noSwipe = a || !f.swipe, ce.toggleClass(rb, !ye.noMove && !ye.noSwipe), Gc && ae.toggleClass(kb, !ye.noSwipe)
		}

		function w(a) {
			a === !0 && (a = ""), f.autoplay = Math.max(+a || Lc, 1.5 * Hd)
		}

		function x(a) {
			return a ? "add" : "remove"
		}

		function C() {
			Ud.options = f = P(f), Ed = "crossfade" === f.transition || "dissolve" === f.transition, yd = f.loop && (md > 2 || Ed), Hd = +f.transitionduration || Jc, Jd = "rtl" === f.direction;
			var a = {
				add: [],
				remove: []
			};
			md > 1 ? (zd = f.nav, Bd = "top" === f.navposition, a.remove.push(Nb), ge.toggle(f.arrows)) : (zd = !1, ge.hide()), od = new oc(d.extend(pc, f.spinner)), zc(), Dc(), f.autoplay && w(f.autoplay), Fd = m(f.thumbwidth) || Nc, Gd = m(f.thumbheight) || Nc, ze.ok = Be.ok = f.trackpad && !Ec, v(), Wc(f, !0), Ad = "thumbs" === zd, Ad ? (mc(md, "navThumb"), nd = le, Td = Sc, H($d, d.Fotorama.jst.style({
				w: Fd,
				h: Gd,
				b: f.thumbborderwidth,
				m: f.thumbmargin,
				s: Vd,
				q: !Bc
			})), ie.addClass(Bb).removeClass(Ab)) : "dots" === zd ? (mc(md, "navDot"), nd = ke, Td = Rc, ie.addClass(Ab).removeClass(Bb)) : (zd = !1, ie.removeClass(Bb + " " + Ab)), zd && (Bd ? he.insertBefore(be) : he.insertAfter(be), uc.nav = !1, uc(nd, je, "nav")), Cd = f.allowfullscreen, Cd ? (pe.appendTo(be), Dd = Cc && "native" === Cd) : (pe.detach(), Dd = !1), a[x(Ed)].push(gb), a[x(!Ed)].push(hb), a[x(Jd)].push(lb), Id = f.shadows && !Ec, a[x(!Id)].push(jb), jc(), ae.addClass(a.add.join(" ")).removeClass(a.remove.join(" ")), we = d.extend({}, f)
		}

		function V(a) {
			return 0 > a ? (md + a % md) % md : a >= md ? a % md : a
		}

		function W(a) {
			return h(a, 0, md - 1)
		}

		function Z(a) {
			return yd ? V(a) : W(a)
		}

		function Fb(a) {
			return a > 0 || yd ? a - 1 : !1
		}

		function Gb(a) {
			return md - 1 > a || yd ? a + 1 : !1
		}

		function Hb() {
			me.min = yd ? -1 / 0 : -p(md - 1, xe.w, f.margin, sd), me.max = yd ? 1 / 0 : -p(0, xe.w, f.margin, sd), me.snap = xe.w + f.margin
		}

		function Ib() {
			ne.min = Math.min(0, xe.W - je.width()), ne.max = 0, je.toggleClass(rb, !(Ae.noMove = ne.min === ne.max))
		}

		function Wb(a, b, c) {
			if ("number" == typeof a) {
				a = new Array(a);
				var e = !0
			}
			return d.each(a, function (a, d) {
				if (e && (d = a), "number" == typeof d) {
					var f = ld[V(d)];
					if (f) {
						var g = "$" + b + "Frame",
							h = f[g];
						c.call(this, a, d, f, h, g, h && h.data())
					}
				}
			})
		}

		function bc(a, b, c, d) {
			(!Kd || "*" === Kd && d === xd) && (a = o(f.width) || o(a) || Oc, b = o(f.height) || o(b) || Pc, Ud.resize({
				width: a,
				ratio: f.ratio || c || a / b
			}, 0, d === xd ? !0 : "*"))
		}

		function hc(a, b, c, e, g) {
			Wb(a, b, function (a, h, i, j, k, l) {
				function m(a) {
					var b = V(h);
					Xc(a, {
						index: b,
						src: v,
						frame: ld[b]
					})
				}

				function n() {
					s.remove(), d.Fotorama.cache[v] = "error", i.html && "stage" === b || !w || w === v ? (!v || i.html || q ? "stage" === b && (j.trigger("f:load").removeClass(Sb + " " + Rb).addClass(Tb), m("load"), bc()) : (j.trigger("f:error").removeClass(Sb).addClass(Rb), m("error")), l.state = "error", !(md > 1) || i.html || i.deleted || i.video || q || (i.deleted = !0, Ud.splice(h, 1))) : (i[u] = v = w, hc([h], b, c, e, !0))
				}

				function o() {
					d.Fotorama.measures[v] = t.measures = d.Fotorama.measures[v] || {
						width: r.width,
						height: r.height,
						ratio: r.width / r.height
					}, bc(t.measures.width, t.measures.height, t.measures.ratio, h), s.off("load error").addClass(Xb + (q ? " " + Yb : "")).prependTo(j), G(s, c || xe, e || i.fit || f.fit), d.Fotorama.cache[v] = l.state = "loaded", setTimeout(function () {
						j.trigger("f:load").removeClass(Sb + " " + Rb).addClass(Tb + " " + (q ? Ub : Vb)), "stage" === b && m("load")
					}, 5)
				}

				function p() {
					var a = 10;
					E(function () {
						return !Rd || !a-- && !Ec
					}, function () {
						o()
					})
				}
				if (j) {
					var q = Ud.fullScreen && i.full && i.full !== i.img && !l.$full && "stage" === b;
					if (!l.$img || g || q) {
						var r = new Image,
							s = d(r),
							t = s.data();
						l[q ? "$full" : "$img"] = s;
						var u = "stage" === b ? q ? "full" : "img" : "thumb",
							v = i[u],
							w = q ? null : i["stage" === b ? "thumb" : "img"];
						if ("navThumb" === b && (j = l.$wrap), !v) return n(), void 0;
						d.Fotorama.cache[v] ? ! function x() {
							"error" === d.Fotorama.cache[v] ? n() : "loaded" === d.Fotorama.cache[v] ? setTimeout(p, 0) : setTimeout(x, 100)
						}() : (d.Fotorama.cache[v] = "*", s.on("load", p).on("error", n)), l.state = "", r.src = v
					}
				}
			})
		}

		function ic(a) {
			ue.append(od.spin().el).appendTo(a)
		}

		function jc() {
			ue.detach(), od.stop()
		}

		function lc() {
			var a = Ud.activeFrame[Qc];
			a && !a.data().state && (ic(a), a.on("f:load f:error", function () {
				a.off("f:load f:error"), jc()
			}))
		}

		function mc(a, b) {
			Wb(a, b, function (a, c, e, g, h, i) {
				g || (g = e[h] = ae[h].clone(), i = g.data(), i.data = e, "stage" === b ? (e.html && d('<div class="' + ac + '"></div>').append(e._html ? d(e.html).removeAttr("id").html(e._html) : e.html).appendTo(g), f.captions && e.caption && d(L(ec, L(fc, e.caption))).appendTo(g), e.video && g.addClass(ob).append(re.clone()), de = de.add(g)) : "navDot" === b ? ke = ke.add(g) : "navThumb" === b && (i.$wrap = g.children(":first"), le = le.add(g), e.video && g.append(re.clone())))
			})
		}

		function nc(a, b, c) {
			return a && a.length && G(a, b, c)
		}

		function sc(a) {
			Wb(a, "stage", function (a, b, c, e, g, h) {
				if (e) {
					De[Qc][V(b)] = e.css(d.extend({
						left: Ed ? 0 : p(b, xe.w, f.margin, sd)
					}, Ed && l(0))), D(e[0]) && (e.appendTo(ce), cd(c.$video));
					var i = c.fit || f.fit;
					nc(h.$img, xe, i), nc(h.$full, xe, i)
				}
			})
		}

		function tc(a, b) {
			if ("thumbs" === zd && !isNaN(a)) {
				var c = -a,
					e = -a + xe.w;
				le.each(function () {
					var a = d(this),
						f = a.data(),
						g = f.eq,
						h = {
							h: Gd
						},
						i = "cover";
					h.w = f.w, f.l + f.w < c || f.l > e || nc(f.$img, h, i) || b && hc([g], "navThumb", h, i)
				})
			}
		}

		function uc(a, b, c) {
			if (!uc[c]) {
				var e = "nav" === c && Ad,
					g = 0;
				b.append(a.filter(function () {
					for (var a, b = d(this), c = b.data(), e = 0, f = ld.length; f > e; e++)
						if (c.data === ld[e]) {
							a = !0, c.eq = e;
							break
						} return a || b.remove() && !1
				}).sort(function (a, b) {
					return d(a).data().eq - d(b).data().eq
				}).each(function () {
					if (e) {
						var a = d(this),
							b = a.data(),
							c = Math.round(Gd * b.data.thumbratio) || Fd;
						b.l = g, b.w = c, a.css({
							width: c
						}), g += c + f.thumbmargin
					}
				})), uc[c] = !0
			}
		}

		function vc(a) {
			return a - Ee > xe.w / 3
		}

		function yc(a) {
			return !(yd || ve + a && ve - md + a || pd)
		}

		function zc() {
			ee.toggleClass(ub, yc(0)), fe.toggleClass(ub, yc(1))
		}

		function Dc() {
			ze.ok && (ze.prevent = {
				"<": yc(0),
				">": yc(1)
			})
		}

		function Fc(a) {
			var b, c, d = a.data();
			return Ad ? (b = d.l, c = d.w) : (b = a.position().left, c = a.width()), {
				c: b + c / 2,
				min: -b + 10 * f.thumbmargin,
				max: -b + xe.w - c - 10 * f.thumbmargin
			}
		}

		function Hc(a) {
			var b = Ud.activeFrame[Td].data();
			T(oe, {
				time: .9 * a,
				pos: b.l,
				width: b.w - 2 * f.thumbborderwidth
			})
		}

		function Kc(a) {
			var b = ld[a.guessIndex][Td];
			if (b) {
				var c = ne.min !== ne.max,
					d = c && Fc(Ud.activeFrame[Td]),
					e = c && (a.keep && Kc.l ? Kc.l : h((a.coo || xe.w / 2) - Fc(b).c, d.min, d.max)),
					f = c && h(e, ne.min, ne.max),
					g = .9 * a.time;
				T(je, {
					time: g,
					pos: f || 0,
					onEnd: function () {
						tc(f, !0)
					}
				}), bd(ie, I(f, ne.min, ne.max)), Kc.l = e
			}
		}

		function Mc() {
			Tc(Td), Ce[Td].push(Ud.activeFrame[Td].addClass(Mb))
		}

		function Tc(a) {
			for (var b = Ce[a]; b.length;) b.shift().removeClass(Mb)
		}

		function Uc(a) {
			var b = De[a];
			d.each(rd, function (a, c) {
				delete b[V(c)]
			}), d.each(b, function (a, c) {
				delete b[a], c.detach()
			})
		}

		function Vc(a) {
			sd = td = ve;
			var b = Ud.activeFrame,
				c = b[Qc];
			c && (Tc(Qc), Ce[Qc].push(c.addClass(Mb)), a || Ud.show.onEnd(!0), t(ce, 0, !0), Uc(Qc), sc(rd), Hb(), Ib())
		}

		function Wc(a, b) {
			a && d.extend(xe, {
				width: a.width || xe.width,
				height: a.height,
				minwidth: a.minwidth,
				maxwidth: a.maxwidth,
				minheight: a.minheight,
				maxheight: a.maxheight,
				ratio: Q(a.ratio)
			}) && !b && d.extend(f, {
				width: xe.width,
				height: xe.height,
				minwidth: xe.minwidth,
				maxwidth: xe.maxwidth,
				minheight: xe.minheight,
				maxheight: xe.maxheight,
				ratio: xe.ratio
			})
		}

		function Xc(b, c, d) {
			a.trigger(ab + ":" + b, [Ud, c]), Ud.prevent[b] ? delete Ud.prevent[b] : (d || g)()
		}

		function Yc() {
			clearTimeout(Zc.t), Rd = 1, f.stopautoplayontouch ? Ud.stopAutoplay() : Od = !0
		}

		function Zc() {
			Zc.t = setTimeout(function () {
				Rd = 0
			}, Jc + Ic)
		}

		function $c() {
			Od = !(!pd && !Pd)
		}

		function _c() {
			if (clearTimeout(_c.t), !f.autoplay || Od) return Ud.autoplay && (Ud.autoplay = !1, Xc("stopautoplay")), void 0;
			Ud.autoplay || (Ud.autoplay = !0, Xc("startautoplay"));
			var a = ve,
				b = Ud.activeFrame[Qc].data();
			E(function () {
				return b.state || a !== ve
			}, function () {
				_c.t = setTimeout(function () {
					Od || a !== ve || Ud.show(yd ? S(!Jd) : V(ve + (Jd ? -1 : 1)))
				}, f.autoplay)
			})
		}

		function ad() {
			Ud.fullScreen && (Ud.fullScreen = !1, Cc && kc.cancel(Xd), rc.removeClass(bb), qc.removeClass(bb), a.removeClass(Pb).insertAfter(_d), xe = d.extend({}, Qd), cd(pd, !0, !0), gd("x", !1), Ud.resize(), hc(rd, "stage"), O(Md, Ld), Xc("fullscreenexit"))
		}

		function bd(a, b) {
			Id && (a.removeClass(Kb + " " + Lb), b && !pd && a.addClass(b.replace(/^|\s/g, " " + Jb + "--")))
		}

		function cd(a, b, c) {
			b && (ae.removeClass(fb), pd = !1, v()), a && a !== pd && (a.remove(), Xc("unloadvideo")), c && ($c(), _c())
		}

		function dd(a) {
			ae.toggleClass(ib, a)
		}

		function ed(a) {
			if (!ye.flow) {
				var b = a ? a.pageX : ed.x,
					c = b && !yc(vc(b)) && f.click;
				ed.p === c || !Ed && f.swipe || !be.toggleClass(sb, c) || (ed.p = c, ed.x = b)
			}
		}

		function fd(a, b) {
			var c = a.target,
				g = d(c);
			g.hasClass(cc) ? Ud.playVideo() : c === qe ? Ud[(Ud.fullScreen ? "cancel" : "request") + "FullScreen"]() : pd ? c === te && cd(pd, !0, !0) : Xc("stagetap", e, function () {
				b ? dd() : f.click && Ud.show({
					index: a.shiftKey || S(vc(a._x)),
					slow: a.altKey,
					user: !0
				})
			})
		}

		function gd(a, b) {
			ye[a] = Ae[a] = b
		}

		function hd(a, b) {
			var c = d(this).data().eq;
			Ud.show({
				index: c,
				slow: a.altKey,
				user: !0,
				coo: a._x - ie.offset().left,
				time: b
			})
		}

		function id() {
			if (s(), C(), !id.i) {
				id.i = !0;
				var a = f.startindex;
				(a || f.hash && c.hash) && (xd = J(a || c.hash.replace(/^#/, ""), ld, 0 === Ud.index || a, a)), ve = sd = td = ud = xd = Z(xd) || 0
			}
			if (md) {
				if (jd()) return;
				pd && cd(pd, !0), rd = [], Uc(Qc), Ud.show({
					index: ve,
					time: 0
				}), Ud.resize()
			} else Ud.destroy()
		}

		function jd() {
			return !jd.f === Jd ? (jd.f = Jd, ve = md - 1 - ve, Ud.reverse(), !0) : void 0
		}

		function kd() {
			kd.ok || (kd.ok = !0, Xc("ready"))
		}
		qc = qc || d("html"), rc = rc || d("body");
		var ld, md, nd, od, pd, qd, rd, sd, td, ud, vd, wd, xd, yd, zd, Ad, Bd, Cd, Dd, Ed, Fd, Gd, Hd, Id, Jd, Kd, Ld, Md, Nd, Od, Pd, Qd, Rd, Sd, Td, Ud = this,
			Vd = d.now(),
			Wd = ab + Vd,
			Xd = a[0],
			Yd = 1,
			Zd = a.data(),
			$d = d("<style></style>"),
			_d = d(L(Ob)),
			ae = d(L(cb)),
			be = d(L(mb)).appendTo(ae),
			ce = (be[0], d(L(pb)).appendTo(be)),
			de = d(),
			ee = d(L(tb + " " + vb)),
			fe = d(L(tb + " " + wb)),
			ge = ee.add(fe).appendTo(be),
			he = d(L(yb)),
			ie = d(L(xb)).appendTo(he),
			je = d(L(zb)).appendTo(ie),
			ke = d(),
			le = d(),
			me = ce.data(),
			ne = je.data(),
			oe = d(L(_b)).appendTo(je),
			pe = d(L(Qb)),
			qe = pe[0],
			re = d(L(cc)),
			se = d(L(dc)).appendTo(be),
			te = se[0],
			ue = d(L(gc)),
			ve = !1,
			we = {},
			xe = {},
			ye = {},
			ze = {},
			Ae = {},
			Be = {},
			Ce = {},
			De = {},
			Ee = 0,
			Fe = [];
		ae[Qc] = d(L(nb)), ae[Sc] = d(L(Cb + " " + Eb, L($b))), ae[Rc] = d(L(Cb + " " + Db, L(Zb))), Ce[Qc] = [], Ce[Sc] = [], Ce[Rc] = [], De[Qc] = {}, Ud.prevent = {}, ae.addClass(Ac ? eb : db), Zd.fotorama = this, Ud.startAutoplay = function (a) {
			return Ud.autoplay ? this : (Od = Pd = !1, w(a || f.autoplay), _c(), this)
		}, Ud.stopAutoplay = function () {
			return Ud.autoplay && (Od = Pd = !0, _c()), this
		}, Ud.show = function (a) {
			var b;
			"object" != typeof a ? (b = a, a = {}) : b = a.index, b = ">" === b ? td + 1 : "<" === b ? td - 1 : "<<" === b ? 0 : ">>" === b ? md - 1 : b, b = isNaN(b) ? J(b, ld, !0) : b, b = "undefined" == typeof b ? ve || 0 : b, Ud.activeIndex = ve = Z(b), vd = Fb(ve), wd = Gb(ve), rd = [ve, vd, wd], td = yd ? b : ve;
			var c = Math.abs(ud - td),
				d = u(a.time, function () {
					return Math.min(Hd * (1 + (c - 1) / 12), 2 * Hd)
				}),
				e = a.overPos;
			a.slow && (d *= 10), Ud.activeFrame = qd = ld[ve], cd(pd, qd.i !== ld[V(sd)].i), mc(rd, "stage"), sc(Ec ? [td] : [td, Fb(td), Gb(td)]), gd("go", !0), Xc("show", {
				user: a.user,
				time: d
			});
			var g = Ud.show.onEnd = function (b) {
				g.ok || (g.ok = !0, lc(), hc(rd, "stage"), b || Vc(!0), Xc("showend", {
					user: a.user
				}), gd("go", !1), Dc(), ed(), $c(), _c())
			};
			if (Ed) {
				var i = qd[Qc],
					j = ve !== ud ? ld[ud][Qc] : null;
				U(i, j, de, {
					time: d,
					method: f.transition,
					onEnd: g
				}, Fe)
			} else T(ce, {
				pos: -p(td, xe.w, f.margin, sd),
				overPos: e,
				time: d,
				onEnd: g,
				_001: !0
			});
			if (zc(), zd) {
				Mc();
				var k = W(ve + h(td - ud, -1, 1));
				Kc({
					time: d,
					coo: k !== ve && a.coo,
					guessIndex: "undefined" != typeof a.coo ? k : ve
				}), Ad && Hc(d)
			}
			return Nd = "undefined" != typeof ud && ud !== ve, ud = ve, f.hash && Nd && !Ud.eq && F(qd.id || ve + 1), this
		}, Ud.requestFullScreen = function () {
			return Cd && !Ud.fullScreen && (Ld = wc.scrollTop(), Md = wc.scrollLeft(), O(0, 0), gd("x", !0), Qd = d.extend({}, xe), a.addClass(Pb).appendTo(rc.addClass(bb)), qc.addClass(bb), cd(pd, !0, !0), Ud.fullScreen = !0, Dd && kc.request(Xd), Ud.resize(), hc(rd, "stage"), lc(), Xc("fullscreenenter")), this
		}, Ud.cancelFullScreen = function () {
			return Dd && kc.is() ? kc.cancel(b) : ad(), this
		}, b.addEventListener && b.addEventListener(kc.event, function () {
			!ld || kc.is() || pd || ad()
		}, !1), Ud.resize = function (a) {
			if (!ld) return this;
			Wc(Ud.fullScreen ? {
				width: "100%",
				maxwidth: null,
				minwidth: null,
				height: "100%",
				maxheight: null,
				minheight: null
			} : P(a), Ud.fullScreen);
			var b = arguments[1] || 0,
				c = arguments[2],
				d = xe.width,
				e = xe.height,
				g = xe.ratio,
				i = wc.height() - (zd ? ie.height() : 0);
			return o(d) && (ae.css({
				width: d,
				minWidth: xe.minwidth,
				maxWidth: xe.maxwidth
			}), d = xe.W = xe.w = ae.width(), f.glimpse && (xe.w -= Math.round(2 * (n(f.glimpse) / 100 * d || m(f.glimpse) || 0))), ce.css({
				width: xe.w,
				marginLeft: (xe.W - xe.w) / 2
			}), e = n(e) / 100 * i || m(e), e = e || g && d / g, e && (d = Math.round(d), e = xe.h = Math.round(h(e, n(xe.minheight) / 100 * i || m(xe.minheight), n(xe.maxheight) / 100 * i || m(xe.maxheight))), Vc(), be.addClass(qb).stop().animate({
				width: d,
				height: e
			}, b, function () {
				be.removeClass(qb)
			}), zd && (ie.stop().animate({
				width: d
			}, b), Kc({
				guessIndex: ve,
				time: b,
				keep: !0
			}), Ad && uc.nav && Hc(b)), Kd = c || !0, kd())), Ee = be.offset().left, this
		}, Ud.setOptions = function (a) {
			return d.extend(f, a), id(), this
		}, Ud.shuffle = function () {
			return ld && M(ld) && id(), this
		}, Ud.destroy = function () {
			return Ud.cancelFullScreen(), Ud.stopAutoplay(), ld = Ud.data = null, r(), rd = [], Uc(Qc), this
		}, Ud.playVideo = function () {
			var a = Ud.activeFrame,
				b = a.video,
				c = ve;
			return "object" == typeof b && a.videoReady && (Dd && Ud.fullScreen && Ud.cancelFullScreen(), E(function () {
				return !kc.is() || c !== ve
			}, function () {
				c === ve && (a.$video = a.$video || d(d.Fotorama.jst.video(b)), a.$video.appendTo(a[Qc]), ae.addClass(fb), pd = a.$video, v(), Xc("loadvideo"))
			})), this
		}, Ud.stopVideo = function () {
			return cd(pd, !0, !0), this
		}, be.on("mousemove", ed), ye = X(ce, {
			onStart: Yc,
			onMove: function (a, b) {
				bd(be, b.edge)
			},
			onEnd: function (a) {
				bd(be), Zc();
				var b = (Gc && !Sd || a.touch) && f.arrows;
				if (a.moved || b && a.pos !== a.newPos) {
					var c = q(a.newPos, xe.w, f.margin, sd);
					Ud.show({
						index: c,
						time: Ed ? Hd : a.time,
						overPos: a.overPos,
						user: !0
					})
				} else a.aborted || fd(a.startEvent, b)
			},
			getPos: function () {
				return -p(td, xe.w, f.margin, sd)
			},
			_001: !0,
			timeLow: 1,
			timeHigh: 1,
			friction: 2,
			select: "." + Nb + ", ." + Nb + " *",
			$wrap: be
		}), Ae = X(je, {
			onStart: Yc,
			onMove: function (a, b) {
				bd(ie, b.edge)
			},
			onEnd: function (a) {
				function b() {
					Kc.l = a.newPos, $c(), _c(), tc(a.newPos, !0)
				}
				if (Zc(), a.moved) a.pos !== a.newPos ? (T(je, {
					time: a.time,
					pos: a.newPos,
					overPos: a.overPos,
					onEnd: b
				}), tc(a.newPos), Id && bd(ie, I(a.newPos, ne.min, ne.max))) : b();
				else {
					var c = a.$target.closest("." + Cb, je)[0];
					c && hd.call(c, a.startEvent)
				}
			},
			timeLow: .5,
			timeHigh: 2,
			friction: 5,
			$wrap: ie
		}), ze = Y(be, {
			shift: !0,
			onEnd: function (a, b) {
				Yc(), Zc(), Ud.show({
					index: b,
					slow: a.altKey
				})
			}
		}), Be = Y(ie, {
			onEnd: function (a, b) {
				Yc(), Zc();
				var c = t(je) + .25 * b;
				je.css(k(h(c, ne.min, ne.max))), Id && bd(ie, I(c, ne.min, ne.max)), Be.prevent = {
					"<": c >= ne.max,
					">": c <= ne.min
				}, clearTimeout(Be.t), Be.t = setTimeout(function () {
					tc(c, !0)
				}, Ic), tc(c)
			}
		}), ae.hover(function () {
			setTimeout(function () {
				Rd || (Sd = !0, dd(!Sd))
			}, 0)
		}, function () {
			Sd && (Sd = !1, dd(!Sd))
		}), K(ge, function (a) {
			R(a), pd ? cd(pd, !0, !0) : (Zc(), Ud.show({
				index: ge.index(this) ? ">" : "<",
				slow: a.altKey,
				user: !0
			}))
		}, {
			onStart: function () {
				Yc(), ye.control = !0
			},
			tail: ye
		}), d.each("load push pop shift unshift reverse sort splice".split(" "), function (a, b) {
			Ud[b] = function () {
				return ld = ld || [], "load" !== b ? Array.prototype[b].apply(ld, arguments) : arguments[0] && "object" == typeof arguments[0] && arguments[0].length && (ld = N(arguments[0])), id(), Ud
			}
		}), id()
	}, d.fn.fotorama = function (b) {
		return this.each(function () {
			var c = this,
				e = d(this),
				f = e.data(),
				g = f.fotorama;
			g ? g.setOptions(b) : E(function () {
				return !C(c)
			}, function () {
				f.urtext = e.html(), new d.Fotorama(e, d.extend({}, {
					width: null,
					minwidth: null,
					maxwidth: "100%",
					height: null,
					minheight: null,
					maxheight: null,
					ratio: null,
					margin: Mc,
					glimpse: 0,
					nav: "dots",
					navposition: "bottom",
					thumbwidth: Nc,
					thumbheight: Nc,
					thumbmargin: Mc,
					thumbborderwidth: Mc,
					allowfullscreen: !1,
					fit: "contain",
					transition: "slide",
					transitionduration: Jc,
					captions: !0,
					hash: !1,
					startindex: 0,
					loop: !1,
					autoplay: !1,
					stopautoplayontouch: !0,
					keyboard: !1,
					arrows: !0,
					click: !0,
					swipe: !0,
					trackpad: !0,
					shuffle: !1,
					direction: "ltr",
					shadows: !0
				}, a.fotoramaDefaults, b, f))
			})
		})
	}, d.Fotorama.instances = [], d.Fotorama.cache = {}, d.Fotorama.measures = {}, d = d || {}, d.Fotorama = d.Fotorama || {}, d.Fotorama.jst = d.Fotorama.jst || {}, d.Fotorama.jst.style = function (a) {
		var b, c = "";
		return ic.escape, c += ".fotorama" + (null == (b = a.s) ? "" : b) + " .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:" + (null == (b = a.m) ? "" : b) + "px;\nheight:" + (null == (b = a.h) ? "" : b) + "px}\n.fotorama" + (null == (b = a.s) ? "" : b) + " .fotorama__thumb-border{\nheight:" + (null == (b = a.h - a.b * (a.q ? 0 : 2)) ? "" : b) + "px;\nborder-width:" + (null == (b = a.b) ? "" : b) + "px;\nmargin-top:" + (null == (b = a.m) ? "" : b) + "px}"
	}, d.Fotorama.jst.video = function (a) {
		function b() {
			c += d.call(arguments, "")
		}
		var c = "",
			d = (ic.escape, Array.prototype.join);
		return c += '<div class="fotorama__video"><iframe src="', b(("youtube" == a.type ? "http://youtube.com/embed/" + a.id + "?autoplay=1" : "vimeo" == a.type ? "http://player.vimeo.com/video/" + a.id + "?autoplay=1&badge=0" : a.id) + (a.s && "custom" != a.type ? "&" + a.s : "")), c += '" frameborder="0" allowfullscreen></iframe></div>'
	}, d(function () {
		d("." + ab + ':not([data-auto="false"])').fotorama()
	})
}(window, document, location, window.jQuery);