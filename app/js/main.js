//blast off
function initJS() {
	//get the last yehoodie
	var yehoodie = Yehoodies[Yehoodies.length-1];
	showCountdown(yehoodie);
	showContent(yehoodie);
}

//show countdown
function showCountdown(yehoodie) {
	//calculate timezones and stuff, thanks moment.js
	var now = moment();
	var campaignFinish = moment(yehoodie.campaignFinish);
	var zoneOffset = new Date().getTimezoneOffset();
	campaignFinish.zone(zoneOffset);
	// window.campaignFinish = campaignFinish;

	//if is gone
	if(campaignFinish.isBefore(now)) {
		$('#allCountdown').text('is gone forever.');
		// $('.buyLink').fadeOut('slow');
		$('.buyLink').attr('href','mailto:yehoodie.com@gmail.com?subject=I+want+yehoodie+'+yehoodie.slug+'+edition+back!');
		$('.buyLink').text('Ask for this Yehoodie to come back');
		return;
	}

	//else
	var countdown = setInterval(function(){
		var secondsLeft = campaignFinish.diff(moment(), 'seconds');
		var timeLeft = moment.duration(secondsLeft, 'seconds');
		var timeLeftString = humanizeDuration(timeLeft);
		$('#countdown').text(timeLeftString);
	},1000);
}

function humanizeDuration(duration) {
	var output = "";

	var days = duration.days();
	var hours = duration.hours();
	var minutes = duration.minutes();
	var seconds = duration.seconds();
	if(days > 0) {
		output += days+ " days ";
	}
	if(hours > 0) {
		if(hours == 1) {
			output += "1 hour ";
		} else {
			output += hours+ " hours ";
		}
	} else {
		if(days > 0) {
			output += "0 hours ";
		}
	}
	if(minutes > 0) {
		if(minutes == 1) {
			output += "1 minute ";
		} else {
			output += minutes+ " minutes ";
		}
	} else {
		if(days > 0 || hours > 0) {
			output += "0 minutes ";
		}
	}
	if(seconds > 0) {
		if(seconds == 1) {
			output += "1 second";
		} else {
			output += seconds+ " seconds";
		}
	} else {
		if(days > 0 || hours > 0 || minutes > 0) {
			output += "0 seconds";
		}
	}

	return output;
}

function showContent(yehoodie) {

	//change background
	$('body').css('background-color',yehoodie.bgColor);
	//hide spinner
	$('#spinner').fadeOut('slow', function(){
		//show image
		$('.yehoodie-pic').attr('src', 'img/png/yehoodie_'+yehoodie.slug+'.png');
		//change name of edition and link
		$('.yehoodieNameLink').attr('href', yehoodie.readMoreLink);
		$('.yehoodieNameLink').text(yehoodie.name);
		$('.yehoodie-pic').fadeIn('slow');
		//show sidebar
		$('.sidebarRight').fadeIn('slow');

	});


}

//get query param
function getParam(pName) {
	var p = String($.QueryString[pName]);
	return p;
}

//Let's get going
$(window).bind('load', function(){
	initJS();
});