function startOrder() {
	toggle(2);
	document.getElementById('restartOrderBtn').style.display = 'block';
}

function inputOrderIPTVPackageType(selection) {
	orderPackage = selection;
	if (orderPackage == 'combo') {
		document.querySelector('#orderIPTVOrderLength .onemonth .price').textContent = '$20.00 USD / month';
		document.querySelector('#orderIPTVOrderLength .threemonth .price').textContent = '$17.00 USD / month';
	} else {
		document.querySelector('#orderIPTVOrderLength .onemonth .price').textContent = '$10.00 USD / month';
		document.querySelector('#orderIPTVOrderLength .threemonth .price').textContent = '$9.00 USD / month';
	}
	
	if (orderPackage == 'combo') {
		document.getElementById('orderProcessingId').value = 'MYK2FVVN62EHC';
	} else if (orderPackage == 'blue') {
		document.getElementById('orderProcessingId').value = 'D39R66RL8YPZ6';
	} else if (orderPackage = 'yellow') {
		document.getElementById('orderProcessingId').value = 'SSR39JKTXZM52';
	} else {
		document.getElementById('orderProcessingId').value = '';
	}
	toggle(3);
}

function inputOrderIPTVCustomerType(selection) {
	if (selection == 'new') {
		customer = 'NEW';
		confirmOrderType = ' order an IPTV subscription for';
		document.getElementById('hideForNewIPTV').style.display = 'none';
		document.getElementById('newrecommend').style.display = 'inline';
		var orderCode = document.getElementById('ordercode');
		orderCode.value = '*' + customer + '*';
		document.cookie = 'order=' + customer.toLowerCase() + '; path=/success';
		toggle(1);
	} else if (selection == 'renew') {
		window.location.href = 'http://iptvfrog.com/renew?r=n';
	} else {
		return;
	}
}

function inputOrderIPTVLength(selection) {
	if (selection == 'one') {
		document.getElementById('iptvduration').value = '1 Month';
		confirmOrderLength = ' one month';
	} else if (selection == 'three') {
		document.getElementById('iptvduration').value = '3 Months';
		confirmOrderLength = ' three months';
	} else {
		return;
	}
	toggle(4);
}

function inputPhoneNumber() {
	var phone = document.getElementById('phonenumberinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = phone + ' ' + orderCode.value;
	var mac = '00:1A:79:' + phone.charAt(7) + phone.charAt(8) + ':' + phone.charAt(10) + phone.charAt(11) + ':' + phone.charAt(12) + phone.charAt(13);
	document.cookie = 'mac=' + mac + '; path=/success';
	document.getElementById('orderConfirmMessage').textContent = 'Are you sure that you would like to ' + confirmOrderType + confirmOrderLength + '?';
	
	if (customer == 'NEW') {
		toggle(5);
	} else {
		toggle(6);
	}
}

function addReferral(answer) {
	if (answer) {
		var referralcode = document.getElementById('referralinput').value;
		var orderCode = document.getElementById('ordercode');
		orderCode.value = orderCode.value + ' Referral: ' + referralcode;
	}
	toggle(6);
}

function addPromo(answer) {
	if (answer) {
		var promocode = document.getElementById('promocodeinput').value;
		var orderCode = document.getElementById('ordercode');
		orderCode.value = orderCode.value + ' Promo: ' + promocode;
	}
	document.getElementById('restartOrderBtn').style.display = 'none';
	toggle(7);
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
	// 1 = Server
	// 2 = New or renew
	// 3 = Months
	// 4 = Phone number
	// 5 = Referral
	// 6 = Promocode
	// 7 = Order confirm
	var screens = document.getElementsByClassName('order-input-screen');
	for (var i = 0; i < screens.length; i++) {
		if (i == screen) {
			screens[i].style.display = 'block';
		} else {
			screens[i].style.display = 'none';
		}
	}
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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

function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
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

var confirmOrderType = '';
var customer = '';
var confirmOrderLength = '';
var orderPackage = '';
var ref = getParameterByName('ref');
if (ref != null && ref != ''){
	var fullref = '';
	for (var i = 0; i < ref.length; i++) {
		fullref += convert(ref.charAt(i).toUpperCase());
	}
	createCookie('referral',ref,30);
	document.getElementById('referralinput').value = fullref;
	document.getElementById('referralinput').readOnly = true;
	document.getElementById('referralready').disabled = false;
	document.getElementById('skipreferral').disabled = true;
} else {
	var fullref='';
	document.getElementById('referralinput').readOnly = false;
	document.getElementById('skipreferral').disabled = false;
	document.getElementById('referralfoundnote').style.display = 'none';
	checkCookie();
}
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