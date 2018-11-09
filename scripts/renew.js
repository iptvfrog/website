function getInfo() {
	var subPackage = document.getElementById('confirm-service').options[document.getElementById('confirm-service').selectedIndex].value;
	if (subPackage.length != 1) {
		subPackage = 'none';
	}
	document.getElementById('renew-get-info-box').className = subPackage;
}

function fillOrder() {
	var macAddress1 = document.getElementById('mac-address-1').value;
	var macAddress2 = document.getElementById('mac-address-2').value;
	var username = document.getElementById('username').value;
	var subPackage = document.getElementById('confirm-service').options[document.getElementById('confirm-service').selectedIndex].value;
	var error = false;
	
	if (macAddress1.length != 2 && subPackage != 'y') {
		document.getElementById('mac-address-1').className = 'error';
		error = true;
	} else {
		document.getElementById('mac-address-1').className = '';
	}
	
	if (macAddress2.length != 2 && subPackage != 'y') {
		document.getElementById('mac-address-2').className = 'error';
		error = true;
	} else {
		document.getElementById('mac-address-2').className = '';
	}
	
	if (username.length < 4 && subPackage != 'b') {
		document.getElementById('username').className = 'error';
		error = true;
	} else {
		document.getElementById('username').className = '';
	}
	
	if (subPackage != 'y' && subPackage != 'b' && subPackage != 'c') {
		document.getElementById('confirm-service').className = 'error';
		error = true;
	} else {
		document.getElementById('confirm-service').className = '';
	}
	
	if (error) {
		return;
	}
	
	if (subPackage == 'b') {
		username = '';
	}
	if (subPackage == 'y') {
		macAddress1 = '00';
		macAddress2 = '00';
	}
	
	var url = 'http://iptvfrog.com/renew?r=' + subPackage + subPackage + '1' + macAddress1 + macAddress2 + username;
	window.location.replace(url);
}

