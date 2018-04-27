function startOrder() {
	toggle(1);
	document.getElementById('restartOrderBtn').style.display = 'block';
}

function inputPhoneNumber() {
	var phone = document.getElementById('phonenumberinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = phone + ' ' + orderCode.value;
	toggle(2);
}

function inputReferral() {
	var referralcode = document.getElementById('referralinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = orderCode.value + ' Referral: ' + referralcode;
	toggle(3);
}

function skipReferral() {
	toggle(3);
}

function inputPromoCode() {
	var promocode = document.getElementById('promocodeinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = orderCode.value + ' Promo: ' + promocode;
	document.getElementById('restartOrderBtn').style.display = 'none';
	toggle(4);
}

function skipPromoCode() {
	document.getElementById('restartOrderBtn').style.display = 'none';
	toggle(4);
}

function promocodeFormat(input) {
	input = input.trim().toLowerCase();
	input = input.substring(0,12);
	if (input.length > 7 && input.length < 13) {
		document.getElementById('promocodeready').disabled = false;
	} else {
		document.getElementById('promocodeready').disabled = true;
	}
	return input;
}

function phoneFormat(input){
        input = input.replace(/\D/g,'');
        input = input.substring(0,10);
        var size = input.length;
        if(size == 0){
                input = input;
        }else if(size < 4){
                input = '('+input;
        }else if(size < 7){
                input = '('+input.substring(0,3)+') '+input.substring(3,6);
        }else{
                input = '('+input.substring(0,3)+') '+input.substring(3,6)+'-'+input.substring(6,10);
        }
		if (size == 10) {
			document.getElementById('phoneNumberReady').disabled = false;
		} else {
			document.getElementById('phoneNumberReady').disabled = true;
		}
        return input;
}

function submitOrder() {
	document.getElementById('submitbutton').click();
}

function restartOrder() {
	toggle(0);
	document.getElementById('phonenumberinput').value = '';
	document.getElementById('phoneNumberReady').disabled = true;
	document.getElementById('referralinput').value = fullref;
	document.getElementById('referralready').disabled = true;
	document.getElementById('promocodeinput').value = '';
	document.getElementById('promocodeready').disabled = true;
	document.getElementById('ordercode').value = '';
}

function toggle(screen) {
	// 0 = Start order
	// 1 = Phone number
	// 2 = Referral
	// 3 = Promocode
	// 4 = Confirmation
	var screens = document.getElementsByClassName('order-input-screen');
	for (var i = 0; i < screens.length; i++) {
		if (i == screen) {
			screens[i].style.display = 'block';
		} else {
			screens[i].style.display = 'none';
		}
	}
}

function convert(character) {
	var mask = ['L','H','4','D','E','N','K','C','6','R','I','A','P','3','Q','8','5','9','B','M','G','2','F','7','1','J'];
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var charIndex = mask.indexOf(character);
	if (charIndex >= 0) {
		return letters[charIndex];
	} else {
		return " ";
	}
}

function checkCookie() {
	var refcookie = getCookie('referral');
	if (refcookie != null) {
		var fullref = '';
		for (var i = 0; i < refcookie.length; i++) {
			fullref += convert(refcookie.charAt(i).toUpperCase());
		}
		document.getElementById('referralinput').value = fullref;
		document.getElementById('referralinput').readOnly = true;
		document.getElementById('referralready').disabled = false;
		document.getElementById('skipreferral').disabled = true;
		document.getElementById('referralfoundnote').style.display = 'block';
	} else {
		var fullref='';
		document.getElementById('referralinput').readOnly = false;
		document.getElementById('skipreferral').disabled = false;
		document.getElementById('referralfoundnote').style.display = 'none';
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

checkCookie();
toggle(0);

document.getElementById('phonenumberinput').addEventListener('keyup',function(evt){
        var phoneNumber = document.getElementById('phonenumberinput');
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        phoneNumber.value = phoneFormat(phoneNumber.value);
});

document.getElementById('promocodeinput').addEventListener('keyup',function(evt){
        var promocode = document.getElementById('promocodeinput');
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        promocode.value = promocodeFormat(promocode.value);
});

document.getElementById('referralinput').addEventListener('keyup',function(evt){
        var referralcode = document.getElementById('referralinput');
		referralcode.value = referralcode.value.toUpperCase();
		console.log(referralcode.value);
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (referralcode.value.length > 0) {
			document.getElementById('referralready').disabled = false;
		} else {
			document.getElementById('referralready').disabled = true;
		}
});