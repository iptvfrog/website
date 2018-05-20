function getPrams() {
	var macAddress = document.getElementById('order-mac');
	var currentPackage = document.getElementById('order-current');
	var newPackage = document.getElementById('order-service');
	var renewLength = document.getElementById('order-duration');
	
	var pramString = getParameterByName('r');
	
	if (pramString.length != 7) {
		window.location.replace("http://iptvfrog.com");
		return;
	}
	
	var macAdd = pramString.charAt(0) + pramString.charAt(1) + ":" + pramString.charAt(2) + pramString.charAt(3);
	var cPack = pramString.charAt(4);
	var nPack = pramString.charAt(5);
	var rLeng = pramString.charAt(6);
	
	macAddress.textContent = 'XX:XX:XX:XX:' + macAdd;
	
	if (cPack == 'b') {
		currentPackage.textContent = 'Blue';
	} else if (cPack == 'y') {
		currentPackage.textContent = 'Yellow';
	} else {
		window.location.replace("http://iptvfrog.com");
		return;
	}
	
	if (nPack == 'b') {
		newPackage.selectedIndex = 0;
	} else if (nPack == 'y') {
		newPackage.selectedIndex = 1;
	} else {
		if (cPack == 'b') {
			newPackage.selectedIndex = 0;
		} else if (cPack == 'y') {
			newPackage.selectedIndex = 1;
		} else {
			window.location.replace("http://iptvfrog.com");
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

function placeOrder() {
	var macAddress = document.getElementById('order-mac').textContent;
	var currentPackage = document.getElementById('order-current').textContent.toLowerCase();
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
	
	paypalOrderCode.value = macAddress;
	
	if (newPackage == currentPackage) {
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
}

getPrams();