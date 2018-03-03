var p = {
    flag : []
};
$(document).ready(function() {
    initialize();
    $("thead th").click(function() {
        $("th").removeClass();
        var that = this;
        var q = decoder(that.id);
        p.flag[q]++;
        if (q < 3) sortTable("todo", q, that);
        else sortTable("staff", q, that);
    });
});
function decoder(id) {
    if (id == "zero") return "0";
    else if (id == "one") return "1";
    else if (id == "two") return "2";
    else if (id == "three") return "3";
    else if (id == "four") return "4";
    else if (id == "five") return "5";
}
function initialize() {
    _.times(1000, function(i) {p.flag[i] = 0;});
}
function sortTable(str, q, that) {
    if (p.flag[q] % 2 !== 0) {
        $(that).addClass("ascend");
        up(str, q);
    } else {
        $(that).addClass("descend");
        down(str, q);
    }
}
function up(str, q) {
    var tr = $("#"+str+" tbody tr");
    if (q > 2) q = q - 3;
    _.times(tr.length-1, function(i) {
        _.times(tr.length-1-i, function(j) {
            if ($(tr[j]).find('td').eq(q).html() > $(tr[j+1]).find('td').eq(q).html()) swap(tr[j], tr[j+1]);
        });
    });
    changeColor(str);
}
function down(str, q) {
    var tr = $("#"+str+" tbody tr");
    if (q > 2) q = q - 3;
    _.times(tr.length-1, function(i) {
        _.times(tr.length-1-i, function(j) {
            if ($(tr[j]).find('td').eq(q).html() < $(tr[j+1]).find('td').eq(q).html()) swap(tr[j], tr[j+1]);
        });
    });
    changeColor(str);
}
function swap(m, n) {
    var temp = $(m).html();
    $(m).html($(n).html());
    $(n).html(temp);
}
function changeColor(str) {
    var tr = $("#"+str+" tbody tr");
    _.times(tr.length-1, function(i) {
        if ((i+1) % 2 === 0) $(tr[i]).find('td').ClassName = "odd";
        else $(tr[i]).find('td').ClassName = "alternate";
    });
}