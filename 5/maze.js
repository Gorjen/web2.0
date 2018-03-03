var blank = true;
var data = -1;
var flag = true;
var count = 0;

//  显示提示信息
function updateOutput(data) {
    blank = true;
    var result="";
    if (data == 0) {
        result = "You Win";
        document.getElementById("output").value = result;
    } else if (data == 1) {
        result = "You Lose";
        document.getElementById("output").value = result;
    } else if (data == 2) {
        result = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
        document.getElementById("output").value = result;
    }
    data = -1;
}

//  迷宫的外路、内部撞墙及到达终点
function ShowTargetAndThis() {
    document.getElementById("end").onmouseover = function() {
        if (flag) {
            if (blank) {
                data = 0;
                updateOutput(data);
            } else {
                data = 2;
                updateOutput(data);
            }
            flag = false;
        }
    }
    document.getElementById("six").onmouseover = function() {
        if (flag) {
            flag = false;
            data = 1;
            document.getElementById("six").style.backgroundColor = "#517BA3";
            updateOutput(data);
        }
        
    }
    document.getElementById("six").onmouseout = function() {
        document.getElementById("six").style.backgroundColor = "#C3C3C3";
    }
    document.getElementById("seven").onmouseover = function() {
        if (flag) {
            flag = false;
            data = 1;
            document.getElementById("seven").style.backgroundColor = "#517BA3";
            updateOutput(data);
        }
        
    }
    document.getElementById("seven").onmouseout = function() {
        document.getElementById("seven").style.backgroundColor = "#C3C3C3";
    }
    document.getElementById("eight").onmouseover = function() {
        if (flag) {
            flag = false;
            data = 1;
            document.getElementById("eight").style.backgroundColor = "#517BA3";
            updateOutput(data);
        }
    }
    document.getElementById("eight").onmouseout = function() {
        document.getElementById("eight").style.backgroundColor = "#C3C3C3";
    }
    document.getElementById("nine").onmouseover = function() {
        if (flag) {
            flag = false;
            data = 1;
            document.getElementById("nine").style.backgroundColor = "#517BA3";
            updateOutput(data);
        }
    }
    document.getElementById("nine").onmouseout = function() {
        document.getElementById("nine").style.backgroundColor = "#C3C3C3";
    }
    document.getElementById("ten").onmouseover = function() {
        if (flag) {
            flag = false;
            data = 1;
            document.getElementById("ten").style.backgroundColor = "#517BA3";
            updateOutput(data);
        }
    }
    document.getElementById("ten").onmouseout = function() {
        document.getElementById("ten").style.backgroundColor = "#C3C3C3";
    }
    document.getElementById("check_one").onmouseover = function() {
        if (flag) {
            blank = false;
        }
    }
    document.getElementById("check_two").onmouseover = function() {
        if (flag) {
            blank = false;
        }
    }
    document.getElementById("check_three").onmouseover = function() {
        if (flag) {
            blank = false;
        }
    }
    document.getElementById("check_four").onmouseover = function() {
        if (flag) {
            blank = false;
        }
    }
}

//  记录移动过程
window.onload = function() {
    document.getElementById("start").onmouseover = function() {
        data = -1;
        flag = true;
        blank = true;
        ShowTargetAndThis();
    }
}