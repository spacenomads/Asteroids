var COOKIES = {
	gaID : null,
	gaCode : null,
	gaContainer : null,
	lopd : false,

	init : function() {
		COOKIES.gaID = 'UA-XXXXXXX-XX';
		COOKIES.gaYourSite = 'yoursite.com';
		COOKIES.gaCode = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + COOKIES.gaID + "' , '" + COOKIES.gaYourSite + "');ga('send', 'pageview');</script>";
		COOKIES.gaContainer = $('#cookie_alert');
		//console.log('COOKIES (Y,N): ' + $.cookie('lopd'));
		if ($.cookie('lopd')) {
			COOKIES.accepted();
		} else {
			COOKIES.gaContainer.addClass('shown').find('button').on('click', function() {
				if (!COOKIES.lopd) {
					COOKIES.accepted();
				}
			});
		}
	},

	accepted : function() {
		$.cookie('lopd', 'true');
		COOKIES.lopd = true;
		COOKIES.gaContainer.removeClass('shown').html(COOKIES.gaCode);
	}
};

$(function() {

	const
		$body = $('body'),
		$externalLinks = $body.find('.legal a, a.ext');
	// Responsive snitch
	if ( $body.hasClass('_dev') ) {
		$body.width_snitch({
			style:{}
		})
	}

	// External links
	$externalLinks.attr('target', '_blank');

	// EU Cookie law
	COOKIES.init();

});

//# sourceMappingURL=main.js.map
