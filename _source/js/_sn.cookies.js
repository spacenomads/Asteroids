SN.cookies = {
	gaID : null,
	gaCode : null,
	gaContainer : null,
	lopd : false,

	init : function() {
		SN.cookies.gaID = 'UA-XXXXXXX-XX';
		SN.cookies.gaYourSite = 'yoursite.com';
		SN.cookies.gaCode = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + SN.cookies.gaID + "' , '" + SN.cookies.gaYourSite + "');ga('send', 'pageview');</script>";
		SN.cookies.gaContainer = $('#cookie_alert');
		//console.log('COOKIES (Y,N): ' + $.cookie('lopd'));
		if ($.cookie('lopd')) {
			SN.cookies.accepted();
		} else {
			SN.cookies.gaContainer.addClass('shown').find('button').on('click', function() {
				if (!SN.cookies.lopd) {
					SN.cookies.accepted();
				}
			});
		}
	},

	accepted : function() {
		$.cookie('lopd', 'true');
		SN.cookies.lopd = true;
		SN.cookies.gaContainer.removeClass('shown').html(SN.cookies.gaCode);
	}
};
