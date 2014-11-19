(function ($) {
	'use strict';

	$(document).ready(function(){
		var globalOptions = {
			// solvedMsg: 'آفرین',
			// timeLabel: ["<b>مدت زمان باقی مانده</b>", "x", "ثانیه"],
			// solvedMaskMsg: ["آفرین", "x", "ثانیه طول کشید تا حل شه"],
		};
		var options = {
			tileCount: 2,
			time: 1,
		};
		var img = 'assets/images/001.jpg';
		$('#puzzle').puzzle(globalOptions, options, img);
	});

})(jQuery);