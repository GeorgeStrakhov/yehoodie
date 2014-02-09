//blast off
function initJS() {
	//get the last yehoodie
	var yehoodie = Yehoodies[Yehoodies.length-1];
	if(window.location.hash) {
		var yslug = window.location.hash.split('#/')[1];
		$.each(Yehoodies, function(){
			if(this.slug == yslug) {
				yehoodie = this;
			}
		});
	}
	loadYehoodie(yehoodie);
}

function registerListeners() {
	$('.paginate').on('click', function(){
		var offset = ($(this).hasClass('right')) ? 1 : -1;
		changeYehoodie(offset);
	});
}

function changeYehoodie(offset) {
	//get current yehoodie.name from the hash
	var currentName = window.location.hash.split('/')[1];
	var currentObj = getObjectByProperty(currentName, 'slug', Yehoodies);
	var currentInd = getIndex(currentObj, Yehoodies);
	if(Yehoodies[currentInd+offset]){
		$('.middleContainer').height($('.yehoodie-pic').height()); //hack to prevent jumping on mobile
		$('.yehoodie-pic').fadeOut('slow', function(){
			loadYehoodie(Yehoodies[currentInd+offset]);
		});
	}
}

function loadYehoodie(yehoodie) {
	if(countdown) {
        clearInterval(countdown);
    }
	var timeData = getTimeData(yehoodie);
	yehoodie.isActive = timeData.isActive;
	yehoodie.timeLeft = timeData.timeLeft;
	showCountdown(yehoodie);
	showContent(yehoodie);
	showPaginators(yehoodie);
	changeUrlHash(yehoodie.slug);
}

function showPaginators(yehoodie) {
	var lastIndex = Yehoodies.length - 1;
	var ind = getIndex(yehoodie, Yehoodies);
	$('.paginate').hide();
	if(ind !== 0) {
		setTimeout(function(){
			$('.paginate.left').fadeIn('slow');
		},500);
	}
	if(ind !== lastIndex) {
		setTimeout(function(){
			$('.paginate.right').fadeIn('slow');
		},500);
	}
}

function changeUrlHash(str) {
	window.location.hash = "/"+str;
}

function getIndex (item, arr) {
	var res = false;
	$.each(arr, function(k,v){
		if (v == item) res = k;
	});
	return res;
}

function getObjectByProperty(itemName, propertyName, arr) {
	var res = false;
	$.each(arr, function(k,v){
		if (v && v[propertyName] == itemName) res = v;
	});
	return res;
}

function getTimeData(yehoodie) {
	//calculate timezones and stuff, thanks moment.js
	var now = moment();
	var userZoneOffset = new Date().getTimezoneOffset();
	now.zone(userZoneOffset);
	var campaignFinish = moment(yehoodie.campaignFinish, 'MM-DD-YYYY hh:mm:ss');
	campaignFinish.zone('-5'); //EST timezone, where teespring is

	var isActive = !campaignFinish.isBefore(now);
	var timeLeft = 0;

	if(isActive) {
		var secondsLeft = campaignFinish.diff(moment(), 'seconds');
		timeLeft = moment.duration(secondsLeft, 'seconds');
	}

	return {
		isActive: isActive,
		timeLeft: timeLeft
	};
}

//show countdown
function showCountdown(yehoodie) {
	//if is gone
	if(!yehoodie.isActive) {
		$('#allCountdown').html('is gone forever<span id="countdown"></span>.');
		$('.buyLink').attr('href','mailto:yehoodie.com@gmail.com?subject=I+want+yehoodie+'+yehoodie.slug+'+edition+back!');
		$('.buyLink').text('Ask for this Yehoodie to come back');
		return;
	}

	//else
	$('#allCountdown').html('sales will end in <span id="countdown"></span>.');
	window.countdown = setInterval(function(){
		var timeData = getTimeData(yehoodie);
		var timeLeftString = humanizeDuration(timeData.timeLeft);
		$('#allCountdown').find('#countdown').first().text(timeLeftString);
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
		//change the buy link
		if(yehoodie.isActive) {
			$('.buyLink').attr('href', yehoodie.buyLink);
			$('.buyLink').text('Buy this Hoodie');
		}
		$('.yehoodie-pic').fadeIn('slow', function(){
			$('.middleContainer').height('auto');
		});
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
	registerListeners();
	initJS();
});
