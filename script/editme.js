var editMe = function(object) {
	// ==== put on your code... ====
	var hour = document.querySelector('#hour');
	var min = document.querySelector('#min');
	var sec = document.querySelector('#sec');

    var zeroPadding = function(num) {
    	if (0 <= num && num < 10) {
    		return '0' + num;
    	}
    	return num;
    }

    var timer = function() {
    	d = new Date();
        hour.textContent = zeroPadding(d.getHours());
        min.textContent = zeroPadding(d.getMinutes());
        sec.textContent = zeroPadding(d.getSeconds());
    };
    
    timer();
    var t = setInterval(function() {
    	timer();
    },1000);
   	// =============================
};