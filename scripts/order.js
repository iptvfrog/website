function inputOrderType(selection) {
	if (selection == 'box') {
		var boxDisplay = 'orderBoxCountry';
		confirmOrderType = ' order an Android TV box with a three month IPTV subscription';
		document.getElementById('hideForBoxOrder').style.display = 'none';
	} else if (selection == 'iptv') {
		var boxDisplay = 'orderIPTVCustomerType';
		document.getElementById('orderProcessingId').value = 'D39R66RL8YPZ6';
		ga('gtag_UA_115185417_1.send', 'event', 'Order', 'Click', 'Order started');
	} else {
		return;
	}
	document.getElementById('orderTypeChoice').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'block';
	document.getElementById(boxDisplay).style.display = 'block';
}

function inputOrderIPTVCustomerType(selection) {
	if (selection == 'new') {
		var customer = 'NEW';
		confirmOrderType = ' order an IPTV subscription for';
		document.getElementById('hideForNewIPTV').style.display = 'none';
		document.getElementById('newrecommend').style.display = 'inline';
		ga('gtag_UA_115185417_1.send', 'event', 'Order Type', 'Click', 'New customer');
	} else if (selection == 'renew') {
		var customer = 'EXISTING';
		document.getElementById('hideForRenewIPTV').style.display = 'none';
		document.getElementById('newrecommend').style.display = 'none';
		confirmOrderType = ' renew your IPTV subscription for an additional';
		ga('gtag_UA_115185417_1.send', 'event', 'Order Type', 'Click', 'Renewing customer');
	} else {
		return;
	}
	var orderCode = document.getElementById('ordercode');
	orderCode.value = '*' + customer + '*';
	document.cookie = 'order=' + customer.toLowerCase() + '; path=/success';
	document.getElementById('orderIPTVCustomerType').style.display = 'none';
	document.getElementById('orderIPTVOrderLength').style.display = 'block';
}

function inputOrderIPTVLength(selection) {
	if (selection == 'one') {
		document.getElementById('iptvduration').value = '1 Month';
		confirmOrderLength = ' one month';
		ga('gtag_UA_115185417_1.send', 'event', 'Order Duration', 'Click', '1 month');
	} else if (selection == 'three') {
		document.getElementById('iptvduration').value = '3 Months';
		confirmOrderLength = ' three months';
		ga('gtag_UA_115185417_1.send', 'event', 'Order Duration', 'Click', '3 months');
	} else {
		return;
	}
	document.getElementById('orderIPTVOrderLength').style.display = 'none';
	document.getElementById('orderPhoneNumber').style.display = 'block';
}

function inputPhoneNumber() {
	var phone = document.getElementById('phonenumberinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = phone + ' ' + orderCode.value;
	var mac = '00:1A:79:' + phone.charAt(7) + phone.charAt(8) + ':' + phone.charAt(10) + phone.charAt(11) + ':' + phone.charAt(12) + phone.charAt(13);
	document.cookie = 'mac=' + mac + '; path=/success';
	document.getElementById('orderPhoneNumber').style.display = 'none';
	document.getElementById('orderPromoCode').style.display = 'block';
	document.getElementById('orderConfirmMessage').textContent = 'Are you sure that you would like to ' + confirmOrderType + confirmOrderLength + '?';
}

function inputPromoCode() {
	var promocode = document.getElementById('promocodeinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = orderCode.value + ' Promo: ' + promocode;
	document.getElementById('orderPromoCode').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'none';
	document.getElementById('orderPlace').style.display = 'block';
	ga('gtag_UA_115185417_1.send', 'event', 'Order Promocode', 'Click', 'Skipped');
	ga('gtag_UA_115185417_1.send', 'event', 'Order Promocode Info', 'Click', promocode);
}

function skipPromoCode() {
	document.getElementById('orderPromoCode').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'none';
	document.getElementById('orderPlace').style.display = 'block';
	ga('gtag_UA_115185417_1.send', 'event', 'Order Promocode', 'Click', 'Entered');
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
	ga('gtag_UA_115185417_1.send', 'event', 'Order', 'Click', 'Order completed');
	document.getElementById('submitbutton').click();
}

function restartOrder() {
	document.getElementById('orderTypeChoice').style.display = 'none';
	document.getElementById('orderIPTVCustomerType').style.display = 'none';
	document.getElementById('orderIPTVOrderLength').style.display = 'none';
	document.getElementById('orderPhoneNumber').style.display = 'none';
	document.getElementById('orderPromoCode').style.display = 'none';
	document.getElementById('orderPlace').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'none';
	document.getElementById('orderTypeChoice').style.display = 'block';
	document.getElementById('phonenumberinput').value = '';
	document.getElementById('phoneNumberReady').disabled = true;
	document.getElementById('promocodeinput').value = '';
	document.getElementById('promocodeready').disabled = true;
	document.getElementById('ordercode').value = '';
	ga('gtag_UA_115185417_1.send', 'event', 'Order', 'Click', 'Order restarted');
}

var confirmOrderType = '';
var confirmOrderLength = '';

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
