$(document).ready(function(){

	var nicknameOk = false;
	var nameOk = false;
	var surnameOk = false;
	var emailOk = false;
	var passwordOk = false;


	var check_cyrillic = function(name){
		var name_value = $("input[name='"+name+"']").val();

		if (name_value.length == 0) {
			return false;
		}

		if ((name_value.search(/[A-z]/) !== -1 || name_value.search(/[0-9]/) !== -1 )
			 && name_value.length > 0) {
			return false;
		} else {
			return true;
		}
	}

	var check_if_exists = function(name){
		var $input = $("input[name='"+name+"']");

		var result = false;

		if ($input.val().length != 0) {
	        $.ajax({
	            url: 'php/check_if_exists.php',
	            data: 'value='+$input.val()+'&field='+name,
	            type: 'POST',
	            cache: false,
	            async: false,
	            dataType: 'text',
	            success: function(data){
	            	if (data == true) result = true;
	            	else result = false;
	            },
	            error: function(data){
            		console.log("error");
            		result = false;
	            }
	        });

	    }
	    return result;
	}

	var set_input_signs = function(domElement, inputName, ok, message) {
		if ($(domElement).val().length == 0) {
			$("#"+inputName+"-check").remove();
			$("#"+inputName+"-warning").remove();
			$("#"+inputName+"-exclamation").remove();
		} else {
			if (ok) {
				$("#"+inputName+"-warning").remove();
				$("#"+inputName+"-exclamation").remove();
				if ($("#"+inputName+"-check").length == 0 && $(domElement).val().length > 0) {
					$(domElement).before("<span id='"+inputName+"-check' class='check'>&#10004;</span>");
				}
			} else {
				$("#"+inputName+"-check").remove();
				if ($("#"+inputName+"-warning").length == 0) {
					$(domElement).after("<span id='"+inputName+"-warning' class='warning'>"
						+ message + "</span>");
				}
				if ($("#"+inputName+"-exclamation").length == 0) {
					$(domElement).before("<span class='exclamation' id='"+inputName+"-exclamation'>&#65281;</span>");
				}
			}
		}
	}


	$("input[name='nickname']").keyup(function(){
		
		nicknameOk = check_if_exists("nickname");
		console.log(nicknameOk);

		var $input = $(this);

		var nicknameCorrectInput = true;
		
		if ($input.val().length > 0 && 
			($input.val().search(/[А-я]/) !== -1 || 
			$input.val().charAt(0).search(/[0-9]/) !== -1)) 
		{
			nicknameCorrectInput = false;
		} 

		if (nicknameCorrectInput) {
			set_input_signs(this, "nickname", nicknameOk, "Человек с таким никнеймом уже зарегистрирован");
		} else {
			set_input_signs(this, "nickname", nicknameCorrectInput, 
				"Никнэйм должен содержать только латинские буквы и цифры и начинаться с латинской буквы!");
		}
	});

	$("input[name='email']").keyup(function(){
		emailOk = check_if_exists("email");	
		set_input_signs(this, "email", emailOk, "На этот ящик уже зарегистрирован аккаунт");
	});

	$("input[name='name']").keyup(function(){
		nameOk = check_cyrillic('name');
		set_input_signs(this, "name", nameOk, "Имя должно состоять из русских символов!");
	});

	$("input[name='surname']").keyup(function(){
		surnameOk = check_cyrillic('surname');
		set_input_signs(this, "surname", surnameOk, "Фамилия должна состоять из русских символов!");
	});

	$("input[name='password']").keyup(function(){

		if ($(this).val().length < 5) {
			passwordOk = false;
		} else {
			passwordOk = true;
		}

		set_input_signs(this, "password", passwordOk, "Минимальная длина: 5 символов");
	});



	$("input").keyup(function(){
		if (passwordOk && nameOk && nicknameOk && emailOk && surnameOk) {
			$("#form-submit").removeAttr("disabled");
		} else {
			$("#form-submit").attr("disabled", "disabled");
		}
	});

});