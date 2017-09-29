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
    return "";
}

var mac = getCookie('mac');
if (mac != '') {
	document.getElementsByTagName('a')[1].href += '?mac=' + mac;
}

//var customer = getCookie('order');
//if (customer != 'new') {
//	document.getElementsByTagName('a')[1].style.display = 'none';
//}
