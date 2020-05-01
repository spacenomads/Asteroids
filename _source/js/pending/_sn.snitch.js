'use strict';
/**
 * SN.snitch
 * Show browser real width, FYI.
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
