var sumsum = new Array("0", "0", "0", "0", "0");
$(document).ready(function() {
	var over = false, able = false, count = 0, counter = 0;
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
			_.times(5, function(i) {
				takeClick.call(cli[i]);
			});
		}
	});
	function initialize() {
		enable(cli);
		$(".unread").html("...");
		$(".sum").html("");
		$(".unread").hide();
		_.times(5, function(i) {sumsum[i] = "0";});
		able = false;
		counter = 0;
	}
	function disable(x) {
		x.css("background-color", "grey");
	}
	function enable(x) {x.css("background-color", "rgba(48, 63, 159, 1)");}
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
	function takeClick() {
		var that = this;
		var pos;
		var i = $(that).index();
		enable($(cli));
		$(cli[i]).find(".unread").show();
		$.get('/'+i, function (data, status) {
			if (status == 'success') {
				sumsum[i] = data;
				$(cli[i]).find(".unread").html(data);
				disable($(cli[i]));
				++counter;
				if (counter == 5) {
					able = true;
					pos = i;
				}
				fill(pos);
			}
		});
	}
	function fill(pos) {
		if (able) {
			enable($(".control_info"));
			setTimeout(showSum, 500);
		}
	}
});
