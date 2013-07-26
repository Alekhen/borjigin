jQuery.noConflict();
(function($) {
$(function() {

	

	// Device Type Setup
	var browserIsMobile, browserIsiPad;
	var deviceType = navigator.userAgent.toLowerCase();
	if(deviceType.match(/(iphone|ipod|ipad|android|blackberry)/)) {
		browserIsMobile = true;
		if(deviceType.match(/(ipad)/)) {
			browserIsiPad = true;
		} else {
			browserIsiPad = false;
		}
	} else {
		browserIsMobile = false;
		browserIsiPad = false;
	}
	if(browserIsMobile === true && browserIsiPad === true) {
		//$body.append('<meta name="viewport" content="initial-scale=1, maximum-scale=1">');
	}
	if(browserIsMobile === true && browserIsiPad === false) {
		//$body.append('<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5">');
	}






});
})(jQuery);