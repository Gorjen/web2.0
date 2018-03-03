window.onload = function() {
	var regulation;
	var valid = {username:false, email:false, number:false, phone:false};
	$("input[name=\"username\"]").blur(function() {
		regulation = /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/;
		var re = new RegExp(regulation);
		if(!re.test($(this).val())){
			valid.username = false;
		}
		else {
			$(this).next().text("");
			valid.username = true;
		}
	});

	$("input[name=\"email\"]").blur(function() {
		regulation = /^[a-zA-Z_]+@(([a-zA-Z_])+\.)[a-zA-Z]{2,4}$/;
		var re = new RegExp(regulation);
		if(!re.test($(this).val())){
			valid.email = false;
		} else {
			valid.email = true;
			$(this).next().text("");
		}
	});

	$("input[name=\"number\"]").blur(function() {
		regulation = /^[^0]{1}[0-9]{7}$/;
		var re = new RegExp(regulation);
		if(!re.test($(this).val())){
			valid.number = false;
		} else {
			$(this).next().text("");
			valid.number = true;
		}
	});
	
	$("input[name=\"phone\"").blur(function() {
		regulation = /^[^0]{1}[0-9]{10}$/;
		var re = new RegExp(regulation);
		if(!re.test($(this).val())){
			valid.phone = false;
		} else {
			valid.phone = true;
			$(this).next().text("");
		}
	});
	
	$("form").submit(function(e) {
		var val = ["username", "email", "number", "phone"];
		for (val i = 0; i < val.length; i++) {
			if(!valid.val[i]){
				alert("请重新输入"+val);
				e.preventDefault();
			}
		}
	})
}
