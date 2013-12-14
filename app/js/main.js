//blast off
function initJS() {
	countDownTimer('12/24/2013 10:18 AM', 'countdown', function(){
		$('#allCountdown').text('gone forever.');
		$('.buyLink').hide('slow');
	});
}

//register event listeners
function registerListeners() {

}

//get query param
function getParam(pName) {
	var p = String($.QueryString[pName]);
	return p;
}

//Let's get going
$(window).bind('load', function(){
	console.log('Blast off!!!');
	registerListeners();
	initJS();
});