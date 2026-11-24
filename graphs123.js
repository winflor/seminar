var g = 9.81;
var m = 0.5;
var m0 = 0.1;
var h = 1;

//формулы в функции, чтобы вызывать в цикле
function calcF(m, m0) {
    return 4 * m * (m + m0) * g / (2 * m + m0);
}

function calcA(m, m0) {
    return m0 * g / (2 * m + m0);
}

function calcT(m, m0, h) {
    return Math.sqrt(2 * h / calcA(m, m0));
}

// рисует график canvas
function drawGraph(id, xs, ys, title, xName, yName) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var hh = canvas.height;
    var left = 100, right = 25, top = 50, bottom = 70;
    var xmin = xs[0];
    var xmax = xs[xs.length - 1];
    var ymin = ys[0];
    var ymax = ys[0];
    for (var i = 1; i < ys.length; i++) {
        if (ys[i] < ymin) { ymin = ys[i]; }
        if (ys[i] > ymax) { ymax = ys[i]; }
    }

    //перевод числа в координату
    function px(x) {
        return left + (x - xmin) / (xmax - xmin) * (w - left - right);
    }
    function py(y) {
        return hh - bottom - (y - ymin) / (ymax - ymin) * (hh - top - bottom);
    }

    ctx.clearRect(0, 0, w, hh);
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";

    //оси
    ctx.strokeRect(left, top, w - left - right, hh - top - bottom);

    ctx.font = "bold 19px Arial";
    ctx.textAlign = "center";
    ctx.fillText(title, w / 2, 30);
    ctx.font = "16px Arial";

    // деления и сетка 5 штук на каждой оси
    for (var k = 0; k <= 5; k++) {
        var xv = xmin + (xmax - xmin) * k / 5;
        var yv = ymin + (ymax - ymin) * k / 5;

        ctx.strokeStyle = "#cccccc";
        ctx.beginPath();
        ctx.moveTo(px(xv), top);
        ctx.lineTo(px(xv), hh - bottom);
        ctx.moveTo(left, py(yv));
        ctx.lineTo(w - right, py(yv));
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(xv.toFixed(3), px(xv), hh - bottom + 18);
        ctx.textAlign = "right";
        ctx.fillText(yv.toFixed(3), left - 6, py(yv) + 4);
    }

    //подписи осей
    ctx.textAlign = "center";
    ctx.fillText(xName, w / 2, hh - 12);
    ctx.save();
    ctx.translate(24, hh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yName, 0, 0);
    ctx.restore();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (var j = 0; j < xs.length; j++) {
        if (j === 0) {
            ctx.moveTo(px(xs[j]), py(ys[j]));
        } else {
            ctx.lineTo(px(xs[j]), py(ys[j]));
        }
    }
    ctx.stroke();

    //точки
    ctx.fillStyle = "red";
    for (var p = 0; p < xs.length; p++) {
        ctx.beginPath();
        ctx.arc(px(xs[p]), py(ys[p]), 4, 0, 2 * Math.PI);
        ctx.fill();
    }
}

//массивы для трёх графиков
var x1 = [], y1 = [];//F от m0
var x2 = [], y2 = [];//a от m
var x3 = [], y3 = [];//t от h

for (var percent = 90; percent <= 110; percent++) {
    var k = percent / 100;

    x1.push(m0 * k);
    y1.push(calcF(m, m0 * k));

    x2.push(m * k);
    y2.push(calcA(m * k, m0));

    x3.push(h * k);
    y3.push(calcT(m, m0, h * k));
}

drawGraph("g1", x1, y1, "Сила F на ось блока от массы перегрузка", "m0, кг", "F, Н");
drawGraph("g2", x2, y2, "Ускорение a от массы груза", "m, кг", "a, м/с²");
drawGraph("g3", x3, y3, "Время t от высоты", "h, м", "t, с");