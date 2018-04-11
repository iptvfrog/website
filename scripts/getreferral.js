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

var customername = getParameterByName('ref');
if(customername != null && customername != '') {
	document.getElementById('referralname').value = customername;
	getreferral();
}

function clearreferralurl() {
	document.getElementById('referralurl').value = '';
}

function getreferral() {
	var username = document.getElementById('referralname').value;
	if (username.length < 1) {
		return;
	}
	var code = '';
	for (var i = 0; i < username.length; i++) {
		code += convert(username.charAt(i).toUpperCase());
	}
	code = 'http://iptvfrog.com?ref=' + code;
	document.getElementById('referralurl').value = code;
}

function convert(character) {
	var mask = ['L','H','4','D','E','N','K','C','6','R','I','A','P','3','Q','8','5','9','B','M','G','2','F','7','1','J'];
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var charIndex = letters.indexOf(character);
	if (charIndex >= 0) {
		return mask[charIndex];
	} else {
		return "Z";
	}
}