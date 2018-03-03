var num = new Array("false", "false", "false", "false", "false");
var sumsum = new Array("0", "0", "0", "0", "0");
var rand = new Array(0, 0, 0, 0, 0);
var letter = new Array("A", "B", "C", "D", "E");
var isIn = new Array("false", "false", "false", "false", "false");
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
			isIn[i] = num[i] = "false";
			sumsum[i] = "0";
			rand[i] = 0;
			judge(i);
		});
		$("h1").html("");
		$("h1").hide();
		able = false;
		over = false;
	}
	function disable(x, i) {
		x.css("background-color", "grey");
		if (i < 5) num[i] = "wait";
	}
	function enable(x) {x.css("background-color", "rgba(48, 63, 159, 1)");}
	function act() {
		deal();
		$("h1").show();
		for (var i = 0; i < 5; i++) takeClick(rand[i]);
	}
    function deal() {
    	var temp = "";
    	var k = 0;
    	while(1) {
    		temp = parseInt(5*Math.random());
    		if (isIn[temp] == "false") {
    			rand[k] = temp;
    			isIn[temp] = "true";
    			judge(k, temp);
    			$("h1").append(letter[k]);
    			k++;
    			if (k == 5) return;
    		}
    	}
    }
    function judge(i, temp) {
    	if (temp === 0) letter[i] = "A";
    	else if (temp == 1) letter[i] = "B";
    	else if (temp == 2) letter[i] = "C";
    	else if (temp == 3) letter[i] = "D";
    	else if (temp == 4) letter[i] = "E";
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
				setTimeout(function() {$(cli[pos]).find(".unread").show();}, 1000);
				enable($(cli[pos]));
				num[pos] = "true";
				sumsum[pos] = data;
				setTimeout(function() {
					$(cli[pos]).find(".unread").html(data);
					if (pos == rand[4]) fill();
				}, 1500);
			}
		});
	}
	function fill() {
		setTimeout(function() {disable($(cli[rand[4]]), rand[4]);}, 1000);
		setTimeout(function() {enable($(".control_info"));}, 1500);
		setTimeout(showSum, 2500);
	}
});
