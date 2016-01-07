//@prepros-prepend plugins/_plugins.js
//@prepros-prepend plugins/jquery.cookie.js
//@prepros-prepend plugins/jBox.min.js
//@prepros-prepend plugins/jquery.width_snitch.min.js





/*
* #INDEX
*
* COOKIES OBJECT
* ON DOCUMENT READY
* - Vars + Functions
* - Responsive snitch
* EU Cookie law
* - External links
*/





/*
* > COOKIES OBJECT
 */
var COOKIES = {
	ga_id : null,
	ga_code : null,
	ga_container : null,
	lopd : false,

	init : function() {
		COOKIES.ga_id = 'test';
		COOKIES.ga_code = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', '" + COOKIES.ga_id + "', 'auto');ga('send', 'pageview');</script>";




		COOKIES.ga_container = $('#cookie_alert');
		//console.log('COOKIES (Y,N): ' + $.cookie('lopd'));
		if ($.cookie('lopd')) {
			COOKIES.accepted();
			$('body').addClass('ga_active');
		} else {
			COOKIES.ga_container.addClass('shown').find('.button').on('click', function() {

				COOKIES.ga_container.removeClass('shown');
				//COOKIES.accepted();

			});

			/**
			 * Detects the first user interaction (scroll, click or mouse movement) as de acceptance of the UE cookie law
			 */
			$( document ).one('scroll click mousemove', function(e) {
				if (e.originalEvent) {
						if (!COOKIES.lopd) {
							COOKIES.accepted();
							$('body').addClass('ga_active');
						}
		    }
			});


		}
	},

	accepted : function() {
		$.cookie('lopd', 'true');
		COOKIES.lopd = true;
		COOKIES.ga_container.find('.code').html(COOKIES.ga_code);
	}
};





/*
* > ON DOCUMENT READY
 */
jQuery(document).ready(function($) {





/*
* >> Vars + Functions
 */
var
	$body   = $( 'body' );





/*
* >> Responsive snitch
 */
	if ( $('body').hasClass('_dev') ) {
		$('body').width_snitch({
			style:{}
		})
	}





/*
* >> EU Cookie law
 */
COOKIES.init();





/*
* >> External links
 */
	$('.legal a, a.ext').attr('target', '_blank');

});
