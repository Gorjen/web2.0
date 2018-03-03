var flag = false, ifstart = false;
var xblank = 4, yblank = 4;
var className = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

window.onload = function() {
    ifstart = false;
    for (var i = 0; i < className.length; i++) { // 鼠标触碰动画效果
        var elem = document.getElementById(className[i]);
            elem.addEventListener('mouseover', function(e) {
                if (!ifstart) moveover(e.target);
            });
            elem.addEventListener('mouseout', function(e) {
                if (!ifstart) moveout(e.target);
            });
    }

    document.getElementById("start").onclick = function() {
        xmove = new Array(1, 1, -2, -1, 1, -1, 0, 0, 0, -1, 1, -1, 1, 0, 1);
        ymove = new Array(2, 1, 0, 0, 0, 2, 2, 1, -1, 0, -2, 0, -3, 0, -2);
        xpos = new Array(3, 2, 1, 1, 2, 4, 4, 3, 2, 3, 1, 3, 1, 4, 2);
        ypos = new Array(2, 3, 1, 3, 2, 1, 3, 4, 1, 1, 4, 3, 2, 2, 4);
        xblank = 4;
        yblank = 4;
        flag = true;
        ifstart = true;
        timeCount();
        document.getElementById(className[0]).style.transform = "translate(106px, 212px)";
        document.getElementById(className[1]).style.transform = "translate(106px, 106px)";
        document.getElementById(className[2]).style.transform = "translate(-212px, 0px)";
        document.getElementById(className[3]).style.transform = "translate(-106px, 0px)";
        document.getElementById(className[4]).style.transform = "translate(106px, 0px)";
        document.getElementById(className[5]).style.transform = "translate(-106px, 212px)";
        document.getElementById(className[6]).style.transform = "translate(0px, 212px)";
        document.getElementById(className[7]).style.transform = "translate(0px, 106px)";
        document.getElementById(className[8]).style.transform = "translate(0px, -106px)";
        document.getElementById(className[9]).style.transform = "translate(-106px, 0px)";
        document.getElementById(className[10]).style.transform = "translate(106px, -212px)";
        document.getElementById(className[11]).style.transform = "translate(-106px, 0px)";
        document.getElementById(className[12]).style.transform = "translate(106px, -318px)";
        document.getElementById(className[13]).style.transform = "translate(0px, 0px)";
        document.getElementById(className[14]).style.transform = "translate(106px, -212px)";
        image.removeChild(sixteen);
    };

    document.getElementById("end").onclick = function() {
        if (flag) {
            stopCount();
            flag = false;
            for (var i = 0; i < className.length-1; i++) {
                document.getElementById(className[i]).style.transform = "translate(0px, 0px)";
            }
            delete xmove;
            delete ymove;
            delete xpos;
            delete ypos;
        }
    };

    for (var i = 0; i < className.length; i++) { // 鼠标点击动画效果
        var elem = document.getElementById(className[i]);
        elem.addEventListener('click', function(e) {
            if (flag) deal(e.target.id);
        });
    }

};

var c = 0;
var time = -1;
function timeCount() {
    document.getElementById("timing").value = c;
    c++;
    time = setTimeout("timeCount()", 1000);
}
function stopCount() {
    clearTimeout(time);
    flag = false;
    c = 0;
    document.getElementById("timing").value = c;
}

function moveover(elem) {
    elem.style.transform = "translate(-1px, -1px)";
}
function moveout(elem) {
    elem.style.transform = "translate(0px, 0px)";
}

function deal(elem) {
    var pos = -5, xor = -5, yor = -5, dir = "";
    for (var i = 0; i < className.length-1; i++) {
        if (className[i] == elem) {
            pos = find(i);
            xor = xmove[i] * 106;
            yor = ymove[i] * 106;
        }
    }
    if (pos == "left" || pos == "right" || pos == "up" || pos == "down") {
        dir = "translate(" + xor + "px, " + yor + "px)";
        document.getElementById(elem).style.transform = dir;
    }
    if (checkdone()) stopCount();
}
function checkdone() {
    var count = 0;
    for (var i = 0; i < 15; i++) {
        if (xmove[i] ==0 && ymove[i] == 0) ++count;
    }
    if (count == 15) return true;
    return false;
}
function find(data) {
    var xtemp = -5, ytemp = -5;
    if (xpos[data]-1 == xblank && ypos[data] == yblank) {
        ymove[data]--;
        xtemp = xblank;
        xblank = xpos[data];
        xpos[data] = xtemp;
        return "up";
    } else if (xpos[data]+1 == xblank && ypos[data] == yblank) {
        ymove[data]++;
        xtemp = xblank;
        xblank = xpos[data];
        xpos[data] = xtemp;
        return "down";
    } else if (xpos[data] == xblank && ypos[data]-1 == yblank) {
        xmove[data]--;
        ytemp = yblank;
        yblank = ypos[data];
        ypos[data] = ytemp;
        return "left";
    } else if (xpos[data] == xblank && ypos[data]+1 == yblank) {
        xmove[data]++;
        ytemp = yblank;
        yblank = ypos[data];
        ypos[data] = ytemp;
        return "right";
    }
}