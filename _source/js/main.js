var COOKIES = {
	ga_id : null,
	ga_code : null,
	ga_container : null,
	lopd : false,

	init : function() {
		COOKIES.ga_id = 'UA-XXXXXXX-XX';
		COOKIES.ga_code = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + COOKIES.ga_id + "' , 'yoursite.com');ga('send', 'pageview');</script>";
		COOKIES.ga_container = $('#cookie_alert');
		//console.log('COOKIES (Y,N): ' + $.cookie('lopd'));
		if ($.cookie('lopd')) {
			COOKIES.accepted();
		} else {
			COOKIES.ga_container.addClass('shown').find('button').on('click', function() {
				if (!COOKIES.lopd) {
					COOKIES.accepted();
				}
			});
		}
	},

	accepted : function() {
		$.cookie('lopd', 'true');
		COOKIES.lopd = true;
		COOKIES.ga_container.removeClass('shown').html(COOKIES.ga_code);
	}
};

jQuery(document).ready(function($) {
	// Responsive snitch
	if ( $('body').hasClass('_dev') ) {
		$('body').width_snitch({
			style:{}
		})
	}

	// External links
	$('.legal a, a.ext').attr('target', '_blank');

	// EU Cookie law
	COOKIES.init();

});
