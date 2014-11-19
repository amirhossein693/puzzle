(function ($) {
	'use strict';

	$(document).ready(function(){
		var options = {
			tileCount: 4,
			time: 1,
		};
		var img = 'assets/images/001.jpg';
		$('#puzzle').puzzle(options, img);
	});

})(jQuery);