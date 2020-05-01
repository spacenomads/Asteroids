'use strict';
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

		var foldThis = function($obj, item) {
			$obj.find('.js__collapsible-item').eq( item ).children('.js__collapsible-content').slideUp('200').attr('aria-hidden', true).parent('.js__collapsible-item').removeClass('js__collapsible-item--visible');
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

			// > Each collapsible
			$collapsible.each(function(index, el) {
				var initialState = ($(this).attr('data-visible')) ? $(this).attr('data-visible') : SN.collapsible.visible;

				$(this).find('.js__collapsible-item').each(function(index, el) {
					$(this).data('item', index);

					$(this).children('.js__collapsible-label').text( $(this).children('.js__collapsible-label').text() + ' ' + index); //delete
					$(this).children('.js__collapsible-content').text( $(this).children('.js__collapsible-content').text() + ' ' + index); //delete
				});

				adjustCollapsibleOnLoad( $(this), initialState);
			});


			// > Label click
			$collapsibleLabel.on('click', function(event) {
				event.preventDefault();
				var $block = $(this).parents('.js__collapsible');
				var prevItem;
				var item = $(this).parents('.js__collapsible-item').data('item');

				if ( $(this).parents('.js__collapsible').hasClass('js__collapsible--accordion') ) {

					// Is this an accordion block? YES
					if ( $(this).parents('.js__collapsible-item').hasClass('js__collapsible-item--visible') ) {
						// I am already open -> Close me
						foldThis( $block, item );
					} else {
						if ( $(this).parents('.js__collapsible').find('.js__collapsible-item--visible').length ) {
							// Another item is already open -> Close it and open me, Alice
							prevItem = $(this).parents('.js__collapsible').find('.js__collapsible-item--visible').data('item');
							foldThis( $block, prevItem );
							unfoldThis( $block, item );
						} else {
							// No item is open -> Open me
							unfoldThis( $block, item );
						}
					}
				} else {
					// Is this an accordion block? NOPE
					if ( $(this).parents('.js__collapsible-item').hasClass('js__collapsible-item--visible') ) {
						// I am already open -> Close me
						foldThis( $block, item );
					} else {
						// I am closed -> Open me
						unfoldThis( $block, item );
					}
				}




			});

		}
	}
};