function getPrams() {
	var macAddress = document.getElementById('order-mac');
	var macAddress = document.getElementById('order-mac');
	var username = document.getElementById('order-username');
	var currentPackage = document.getElementById('order-current');
	var newPackage = document.getElementById('order-service');
	var renewLength = document.getElementById('order-duration');
	
	var pramString = getParameterByName('r');
	
	if (pramString == null || pramString.length < 7) {
		document.getElementById('renew-order-table').parentNode.removeChild(document.getElementById('renew-order-table'));
		document.getElementById('renew-get-info-box').style.display = 'block';
		return;
	}
	
	document.getElementById('renew-get-info-box').parentNode.removeChild(document.getElementById('renew-get-info-box'));
	
	var cPack = pramString.charAt(0);
	var nPack = pramString.charAt(1);
	var rLeng = pramString.charAt(2);
	var macAdd = pramString.charAt(3) + pramString.charAt(4) + ":" + pramString.charAt(5) + pramString.charAt(6);
	var uName = '';
	uName = pramString.slice(7);
	
	macAddress.textContent = 'XX:XX:XX:XX:' + macAdd;
	username.textContent = uName;
	
	if (cPack == 'b') {
		currentPackage.textContent = 'Blue Frog Subscription';
		currentPackage.className = 'b';
	} else if (cPack == 'y') {
		currentPackage.textContent = 'Yellow Frog Subscription';
		currentPackage.className = 'y';
	} else if (cPack == 'c') {
		currentPackage.textContent = 'Combo Subscription (Blue & Yellow)';
		currentPackage.className = 'c'
	} else {
		window.location.replace("http://iptvfrog.com/renew");
		return;
	}
	
	document.getElementById('renew-order-table').className = cPack;
	
	if (nPack == 'b') {
		newPackage.selectedIndex = 0;
	} else if (nPack == 'y') {
		newPackage.selectedIndex = 1;
	} else if (nPack == 'c') {
		newPackage.selectedIndex = 2;
	} else {
		if (cPack == 'b') {
			newPackage.selectedIndex = 0;
		} else if (cPack == 'y') {
			newPackage.selectedIndex = 1;
		} else if (cPack == 'c') {
			newPackage.selectedIndex = 2;
		} else {
			window.location.replace("http://iptvfrog.com/renew");
			return;
		}
	}
	
	if (rLeng == '1') {
		renewLength.selectedIndex = 0;
	} else if (rLeng == '3') {
		renewLength.selectedIndex = 1;
	} else {
		renewLength.selectedIndex = 0;
	}
	
	if (nPack == 'y' && uName.length < 1) {
		window.location.replace("http://iptvfrog.com/renew");
		return;
	}
	
	updateTotal();
	checkWarning();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkWarning() {
	var currentPackage = document.getElementById('order-current').className;
	var newPackage = document.getElementById('order-service').options[document.getElementById('order-service').selectedIndex].value;
	var warningMsg = document.getElementById('combo-warning');
	if (newPackage == 'combo' && currentPackage != 'combo') {
		if (currentPackage == 'b') {
			document.getElementById('combo-warning-sub').textContent = 'Yellow';
		} else {
			document.getElementById('combo-warning-sub').textContent = 'Blue';
		}
		warningMsg.className = '';
	} else {
		warningMsg.className = 'hide';
	}
	updateTotal();
}

function updateTotal() {
	var newPackage = document.getElementById('order-service').options[document.getElementById('order-service').selectedIndex].value;
	var renewLength = document.getElementById('order-duration').options[document.getElementById('order-duration').selectedIndex].value;
	var totalDisplay = document.getElementById('order-subtotal');
	var subTotal;
	
	if (newPackage == 'blue' || newPackage == 'yellow') {
		if (renewLength == 1) {
			subTotal = 10;
		} else if (renewLength == 3) {
			subTotal = 27;
		}
	} else if (newPackage == 'combo') {
		if (renewLength == 1) {
			subTotal = 20;
		} else if (renewLength == 3) {
			subTotal = 51;
		}
	}
	totalDisplay.textContent = '$' + subTotal + '.00';
}

function placeOrder() {
	var macAddress = document.getElementById('order-mac').textContent;
	var username = document.getElementById('order-username').textContent;
	var currentPackage = document.getElementById('order-current').className;
	var newPackage = document.getElementById('order-service').options[document.getElementById('order-service').selectedIndex].value;
	var renewLength = document.getElementById('order-duration').options[document.getElementById('order-duration').selectedIndex].value;
	var promoCode = document.getElementById('order-promocode').value.trim().toUpperCase();
	var agreed = document.getElementById('order-agree').checked;
		
	var paypalOrderCode = document.getElementById('ordercode');
	var paypalLength = document.getElementById('iptvduration');
	var paypalID = document.getElementById('orderProcessingId');
	
	if (newPackage == 'blue') {
		paypalID.value = 'D39R66RL8YPZ6';
	} else if (newPackage == 'yellow') {
		paypalID.value = 'SSR39JKTXZM52';
	} else if (newPackage == 'combo') {
		paypalID.value = 'MYK2FVVN62EHC';
	} else {
		alert('Unknown Error! Please contact support.');
	}
	
	if (renewLength == 1) {
		paypalLength.value = '1 Month';
	} else if (renewLength == 3) {
		paypalLength.value = '3 Months';
	} else {
		alert('Unknown Error! Please contact support.');
	}
	
	if (currentPackage == 'b' || (currentPackage == 'c' && newPackage.charAt(0) == 'b')) {
		username = 'N/A';
	} else if (currentPackage == 'y' || (currentPackage == 'c' && newPackage.charAt(0) == 'y')) {
		macAddress = 'N/A'
	}
	
	paypalOrderCode.value = macAddress + ' Username: ' + username;
	
	if (newPackage.charAt(0) == currentPackage || newPackage.charAt(0) == 'c') {
		paypalOrderCode.value += ' *RENEW*';
	} else {
		paypalOrderCode.value += ' *CHANGE*';
	}
	
	if (promoCode.length > 0) {
		paypalOrderCode.value += ' Promo Code: ' + promoCode;
	}
	
	if (agreed) {
		document.getElementById('submitbutton').click();
	} else {
		document.getElementsByClassName('checkmark')[0].id = 'missing';
	}
	alert(paypalOrderCode.value);
}

getPrams();
getInfo();
