var num = new Array("false", "false", "false", "false", "false");
var sumsum = new Array("0", "0", "0", "0", "0");
$(document).ready(function() {
	$(".unread").hide();
	var flag = false;
	var cli = $("#control-ring li");
	enable(cli);
	$("#control-ring li").click(function() {
		if (flag) return;
		var pos = deal(this);
		if (num[pos] == "true" || num[pos] == "wait" || num[pos] == "fixed") return;
		num[pos] = "true";
		_.times(5, function(i) {
			if (num[i] != "true") disable($(cli[i]), i);
			else enable($(this));
		});
		$(this).find(".unread").show();
		var that = this;
		$.get('/', function (data, status) {
			if (status == 'success') {
				num[pos] = "fixed";
				sumsum[pos] = data;
				$(that).find(".unread").html(data);
				num[pos] = "true";
				$("control-ring li").click(function() {flag = true;});
				if ($(that).find(".unread").html() != "...") {
					fill();
					normal();
				}
			}
		});
	});
	$("#control-info").click(function() {
		var should = check();
		if (!should) return;
		var result = getSum();
		$(".sum").html(result);
		disable($("#control-info"), 5);
	});
	$("#button").mouseleave(function() {
		enable(cli);
		$(".unread").html("...");
		$(".sum").html("");
		$(".unread").hide();
		flag = false;
		_.times(5, function(i) {
			num[i] = "false";
			sumsum[i] = "0";
		})
	});
	function fill() {
		var re2 = $.inArray("wait", num);
		if (re2 == -1) enable($("#control-info"));
	}
	function check() {
		_.times(5, function(i) {if (num[i] == "false" || num[i] == "wait") return false;});
		disable(cli, 5);
		return true;
	}
	function getSum() {
		var sum = 0;
		_.times(5, function(i) {sum += parseInt(sumsum[i]);});
		return sum;
	}
	function deal(that) {
		var l = $(that).attr("id");
		if (l == "mask") return "0";
		if (l == "history") return "1";
		if (l == "message") return "2";
		if (l == "setting") return "3";
		if (l == "sign") return "4";
	}
	function disable(x, i) {
		x.css("background-color", "grey");
		if (i < 5) num[i] = "wait";
	}
	function enable(x) {x.css("background-color", "rgba(48, 63, 159, 1)");}
	function normal() {
		_.times(5, function(i) {
		    if (num[i] == "wait") {
		    	enable($(cli[i]));
		    	num[i] = "false";
		    } else {
		    	disable($(cli[i]));
		    }
	    });
	    flag = false;
	}
});
