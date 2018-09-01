var setupURL = 'http://iptvfrog.com/setup?mac=';

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

var mac = getParameterByName('mac');
var userMac = document.getElementsByClassName('macadd');

if(mac != null && mac != ''){
	for (i = 0; i < userMac.length; i++) {
		userMac[i].textContent = mac;
	}
	setTimeout(loadPage, 3000);
} else {
	enterMAC();
}

function loadPage() {
	if (mac == null || mac == '' || mac.length < 17) {
		document.getElementById('loadingtitle').textContent = 'Could not automatically collect your account details';
		document.getElementById('loadingtext').textContent = 'Please complete one of the options below to generate your instructions';
		document.getElementById('enterMAC').style.display = 'block';
	} else {
		setTimeout(function(){
			var splash = document.getElementById('splash');
			if (splash) {
				splash.parentNode.removeChild(splash);
				document.getElementById('packageType').className = '';
			}
		},2000);
	}
}

function enterMAC() {
	document.getElementById('enterMAC').addEventListener('keyup',infoEntered);
}

function infoEntered(e) {
	var dataType = e.target.id;
	if (dataType == 'mac1' || dataType == 'mac2' || dataType == 'mac3' || dataType == 'mac4' || dataType == 'mac5' || dataType == 'mac6') {
		if (e.target.value.length >= 2) {
			e.target.value = e.target.value.toUpperCase();
			document.getElementById('mac' + (parseInt(dataType.charAt(3)) + 1)).focus();
		}
	} else if (dataType == 'phone1' || dataType == 'phone2') {
		if (e.target.value.length >= 3) {
			if (isNaN(parseInt(e.target.value)) || isNaN(parseInt(e.target.value.charAt(0))) || isNaN(parseInt(e.target.value.charAt(1))) || isNaN(parseInt(e.target.value.charAt(2)))) {
				e.target.value = '';
			} else {
				document.getElementById('phone' + (parseInt(dataType.charAt(5)) + 1)).focus();
			}
		}
	} else {
		if (e.target.value.length >= 4) {
			if (isNaN(parseInt(e.target.value)) || isNaN(parseInt(e.target.value.charAt(0))) || isNaN(parseInt(e.target.value.charAt(1))) || isNaN(parseInt(e.target.value.charAt(2))) || isNaN(parseInt(e.target.value.charAt(3)))) {
					e.target.value = '';
			}
		}
	}
}

function submitMAC() {
	var macAddress = '';
	for (i = 1; i < 7; i++) {
		console.log('Checking mac' + i);
		if (macAddress == '') {
			if (document.getElementById('mac' + i).value.length < 2) {
				document.getElementById('mac' + i).className = 'error';
			} else {
				document.getElementById('mac' + i).className = '';
			}
			macAddress = document.getElementById('mac' + i).value;
		} else {
			if (document.getElementById('mac' + i).value.length < 2) {
				document.getElementById('mac' + i).className = 'error';
			} else {
				document.getElementById('mac' + i).className = '';
			}
			macAddress += ':' + document.getElementById('mac' + i).value;
		}
	}
	if (macAddress.length >= 17) {
		window.location.href = setupURL + macAddress;
	}
}

function submitPhone() {
	var macAddress = '00:1A:79:';
	var phone1 = document.getElementById('phone1');
	var phone2 = document.getElementById('phone2');
	var phone3 = document.getElementById('phone3');
	if (phone1.value.length < 3) {
		phone1.className = 'error';
	} else {
		phone1.className = '';
	}
	if (phone2.value.length < 3) {
		phone2.className = 'error';
	} else {
		phone2.className = '';
	}
	if (phone3.value.length < 4) {
		phone3.className = 'error';
	} else {
		phone3.className = '';
	}
	macAddress += phone2.value.charAt(1) + phone2.value.charAt(2) + ':' + phone3.value.charAt(0) + phone3.value.charAt(1) + ':' + phone3.value.charAt(2) + phone3.value.charAt(3);
	if (phone1.className != 'error' && phone2.className != 'error' && phone3.className != 'error') {
		window.location.href = setupURL + macAddress;
	}
}

function changePortal() {
	var e = document.getElementById('instructionsfrog');
	var portal = e.options[e.selectedIndex].value;
	loadURL(portal);
}

function loadURL(portal) {
	document.getElementsByClassName('portalurl')[0].textContent = portal;
	document.getElementById('packageType').style.display = 'none';
	if (portal == 'blue') {
		var portalURL = 'http://blue.iptvfrog.com';
		document.getElementById('frogselectionblue').selected = 'selected';
		document.getElementById('help').className = 'white';
		document.getElementsByClassName('profilename')[0].textContent = 'Blue IPTV Frog';
	} else if (portal == 'yellow') {
		var portalURL = 'http://yellow.iptvfrog.com';
		document.getElementById('frogselectionyellow').selected = 'selected';
		document.getElementById('help').className = 'blue';
		document.getElementsByClassName('profilename')[0].textContent = 'Yellow IPTV Frog';
	} else {
		location.reload();
		return;
	}
	document.getElementsByClassName('portalurl')[0].textContent = portalURL;
}

function showAmazon() {
	document.getElementById('amazon-steps').className = '';
	document.getElementById('follow').className = '';
	document.getElementById('show-steps-button').className = 'hide';
}