/**
 * SN.Cache
 * Cache common objects
 *
 * @type {Object}
 */
SN.cache = {
	init : function(){
		SN.cache.$window = $(window);
		SN.cache.$html = $('html');
		SN.cache.$body = SN.cache.$html.find('body');
	}
};
