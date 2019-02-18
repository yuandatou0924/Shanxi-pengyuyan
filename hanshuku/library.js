/* 选项卡开始 */
function selectTab(selector1, selector2) {
	let li = document.querySelectorAll(selector1);
	let sons = document.querySelectorAll(selector2);
	console.log(li, sons);
	for (let i = 0; i < li.length; i++) {
		li[i].onmouseover = function() {
			li[i].style.background = "#ff6700";
			sons[i].style.display = "block";
		} /* 鼠标移入 */
		li[i].onmouseout = function() {
			li[i].style.background = "rgba(0,0,0,0)";
			sons[i].style.display = "none";
		} /* 鼠标移出 */
	}
}
/* 选项卡结束 */
/* 轮播图开始 */
function banner_op(img,dot,banner,leftBtn,rightBtn,active = "active", times = 2000, ) {
	let imgs = document.querySelectorAll(img); /* 轮播图获取 */
	let dots = document.querySelectorAll(dot); /* 轮播点获取 */
	let bs = document.querySelector(banner) /* 大盒子获取 */
	let lt = document.querySelector(leftBtn); /* 左箭头获取 */
	let rt = document.querySelector(rightBtn); /* 右箭头获取 */
	console.log(lt,rt);
	/* 时间函数 */
	let t = setInterval(fn, times);
	/* 初始值 */
	let num = 0;
	imgs[0].style.opacity = 1;
	dots[0].classList.add(active);
	/* 轮播开始 */
	function fn() {
		num++;
		if (num === imgs.length) {
			num = 0;
		}
		for (let i = 0; i < imgs.length; i++) {
			imgs[i].style.opacity = 0;
			dots[i].classList.remove(active);
		}
		imgs[num].style.opacity = 1;
		dots[num].classList.add(active);
	}
	/* 鼠标移入停止轮播 */
	bs.onmouseover = function() {
		lt.style.opacity=1;
		rt.style.opacity=1;
		clearInterval(t);
	}
	/* 鼠标移出停止轮播 */
	bs.onmouseout = function() {
        lt.style.opacity=0;
        rt.style.opacity=0;
		t = setInterval(fn, times);
	}
	/* 轮播结束 */
	/* 左右点击效果开始 */
	lt.onclick = function() {
		num--;
		if (num == -1) {
			num = imgs.length - 1;
		}
		for (let i = 0; i < imgs.length; i++) {
			imgs[i].style.opacity = 0;
			dots[i].classList.remove(active);
		}
		imgs[num].style.opacity = 1;
		dots[num].classList.add(active);
	}
	rt.onclick = function() {
		fn();
	}
	/* 左右点击效果结束 */
	/* 轮播点点击效果开始 */
	dots.forEach((val, index) => {
		val.onclick = function() {
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].style.opacity = 0;
				dots[i].classList.remove(active);
			}
			val.classList.add("active");
			imgs[index].style.opacity = 1;
			num = index;
		}
	})
	/* 轮播点点击效果结束 */
	/* 窗口失去焦点 */
	window.onblur = function() {
		clearInterval(t);
	}
	/* 窗口获得焦点 */
	window.onfocus = function() {
		t = setInterval(fn, times);
	}
	/* 轮播图结束 */
}

/* 上下左右来回/图片文字颜色随机 */
	function transfrom(box1) {
		let box = document.querySelector(box1);
		let maxt = window.innerHeight - box.offsetTop;
		let maxw = window.innerWidth - box.offsetWidth;
		let speed = 20;
		let speedd = 20;
		// let num = 10;
		let t = setInterval(fn, 20);

		function fn() {
			let boxl = box.offsetTop;
			let boxy = box.offsetLeft;
			if ((boxl + speed) > maxt) {
				speed *= -1;
			}
			if ((boxl + speed) < 0) {
				speed *= -1;
			}
			if ((boxy + speedd) > maxw) {
				speedd *= -1;
			}
			if ((boxy + speedd) < 0) {
				speedd *= -1;
			}
			box.style.marginTop = (boxl + speed) + "px";
			box.style.marginLeft = (boxy + speedd) + "px";
			box.style.color=m();
			box.style.background=m();
		}
		function m(){
			let r=Math.floor(Math.random()*255);
			let g=Math.floor(Math.random()*255);
			let b=Math.floor(Math.random()*255);
			return "rgb("+r+","+g+","+b+")";
		}
		box.onmouseover = function() {
			clearInterval(t);

		};
		box.onmouseout = function() {
			t = setInterval(fn, 20);
		}
	}
	/* 左右键平移轮播 */
	function About(leftbtn,rightbtn,ul) {
		// 	思路:
		// 	1,获取元素
		// 	2,点击左右箭头
		// 	ul:第一屏,translateX(0)
		// 		第二屏,translateX(-1226px)
		// 		 第三屏,translateX(-2452px)
		// 	3,不循环: 定义num=0,1,2
		let lbtn = document.querySelector(leftbtn);
		let rbtn = document.querySelector(rightbtn);
		let uls = document.querySelector(ul);
		let widths = parseInt(getComputedStyle /* 获取某个元素身上所有的样式 */(uls, null).width) / 3;
		console.log(lbtn, rbtn, uls, widths);
		num = 0; /* 这里指的频数 */
		lbtn.style.color = "red";
		rbtn.style.color = "#b0b0b0";
		lbtn.onclick = function() {
			num++;
			if (num === 3) {
				num = 2;
			}
			if (num == 2) {
				lbtn.style.color = "#b0b0b0";
			}
			if (num == 1) {
				rbtn.style.color = "orange";
			}
			let sign = widths * num;
			uls.style.transform = "translateX(-" + sign + "px)"
		}
		rbtn.onclick = function() {
			num--;
			if (num === -1) {
				num = 0;
			}
			if (num == 0) {
				rbtn.style.color = "#b0b0b0";
			}
			if (num == 1) {
				lbtn.style.color = "orange";
			}
			let sign = widths * num;
			uls.style.transform = "translateX(-" + sign + "px)"
		}
	}