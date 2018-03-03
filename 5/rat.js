var count = -1;
var time;
var min = 0;
var max = 59;
var c = 30;
var score = 0;
var num;
var ip = document.getElementsByName("ip");
var loc = -1;
var flag = true;

//  计时器
function timeCount() {
    if (count == 0) {
        document.getElementById("input").value = c;
        c--;
        time = setTimeout("timeCount()", 1000);
        if (c == "-2") {
            document.getElementById("result").value = "Game over";
            document.getElementById("output").value = 0;
            alert("Game over. Your score is " + score);
            c = 0;
            setTimeout("document.getElementById('input').value = 0", 0);
            clearTimeout(time);
            ip[loc].checked = false;
            count = -1;
            flag = false;
            if (!flag) {
                for (var i = 0; i < 60; i++) {
                    ip[i].disabled = true;
                }
            }
        }
    } else if (count == 1) {
        c = 0;
        document.getElementById("output").value = 0;
        document.getElementById("result").value = "Game over";
        alert("Game over. Your score is " + score);
        setTimeout("document.getElementById('input').value = 0", 0);
        clearTimeout(time);
        ip[loc].checked = false;
        count = -1;
        flag = false;
        for (var i = 0; i < 60; i++) {
            ip[i].disabled = true;
        }
    }
}

//  随机数生成器
function getRandom(min, max) {
    var range = max - min;
    var rand = Math.random();
    num = Math.round(rand * range);
    return num;
}

//  挖洞
function createMoles() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
        var mole = document.createElement("input");
        mole.type = "radio";
        mole.name = "ip";
        frag.appendChild(mole);
    }
    document.getElementById("Moles").appendChild(frag);
}

//  主体
window.onload = function() {
    createMoles();
    for (var i = 0; i < 60; i++) {
        ip[i].disabled = true;
    }
    flag = true;
    document.getElementById("startend").onclick = function() {
        count = -1;
        count++;
        if (count == 0) flag = true;
        if (count == 1) flag = false;
        timeCount();
    if (flag && count == 0) {
        document.getElementById("result").value = "Playing";
        score = 0;
        document.getElementById("output").value = score;
        loc = getRandom(min, max);
        ip[loc].checked = true;  //  自动点选
        for (var i = 0; i < 60; i++) {
            ip[i].disabled = false;;
        }
        for (var i = 0; i < 60; i++) {
            if (time == "33") return;
            if (count == -1) return;
            ip[i].onclick = function() {
                if (count == 0) {
                    if (ip[loc].checked) {
                        score++;
                        ip[loc].checked = false;
                        document.getElementById("output").value = score;
                        loc = getRandom(min, max);
                        ip[loc].checked = true;
                        document.getElementById("startend").onclick = function() {
                            if (flag) {
                                count = 1;
                                flag = false;
                                return;
                            }
                        }
                    } else {
                        ip[loc].checked = true;
                        if (score > 0) score--;
                        document.getElementById("output").value = score;
                    }
                }
            }
        }
    }
    }
}
