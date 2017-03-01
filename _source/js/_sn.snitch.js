/**
 * SN.snitch
 * Show browser window real width, FYI.
 *
 */

SN.snitch = {
	init: function(responsiveDebug){

		// > Responsive snitch
		if ( responsiveDebug ) {
			SN.cache.$body.width_snitch({
				style:{}
			})
		}
	}
};
