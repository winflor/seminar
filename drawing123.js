var timer = null;
var startTime = 0;

//движение
function setPosition(d) {
    document.getElementById("left").setAttribute("transform", "translate(0," + d + ")");
    document.getElementById("right").setAttribute("transform", "translate(0," + (-d) + ")");
    document.getElementById("ropeL").setAttribute("y2", 150 + d);
    document.getElementById("ropeR").setAttribute("y2", 150 - d);
}

function start() {
    if (timer !== null) {
        return;//уже едет
    }

    var g = 9.81;

    //числа из полей
    var m = parseFloat(document.getElementById("m").value);
    var m0 = parseFloat(document.getElementById("m0").value);
    var h = parseFloat(document.getElementById("h").value);

    //проверка
    if (isNaN(m) || isNaN(m0) || isNaN(h) || m <= 0 || m0 <= 0 || h <= 0) {
        document.getElementById("out").innerHTML = "Ошибка: введите положительные числа.";
        return;
    }

    //подсчет по формулам
    var a = m0 * g / (2 * m + m0);
    var tTotal = Math.sqrt(2 * h / a);
    var F = 4 * m * (m + m0) * g / (2 * m + m0);

    document.getElementById("out").innerHTML =
        "a = " + a.toFixed(3) + " м/с², t = " + tTotal.toFixed(3) +
        " с, F = " + F.toFixed(2) + " Н";

    //масштаб, путь h метров
    var pxPerMeter = 55 / h;

    //анимация
    startTime = Date.now();
    timer = setInterval(function () {
        var t = (Date.now() - startTime) / 1000;
        if (t >= tTotal) {
            t = tTotal;
            clearInterval(timer);
            timer = null;
        }
        var s = a * t * t / 2;// путь s = at в кв/2 в метрах
        setPosition(s * pxPerMeter);
    }, 20);
}

function reset() {
    clearInterval(timer);
    timer = null;
    setPosition(0);
}

var defaultText = "Наведи мышь на груз, блок или нить.";

function showInfo(event) {
    var title = event.target.querySelector("title");
    if (title !== null) {
        document.getElementById("info").innerHTML = title.textContent;
    }
}

function hideInfo() {
    document.getElementById("info").innerHTML = defaultText;
}

var parts = document.querySelectorAll("#drawing rect, #drawing circle, #drawing line");
for (var i = 0; i < parts.length; i++) {
    parts[i].addEventListener("mouseover", showInfo);
    parts[i].addEventListener("mouseout", hideInfo);
}