var close = {
    flag: false,
    ifstart: false,
    xblank: 4,
    yblank: 4,
    className: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'],
    xmove: [],
    ymove: [],
    xpos: [],
    ypos: []
};
var t = {
    c : 0,
    time : -1
};
$(document).ready(function() {
    $("#start").click(function() {stepOne();});
    $("#end").click(function() {stepTwo();});
    $(".piece").click(function() {stepThree(this);}); 
});
function stepOne() {
    if (close.ifstart) return;
    flag = true;
        initialize();
        timeCount();
        messUp();
        close.ifstart = true;
}
function stepTwo() {
    if (!close.ifstart) return;
    stopCount();
    returnNormal();
}
function stepThree(that) {
    if (!flag) return;
    var i;
    _.times(15, function(j) {if (close.className[j] == $(that).attr("id")) i = j;});
    if (find(i)) {$(that).css("transform", "translate(" + close.xmove[i] * 104 + "px, " + close.ymove[i] * 104 + "px)");}
    if (checkdone()) stopCount();
}
function initialize() {
    close.xblank = 4;
    close.yblank = 4;
    close.xmove = [1, 1, 1, -3, 3, -1, 0, -2, 1, 1, -2, 0, 0, 0, 0];
    close.ymove = [2, 1, 0, 0, 1, 2, -1, 2, -2, 1, -1, -1, -1, -2, -1];
    close.xpos = [3, 2, 1, 1, 3, 4, 1, 4, 1, 4, 2, 2, 3, 2, 3];
    close.ypos = [2, 3, 4, 1, 4, 1, 3, 2, 2, 3, 1, 4, 1, 2, 3];
}
function timeCount() {
    $("#timing").val(t.c);
    t.c++;
    t.time = setTimeout("timeCount()", 1000);
}
function stopCount() {
    clearTimeout(t.time);
    t.c = 0;
    $("#timing").val(t.c);
}
function messUp() {
    _.times(15, function(i) {$("#"+close.className[i]).css("transform", "translate("+close.xmove[i]*104+"px,"+close.ymove[i]*104+"px)");})
    $("#sixteen").hide();
}
function returnNormal() {
    _.times(15, function(i) {$("#"+close.className[i]).css("transform", "translate(0px, 0px)");})
    $("#sixteen").css("transform", "scale(1)");
    $("#sixteen").show();
    close.ifstart = false;
    close.flag = false;
}
function checkdone() {
    var count = 0;
    _.times(14, function(i) {if (close.xmove[i] ==0 && close.ymove[i] == 0) ++count;});
    if (count == 15) return true;
    return false;
}
function find(data) {
    if (up(data)) return true;
    else if (down(data)) return true;
    else if (left(data)) return true;
    else if (right(data)) return true;
    return false;
}
function up(data) {
    if (close.xpos[data]-1 == close.xblank && close.ypos[data] == close.yblank) {
        close.ymove[data]--;
        verticalSwap(data);
        return true;
    }
    return false;
}
function down(data) {
    if (close.xpos[data]+1 == close.xblank && close.ypos[data] == close.yblank) {
        close.ymove[data]++;
        verticalSwap(data);
        return true;
    }
    return false;
}
function left(data) {
    if (close.xpos[data] == close.xblank && close.ypos[data]-1 == close.yblank) {
        close.xmove[data]--;
        paraSwap(data);
        return true;
    }
    return false;
}
function right(data) {
    if (close.xpos[data] == close.xblank && close.ypos[data]+1 == close.yblank) {
        close.xmove[data]++;
        paraSwap(data);
        return true;
    }
    return false;
}
function verticalSwap(data) {
    var temp = close.xblank;
    close.xblank = close.xpos[data];
    close.xpos[data] = temp;
}
function paraSwap(data) {
    var temp = close.yblank;
    close.yblank = close.ypos[data];
    close.ypos[data] = temp;
}