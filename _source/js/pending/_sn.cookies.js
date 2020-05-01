'use strict';
SN.cookies = {
	gaID : null,
	gaCode : null,
	gaCodeContainer: null,
	gaContainer : null,
	lopd : false,
	testMode: false,

	init : function() {
		SN.cookies.gaID = 'UA-XXXXXXXX-X';
		SN.cookies.gaYourSite = 'auto';
		SN.cookies.gaCode = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + SN.cookies.gaID + "' , '" + SN.cookies.gaYourSite + "');ga('send', 'pageview');</script>";
		SN.cookies.gaContainer = $('.js__cookie-alert');
		SN.cookies.gaCodeContainer = SN.cookies.gaContainer.find('.js__cookie-code');
		//console.log('COOKIES (Y,N): ' + $.cookie('lopd'));
		if ($.cookie('lopd')) {
			SN.cookies.accepted();
		} else {
			var alertHeight = SN.cookies.gaContainer.find('.wrapper').height();
			SN.cookies.gaContainer.addClass('js__cookie-alert--is-visible');
			SN.cookies.gaContainer.find('.js__cookie-btn').on('click', function() {
				SN.cookies.gaContainer.removeClass('js__cookie-alert--is-visible');
				//SN.cookies.gaContainer.animate({'height': 0});
			});

			/**
			 * Detects the first user interaction (scroll, click or mouse movement) as de acceptance of the UE cookie law
			 */
			$( document ).one('scroll click mousemove', function(e) {
				if (e.originalEvent) {
						if (!SN.cookies.lopd) {
							SN.cookies.accepted();
							//$('body').addClass('ga_active');
						}
		    }
			});
		}

		var adjustCookiesAlert = function() {
			if ( SN.cookies.gaContainer.hasClass('js__cookie-alert--is-visible') ) {
				//SN.cookies.gaContainer.height( SN.cookies.gaContainer.find('.wrapper').height() );
			}
		};

		adjustCookiesAlert();

		$(window).resize(function(event) {

			adjustCookiesAlert();
		});

	},

	accepted : function() {
		$.cookie('lopd', 'true');
		SN.cookies.lopd = true;
		if (!SN.cookies.testMode) {
			SN.cookies.gaCodeContainer.html(SN.cookies.gaCode);
		}
	}
};
