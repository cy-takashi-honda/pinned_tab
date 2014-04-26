var editMe = function(object) {
    // ==== put on your code... ====
    var year  = document.querySelector('#year');
    var month = document.querySelector('#month');
    var date  = document.querySelector('#date');
    var hour  = document.querySelector('#hour');
    var min   = document.querySelector('#min');
    var sec   = document.querySelector('#sec');

    var zeroPadding = function(num) {
        if (0 <= num && num < 10) {
            return '0' + num;
        }
        return num;
    }

    var timer = function() {
        var d = new Date();
        year.textContent  = zeroPadding(d.getFullYear());
        month.textContent = zeroPadding(d.getMonth() + 1);
        date.textContent  = zeroPadding(d.getDate());
        hour.textContent  = zeroPadding(d.getHours());
        min.textContent   = zeroPadding(d.getMinutes());
        sec.textContent   = zeroPadding(d.getSeconds());
    };
    
    timer();
    var t = setInterval(function() {
        timer();
    },1000);
    // =============================
};