var input = "";
var result = "";

// 获取输入
window.onload = function() {
    // 数字输入
    document.getElementById("seven").onclick = function() {
        input = input + "7";
        document.getElementById("input").value = input;
    }
    document.getElementById("eight").onclick = function() {
        input = input + "8";
        document.getElementById("input").value = input;
    }
    document.getElementById("nine").onclick = function() {
        input = input + "9";
        document.getElementById("input").value = input;
    }
    document.getElementById("four").onclick = function() {
        input = input + "4";
        document.getElementById("input").value = input;
    }
    document.getElementById("five").onclick = function() {
        input = input + "5";
        document.getElementById("input").value = input;
    }
    document.getElementById("six").onclick = function() {
        input = input + "6";
        document.getElementById("input").value = input;
    }
    document.getElementById("one").onclick = function() {
        input = input + "1";
        document.getElementById("input").value = input;
    }
    document.getElementById("two").onclick = function() {
        input = input + "2";
        document.getElementById("input").value = input;
    }
    document.getElementById("three").onclick = function() {
        input = input + "3";
        document.getElementById("input").value = input;
    }
    document.getElementById("zero").onclick = function() {
        input = input + "0";
        document.getElementById("input").value = input;
    }

    // 加减乘除
    document.getElementById("add").onclick = function() {
        input = input + "+";
        document.getElementById("input").value = input;
    }
    document.getElementById("subtract").onclick = function() {
        input = input + "-";
        document.getElementById("input").value = input;
    }
    document.getElementById("multiply").onclick = function() {
        input = input + "*";
        document.getElementById("input").value = input;
    }
    document.getElementById("divide").onclick = function() {
        input = input + "/";
        document.getElementById("input").value = input;
    }

    // 格式类
    document.getElementById("dot").onclick = function() {
        input = input + ".";
        document.getElementById("input").value = input;
    }
    document.getElementById("left").onclick = function() {
        input = input + "(";
        document.getElementById("input").value = input;
    }
    document.getElementById("right").onclick = function() {
        input = input + ")";
        document.getElementById("input").value = input;
    }

    // 操作类
    document.getElementById("cancel").onclick = function() {
        input = "";
        result = "";
        document.getElementById("input").value = input;
        document.getElementById("output").value = result;
    }
    document.getElementById("delete").onclick = function() {
        var mid = input[input.length-1];
        input = input.substring(0, input.length-1);
        document.getElementById("input").value = input;
    }
    document.getElementById("equal").onclick = function() {
        check(input);
    }
}

// 检查参数是否合法
function check(input) {
    try  {
        eval("result="+input);
        if (isNaN(result) || result == Infinity || result == undefined || result == null) {
            throw exception;
        }
        input = input + "=";
        document.getElementById("input").value = input;
        if (parseInt(result) == result) result = parseInt(result, 10);
        else result = parseFloat(result.toFixed(10));
        document.getElementById("output").value = result;
        input = result;
    }
    catch(exception) {
        alert("不要因为我超可爱的就欺负我╭(╯^╰)╮\n重新输入好不好嘛/(ㄒoㄒ)/~~");
    }
}