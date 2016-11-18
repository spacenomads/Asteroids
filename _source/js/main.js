/**
 * Initialize SN object
 */
SN.init = function() {
	SN.cache.init();
	SN.externalLinks.init();
	SN.cookies.init();
}

$(function() {

	SN.init();

	var responsiveDebug = true;





	// > Responsive snitch
	if ( responsiveDebug ) {
		SN.cache.$body.width_snitch({
			style:{}
		})
	}
});
