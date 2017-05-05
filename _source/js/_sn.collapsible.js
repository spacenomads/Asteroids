/**
 * SN.collapsible
 * Manages Collapsible groups and accordion sections
 *
 */

SN.collapsible = {
	visible: 'none',
	init: function(){
		var $collapsible = SN.cache.$body.find('.js__collapsible');
		var $collapsibleLabel = SN.cache.$body.find('.js__collapsible-label');


		/**
		 * Unfold every collapsible item
		 * @param  {object} $obj Collapsible object
		 */
		var unfoldCollapsible = function($obj) {
			$obj.find('.js__collapsible-content').show().attr('aria-hidden', false).parent('.js__collapsible-item').addClass('js__collapsible-item--visible');
		};


		/**
		 * Fold every collapsible item
		 * @param  {object} $obj Collapsible object
		 */
		var foldCollapsible = function($obj) {
			$obj.find('.js__collapsible-content').hide().attr('aria-hidden', true).parent('.js__collapsible-item').removeClass('js__collapsible-item--visible');
		};


		/**
		 * Unfold one collapsible item
		 * @param  {object}  $obj Collapsible object
		 * @param  {integer}  item Item index
		 */
		var unfoldThis = function($obj, item) {
			$obj.find('.js__collapsible-item').eq( item ).children('.js__collapsible-content').slideDown('400').attr('aria-hidden', false).parent('.js__collapsible-item').addClass('js__collapsible-item--visible');
		};


		/**
		 * Initialize collapsible object
		 * @param  {object} $el    Collapsible object
		 * @param  {string} config Configuration string [all/none/number]
		 */
		var adjustCollapsibleOnLoad = function($el, config) {
			var visibleItem;
			if ( config === 'none') {
				foldCollapsible( $el );
			} else if ( config === 'all') {
				unfoldCollapsible( $el );
			} else {
				visibleItem = parseInt(config);
				foldCollapsible( $el );
				unfoldThis( $el, visibleItem );
			}
		};






		if ($collapsible.length) {

			$collapsible.each(function(index, el) {
				var initialState = ($(this).attr('data-visible')) ? $(this).attr('data-visible') : SN.collapsible.visible;

				$(this).find('.js__collapsible-item').each(function(index, el) {
					$(this).data('item', index);

					$(this).children('.js__collapsible-label').text( $(this).children('.js__collapsible-label').text() + ' ' + index); //delete
					$(this).children('.js__collapsible-content').text( $(this).children('.js__collapsible-content').text() + ' ' + index); //delete
				});

				adjustCollapsibleOnLoad( $(this), initialState);
			});

			$collapsibleLabel.on('click', function(event) {
				event.preventDefault();

				if ( $(this).parents('.js__collapsible').hasClass('js__collapsible--accordion') ) {
					// Es acordeón? SI
					if ( $(this).parents('.js__collapsible-item').hasClass('js__collapsible-item--visible') ) {
						// Está abierto? -> cerrar este
					} else {
						if ( $(this).parents('.js__collapsible').find('.js__collapsible-item--visible').length ) {
							// Hay otro abierto? -> cerrarlo y abrir este
						} else {
							// Todos cerrados? -> abrir este
						}
					}
				} else {
					// Es acordeón? NO
						if ( $(this).parents('.js__collapsible-item').hasClass('js__collapsible-item--visible') ) {
							// Está abierto? -> cerrar este
						} else {
							// Está cerrado? -> abrir este
						}
				}




			});

		}
	}
};
