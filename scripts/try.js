function claim(subscription) {
	document.getElementById('blue-trial').className = 'white hide';
	document.getElementById('yellow-trial').className = 'white hide';
	document.getElementById(subscription + '-trial').className = 'white';
}