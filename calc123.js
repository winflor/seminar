function calculate() {
    var g = 9.81;

    //значения из полей
    var m = parseFloat(document.getElementById("m").value);
    var m0 = parseFloat(document.getElementById("m0").value);
    var h = parseFloat(document.getElementById("h").value);

    //проверка
    if (isNaN(m) || isNaN(m0) || isNaN(h) || m <= 0 || m0 <= 0 || h <= 0) {
        document.getElementById("result").innerHTML =
            "Ошибка: введите положительные числа во все поля.";
        return;
    }

    //подсчет по формулам
    var a = m0 * g / (2 * m + m0);
    var T = 2 * m * (m + m0) * g / (2 * m + m0);
    var F = 2 * T;
    var t = Math.sqrt(2 * h / a);

    document.getElementById("result").innerHTML =
        "Ускорение a = " + a.toFixed(3) + " м/с²<br>" +
        "Сила натяжения нити T = " + T.toFixed(3) + " Н<br>" +
        "Время движения t = " + t.toFixed(3) + " с<br>" +
        "<b>Ответ: сила, действующая на ось блока, F = " + F.toFixed(2) + " Н.</b>";
}