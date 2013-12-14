function countDownTimer(dt, id, callback)
{
	var end = new Date(dt);

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {

			clearInterval(timer);
			if(callback && (typeof callback == 'function')) {
				callback.call();
			}
			return;
		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		var minutes = Math.floor((distance % _hour) / _minute);
		var seconds = Math.floor((distance % _minute) / _second);

		document.getElementById(id).innerHTML = days + '&nbsp;days ';
		document.getElementById(id).innerHTML += hours + '&nbsp;hrs ';
		document.getElementById(id).innerHTML += minutes + '&nbsp;mins ';
		document.getElementById(id).innerHTML += seconds + '&nbsp;secs';
	}

	timer = setInterval(showRemaining, 1000);
}