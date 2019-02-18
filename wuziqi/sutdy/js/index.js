$(function () {
    let box = $('.box');
    let r = 20;
    let flag = true;
    let white = {};
    let black = {};
    let blank = {};
    let ai = true;
    /* 棋子的创建  */
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let left = 2 * j * r, top = 2 * i * r;
            $('<b>').attr('id', i + '_' + j).addClass('chess').css({left, top}).appendTo(box);
            blank[i + '_' + j] = true;//页面中所有的棋子位置
        }
    }
    // console.log(blank);
    /*  点击棋子时    */

    box.on('click', 'b.chess', function () {
        if ($(this).hasClass('black') || $(this).hasClass('white')) {
            return
        }
        let position = $(this).attr('id');
        delete blank[position];

        flag = !flag;

        if (!flag) {
            $(this).addClass('white');
            white[position] = true;
            check(white, position);
            let score = check(white, position);
            if (score >= 5) {
                alert("你赢了 ");
                box.off("click", 'b.chess');
                ai = false;
            }
            if (ai) {               //---智能
                let p = auto();
                $('#' + p).addClass('black');
                black[p] = true;
                flag = true;
                delete blank[p];
                let score = check(black, p);
                if (score >= 5) {
                    alert("vv");

                    box.off("click", 'b.chess');
                }
            }

        }

    })

    function auto() {
        let score1 = 0, score2 = 0;
        let p1 = '', p2 = '';
        for (let i in blank) {
            let position = i;
            let score = check(white, position);
            if (score >= score1) {
                score1 = score;
                p1 = i;
            }
        }
        for (let i in blank) {
            let position = i;
            let score = check(black, position);
            if (score >= score2) {
                score2 = score;
                p2 = i;
            }
        }
        return score2 >= score1 ? p2 : p1;
    }

    function check(color, position) {
        let [x, y] = position.split("_");
        let xian = 1, shu = 1, zx = 1, yx = 1;
        let x1 = x, y1 = y;
        while (color[x + "_" + (++y)]) {
            xian++;
        }
        y = y1;
        while (color[x + "_" + (--y)]) {
            xian++;
        }
        y = y1;
        while (color[(++x) + "_" + y]) {
            shu++;
        }
        x = x1;
        while (color[(--x) + "_" + y]) {
            shu++;
        }
        x = x1;
        while (color[(++x) + "_" + (++y)]) {
            zx++;
        }
        x = x1, y = y1;
        while (color[(--x) + "_" + (--y)]) {
            zx++;
        }
        x = x1, y = y1;
        while (color[(--x) + "_" + (++y)]) {
            yx++;
        }
        x = x1, y = y1;
        while (color[(++x) + "_" + (--y)]) {
            yx++;
        }
        return Math.max(shu, xian, zx, yx);


    }


});
