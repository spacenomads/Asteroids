/**
 * SN.accordion
 * Manages Collapsible groups and accordion sections
 *
 */

SN.accordion = {
	visible: 'none',
	init: function(){
		var $collapsible = SN.cache.$body.find('.js__collapsible');

		if ($collapsible.length) {
			$collapsible.each(function(index, el) {
				var visible = $(this).data('visible') ? $(this).data('visible') : SN.accordion.visible;
				console.log('>>> vivible: ' + visible);
				$(this).find('.js__collapsible-item').each(function(index, el) {
					//$(this).attr('data-item', index);
					$(this).data('item', index);
					$(this).children('.js__collapsible-label').text( $(this).children('.js__collapsible-label').text() + ' ' + index); //delete
					$(this).children('.js__collapsible-content').text( $(this).children('.js__collapsible-content').text() + ' ' + index) //delete
				});
			});
		}
	}
};
