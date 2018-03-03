var p = {
    input : "",
    result : "",
    equal : false
};

$(document).ready(function() {
    $(".out").click(function() {
        var that = this;
        outStuff(that);
    });
    $(".deal").click(function() {
        var that = this;
        dealStuff(that);
    });
});
function outStuff(that) {
    p.equal = false;
    p.input += $(that).attr("value");
    $("#input").val(p.input);
}
function dealStuff(that) {
    if ($(that).attr("id") == "cancel") cancelStuff();
    else if ($(that).attr("id") == "delete") deleteStuff();
    else if ($(that).attr("id")) equalStuff();
}
function cancelStuff() {
    p.input = p.result = "";
    $("#input").val(p.input);
    $("#output").val(p.result);
    p.equal = false;
}
function deleteStuff() {
    if (p.equal === false) {
        var mid = p.input[input.length-1];
        p.input = p.input.substring(0, p.input.length-1);
        $("#input").val(p.input);
    }
}
function equalStuff() {
    check();
}
function check() {
    try {
        eval("p.result = " + p.input);
        if (isNaN(p.result) || p.result == Infinity || p.result === undefined || p.result === null) throw exception;
        calculate();
    }
    catch(exception) {
        alert("不要因为我超可爱的就欺负我╭(╯^╰)╮\n重新输入好不好嘛/(ㄒoㄒ)/~~");
    }
}
function calculate() {
    p.result = parseFloat(p.result.toFixed(10));
    $("#input").val(p.input+"=");
    $("#output").val(p.result);
    p.input = p.result;
    p.equal = true;
}