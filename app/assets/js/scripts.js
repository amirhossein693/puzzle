(function ($) {
	'use strict';

	$(document).ready(function(){
		var options = {
			tileCount: 2,
			time: 4,
		};
		var img = 'assets/images/002.jpg';
		window.puzzle = $('#puzzle').puzzle(options, img);
	});

})(jQuery);