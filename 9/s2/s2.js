var num = new Array("false", "false", "false", "false", "false");
var sumsum = new Array("0", "0", "0", "0", "0");
$(document).ready(function() {
	var over = false, able = false, count = 0;
	var cli = $("#control-ring li");
	$(".apb").click(function() {
		if (!over) {
			count++;
			over = true;
			initialize();
			$(this).toggleClass("_apb");
		    $(".if").toggleClass("control_info");
			$(".mask_button").toggleClass("maskbutton");
			$(".history_button").toggleClass("historybutton");
			$(".setting_button").toggleClass("settingbutton");
			$(".message_button").toggleClass("messagebutton");
			$(".sign_button").toggleClass("signbutton");
			if (count % 2 === 0) {
				over = false;
				return;
			}
			act();
		}
	});
	function initialize() {
		enable(cli);
		$(".unread").html("...");
		$(".sum").html("");
		$(".unread").hide();
		_.times(5, function(i) {
			num[i] = "false";
			sumsum[i] = "0";
		});
		able = false;
	}
	function disable(x, i) {
		x.css("background-color", "grey");
		if (i < 5) num[i] = "wait";
	}
	function enable(x) {x.css("background-color", "rgba(48, 63, 159, 1)");}
	function act() {
		for (var i = 0; i < 5; i++) takeClick(i);
	}
	function showSum() {
		var result = getSum();
		$(".sum").html(result);
		disable($(".control_info"), 5);
		over = false;
	}
	function getSum() {
		var sum = 0;
		_.times(5, function(i) {sum += parseInt(sumsum[i]);});
		return sum;
	}
	function takeClick(x) {
		$.get('.', function(data, status) {
			if (status == 'success') {
				var pos = x;
				_.times(5, function(i) {disable($(cli[i]), i);});
				enable($(cli[pos]));
				setTimeout(function() {$(cli[pos]).find(".unread").show();}, 1000);
				num[pos] = "true";
				sumsum[pos] = data;
				setTimeout(function() {$(cli[pos]).find(".unread").html(data);}, 1500);
				if (pos == "4") able = true;
				fill();
			}
		});
	}
	function fill() {
		if (able) {
			setTimeout(function() {disable($(cli[4]), 4);}, 1000);
			setTimeout(function() {enable($(".control_info"));}, 1500);
			setTimeout(showSum, 2500);
		}
	}
});
