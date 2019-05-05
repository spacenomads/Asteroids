'use strict';
/**
 * SN.ExternalLinks
 * Add target="_blank" attribute to external links
 * Make sure every external link has a rel="external" attribute
 *
 */

SN.externalLinks = {
	init: function(){
		var $externalLinks = SN.cache.$body.find('a.ext,a[rel="external"]');
		// External links
		$externalLinks.each(function(index, el) {
			$(this).attr('target', '_blank');
			if (!$(this).attr('rel')) {
				$(this).attr('rel', 'external noopener noreferrer');
			}
		});
	}
};
