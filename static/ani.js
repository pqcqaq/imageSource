var cm = document.createElement("div");
cm.style.display = "none";
cm.style.position = "absolute";
cm.style.width = "120px";
cm.style.backgroundColor = "rgba(242, 242, 242, 0.6)";
cm.style.borderRadius = "5px";
cm.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
cm.style.padding = "12px 16px";
cm.style.zIndex = "999";
cm.style.background =
	"linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%)";
var bb = document.createElement("button");
bb.innerText = "返回";
bb.style.border = "none";
bb.style.outline = "none";
bb.style.backgroundColor = "transparent";
bb.style.cursor = "pointer";
bb.style.color = "#2196F3";
bb.style.fontSize = "16px";
bb.style.marginBottom = "8px";
bb.style.width = "100%";
bb.style.textAlign = "center";
bb.onclick = function () {
	window.history.back();
	cm.style.display = "none";
};
var rb = document.createElement("button");
rb.innerText = "刷新";
rb.style.border = "none";
rb.style.outline = "none";
rb.style.backgroundColor = "transparent";
rb.style.cursor = "pointer";
rb.style.color = "#2196F3";
rb.style.fontSize = "16px";
rb.style.marginBottom = "8px";
rb.style.width = "100%";
rb.style.textAlign = "center";
rb.onclick = function () {
	window.location.reload();
	cm.style.display = "none";
};
var sb = document.createElement("button");
sb.innerText = "分享";
sb.style.border = "none";
sb.style.outline = "none";
sb.style.backgroundColor = "transparent";
sb.style.cursor = "pointer";
sb.style.color = "#2196F3";
sb.style.fontSize = "16px";
sb.style.marginBottom = "8px";
sb.style.width = "100%";
sb.style.textAlign = "center";
sb.onclick = function () {
	var sl = window.location.href;
	navigator.clipboard.writeText(sl).then(
		function () {
			console.log("Share link copied to clipboard: " + sl);
		},
		function () {
			console.error("Failed to copy share link to clipboard.");
		}
	);
	cm.style.display = "none";
};
var cb = document.createElement("button");
cb.innerText = "复制";
cb.style.border = "none";
cb.style.outline = "none";
cb.style.backgroundColor = "transparent";
cb.style.cursor = "pointer";
cb.style.color = "#2196F3";
cb.style.fontSize = "16px";
cb.style.marginBottom = "8px";
cb.style.width = "100%";
cb.style.textAlign = "center";
cb.onclick = function () {
	document.execCommand("copy");
	cm.style.display = "none";
};
cb.onclick = function () {
	var st = window.getSelection().toString();
	navigator.clipboard.writeText(st).then(
		function () {
			console.log("Selected text copied to clipboard: " + st);
		},
		function () {
			console.error("Failed to copy selected text to clipboard.");
		}
	);
	cm.style.display = "none";
	messageBox.textContent = "复制成功~转载请注明出处！";
	messageBox.style.opacity = 1;
	setTimeout(() => {
		messageBox.style.opacity = 0;
	}, 1500);
};
cm.appendChild(cb);
cm.appendChild(bb);
cm.appendChild(rb);
cm.appendChild(sb);
document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
	cm.style.display = "block";
	cm.style.top = event.pageY + "px";
	cm.style.left = event.pageX + "px";
});
document.addEventListener("selectionchange", function (event) {
	var st = document.getSelection().toString();
	if (st && st.length > 0) {
		cb.style.display = "block";
	} else {
		cb.style.display = "none";
	}
});
document.addEventListener("click", function (event) {
	if (
		event.target != cm &&
		event.target != bb &&
		event.target != rb &&
		event.target != sb
	) {
		cm.style.display = "none";
	}
});
const maxTextLength = Math.max(bb.offsetWidth, rb.offsetWidth, sb.offsetWidth);
cm.style.width = `${maxTextLength + 80}px`;
const messageBox = document.createElement("div");
messageBox.textContent = "网址复制成功～";
messageBox.style.position = "fixed";
messageBox.style.top = "50px";
messageBox.style.left = "50%";
messageBox.style.transform = "translateX(-50%)";
messageBox.style.padding = "10px";
messageBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
messageBox.style.color = "#fff";
messageBox.style.borderRadius = "5px";
messageBox.style.opacity = 0;
messageBox.style.transition = "opacity 0.5s";
document.body.appendChild(messageBox);
sb.addEventListener("click", () => {
	const url = window.location.href;
	navigator.clipboard.writeText(`QC博客链接分享： ${url}`);
	messageBox.style.opacity = 1;
	setTimeout(() => {
		messageBox.style.opacity = 0;
	}, 1500);
});
document.body.appendChild(cm);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctxx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";
const ptCount = 300;
const ptMaxSize = 20;
const pts = [];
const speedMax = 0.05;
const fadeSpeedMax = 0.05;
const Dx = 0;
const Dy = 1;
class Pt {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = {
			x: Dx + Math.random() * speedMax,
			y: Dy + Math.random() * speedMax,
		};
		this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
			Math.random() * 255
		})`;
	}
	update() {
		this.x += this.speed.x;
		this.y += this.speed.y;
		if (this.size > 0.2) this.size -= fadeSpeedMax;
		if (this.y > window.innerHeight) {
			this.y = -ptMaxSize;
			this.x = Math.random() * window.innerWidth;
			this.size = Math.random() * ptMaxSize;
		}
	}
	draw() {
		const x = this.x;
		const y = this.y;
		const size = this.size;
		const color = this.color;
		ctxx.beginPath();
		for (var i = 0; i < 5; i++) {
			ctxx.lineTo(
				Math.cos(((18 + i * 72) / 180) * Math.PI) * size + x,
				-Math.sin(((18 + i * 72) / 180) * Math.PI) * size + y
			);
			ctxx.lineTo(
				(Math.cos(((54 + i * 72) / 180) * Math.PI) * size) / 2 + x,
				(-Math.sin(((54 + i * 72) / 180) * Math.PI) * size) / 2 + y
			);
		}
		ctxx.closePath();
		ctxx.fillStyle = color;
		ctxx.fill();
	}
}
function generatepts() {
	for (let i = 0; i < ptCount; i++) {
		const x = Math.random() * window.innerWidth;
		const y = Math.random() * window.innerHeight;
		const size = Math.random() * ptMaxSize;
		const pt = new Pt(x, y, size);
		pts.push(pt);
	}
}
function loop() {
	ctxx.clearRect(0, 0, canvas.width, canvas.height);
	pts.forEach((pt) => {
		pt.update();
		pt.draw();
	});
	requestAnimationFrame(loop);
}
function sa() {
	generatepts();
	loop();
}
function rc() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
rc();
sa();
window.addEventListener("resize", rc);
document.addEventListener("mouseup", function (event) {
	var st = window.getSelection().toString().trim();
	if (st !== "") {
		var cb2 = document.createElement("div");
		cb2.innerHTML = "复制";
		cb2.style.position = "absolute";
		cb2.style.top = event.pageY - 10 + "px";
		cb2.style.left = event.pageX + 10 + "px";
		cb2.style.padding = "5px 10px";
		cb2.style.borderRadius = "5px";
		cb2.style.backgroundColor = "#fff";
		cb2.style.color = "#2196F3";
		cb2.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.2)";
		cb2.style.transition = "opacity 0.5s";
		cb2.style.zIndex = 9999;
		cb2.addEventListener("click", function () {
			copyText(st);
			cb2.innerHTML = "已复制";
			messageBox.textContent = "复制成功~转载请注明出处！";
			messageBox.style.opacity = 1;
			setTimeout(() => {
				messageBox.style.opacity = 0;
			}, 1500);
		});
		document.body.appendChild(cb2);
		setTimeout(function () {
			cb2.style.opacity = 0;
			setTimeout(function () {
				document.body.removeChild(cb2);
			}, 500);
		}, 1500);
	}
});
function copyText(text) {
	var input = document.createElement("input");
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand("copy");
	document.body.removeChild(input);
}
!(function () {
	function o(w, v, i) {
		return w.getAttribute(v) || i;
	}
	function j(i) {
		return document.getElementsByTagName(i);
	}
	function l() {
		var i = j("script"),
			w = i.length,
			v = i[w - 1];
		return {
			l: w,
			z: o(v, "zIndex", -1),
			o: o(v, "opacity", 0.5),
			c: o(v, "color", "0,0,0"),
			n: o(v, "count", 99),
		};
	}
	function k() {
		(r = u.width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth),
			(n = u.height =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight);
	}
	function b() {
		e.clearRect(0, 0, r, n);
		var w = [f].concat(t);
		var x, v, A, B, z, y;
		t.forEach(function (i) {
			(i.x += i.xa),
				(i.y += i.ya),
				(i.xa *= i.x > r || i.x < 0 ? -1 : 1),
				(i.ya *= i.y > n || i.y < 0 ? -1 : 1),
				e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
			for (v = 0; v < w.length; v++) {
				x = w[v];
				if (i !== x && null !== x.x && null !== x.y) {
					(B = i.x - x.x), (z = i.y - x.y), (y = B * B + z * z);
					y < x.max &&
						(x === f &&
							y >= x.max / 2 &&
							((i.x -= 0.03 * B), (i.y -= 0.03 * z)),
						(A = (x.max - y) / x.max),
						e.beginPath(),
						(e.lineWidth = A / 2),
						(e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")"),
						e.moveTo(i.x, i.y),
						e.lineTo(x.x, x.y),
						e.stroke());
				}
			}
			w.splice(w.indexOf(i), 1);
		}),
			m(b);
	}
	var u = document.createElement("canvas"),
		s = l(),
		c = "c_n" + s.l,
		e = u.getContext("2d"),
		r,
		n,
		m =
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (i) {
				window.setTimeout(i, 1000 / 45);
			},
		a = Math.random,
		f = { x: null, y: null, max: 20000 };
	u.id = c;
	u.style.cssText =
		"position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
	j("body")[0].appendChild(u);
	k(), (window.onresize = k);
	(window.onmousemove = function (i) {
		(i = i || window.event), (f.x = i.clientX), (f.y = i.clientY);
	}),
		(window.onmouseout = function () {
			(f.x = null), (f.y = null);
		});
	for (var t = [], p = 0; s.n > p; p++) {
		var h = a() * r,
			g = a() * n,
			q = 2 * a() - 1,
			d = 2 * a() - 1;
		t.push({ x: h, y: g, xa: q, ya: d, max: 6000 });
	}
	setTimeout(function () {
		b();
	}, 100);
})();
