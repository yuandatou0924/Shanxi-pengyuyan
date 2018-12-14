(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//orientationchange :检测屏幕发生反转时，就是是横屏还是竖屏时
        recalc = function () {
            var clientWidth = docEl.clientWidth;
//clientWidth :就是设备的宽度
            if (!clientWidth) return;
                // 这里的750 取决于设计稿的宽度,1rem=100px
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
})(document, window);