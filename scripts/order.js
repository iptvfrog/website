function inputOrderType(selection) {
	if (selection == 'box') {
		var boxDisplay = 'orderBoxCountry';
		confirmOrderType = ' order an Android TV box with a three month IPTV subscription';
		document.getElementById('hideForBoxOrder').style.display = 'none';
	} else if (selection == 'iptv') {
		var boxDisplay = 'orderIPTVCustomerType';
		document.getElementById('orderProcessingId').value = 'D39R66RL8YPZ6';
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
	} else if (selection == 'renew') {
		var customer = 'EXISTING';
		document.getElementById('hideForRenewIPTV').style.display = 'none';
		document.getElementById('newrecommend').style.display = 'none';
		confirmOrderType = ' renew your IPTV subscription for an additional';
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
	} else if (selection == 'three') {
		document.getElementById('iptvduration').value = '3 Months';
		confirmOrderLength = ' three months';
	} else {
		return;
	}
	document.getElementById('orderIPTVOrderLength').style.display = 'none';
	document.getElementById('orderPhoneNumber').style.display = 'block';
}

function inputOrderBoxLocation(selection) {
	if (selection == 'usa') {
		document.getElementById('orderProcessingId').value = 'VDB6N6BYQZGSU';
	} else if (selection == 'intl') {
		document.getElementById('orderProcessingId').value = 'VPGQTMPXNJUYS';
	} else {
		return;
	}
	document.getElementById('orderBoxCountry').style.display = 'none';
	document.getElementById('orderPhoneNumber').style.display = 'block';
}

function inputPhoneNumber() {
	var phone = document.getElementById('phonenumberinput').value;
	var orderCode = document.getElementById('ordercode');
	orderCode.value = phone + ' ' + orderCode.value;
	var mac = '00:1A:79:' + phone.charAt(7) + phone.charAt(8) + ':' + phone.charAt(10) + phone.charAt(11) + ':' + phone.charAt(12) + phone.charAt(13);
	document.cookie = 'mac=' + mac + '; path=/success';
	document.getElementById('orderPhoneNumber').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'none';
	document.getElementById('orderPlace').style.display = 'block';
	document.getElementById('orderConfirmMessage').textContent = 'Are you sure that you would like to ' + confirmOrderType + confirmOrderLength + '?';
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
	document.getElementById('orderTypeChoice').style.display = 'none';
	document.getElementById('orderIPTVCustomerType').style.display = 'none';
	document.getElementById('orderIPTVOrderLength').style.display = 'none';
	//document.getElementById('orderBoxCountry').style.display = 'none';
	document.getElementById('orderPhoneNumber').style.display = 'none';
	document.getElementById('orderPlace').style.display = 'none';
	document.getElementById('restartOrderBtn').style.display = 'none';
	document.getElementById('orderTypeChoice').style.display = 'block';
	document.getElementById('phonenumberinput').value = '';
	document.getElementById('phoneNumberReady').disabled = true;
	document.getElementById('ordercode').value = '';
}

var confirmOrderType = '';
var confirmOrderLength = '';

document.getElementById('phonenumberinput').addEventListener('keyup',function(evt){
        var phoneNumber = document.getElementById('phonenumberinput');
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        phoneNumber.value = phoneFormat(phoneNumber.value);
		genOrderCode();
});