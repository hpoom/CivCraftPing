/**
* @name /js/views/blockSearch.js
* @description Block Search View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var BlockSearch = Backbone.View.extend( {
		el: '#blockSearchForm',
		events: {
			'click .btn': 'fetchBlockTrades'
		},
		initialize: function() {
			var self = this;
			this.$el.find( '#blockSearch' ).typeahead( {
				source: self.collection.pluck( 'name' ),
				items: 20,
				updater: function( item ) {
					self.fetchBlockTrades( item );
					return item;
				}
			} );
		},
		fetchBlockTrades: function( item ) {
			// Deal with item being empty (should only happen on search button click). CHANGE THIS LATER
			if ( _.isObject( item ) ) {
				item = $( '#blockSearch' ).val();
				$( '#itemImage' ).html( '' );
			} else {
				// Update image then fetch trade information from all sources
				var selectedModel = this.collection.where( {name: item} )[0];
				$( '#itemImage' ).html( '<img src="http://api.mineverse.com/image.php?id=' + selectedModel.get( 'icon' ) + '" class="blockIcon" />' );
			}
			// Get our /r/CivcraftExchange results
			require( ['collections/reddit','views/exchange'], function( Reddit, ExchangeView ) {
				var exchangeResults = new Reddit();
				exchangeResults.url = window.ping.domains.reddit + '/r/CivcraftExchange/search.json?q=title:' + item + '&restrict_sr=on&sort=new&t=month&jsonp=?';
				exchangeResults.fetch( { success: function( collection, response ) {
					console.log( collection );
					var exchangeView = new ExchangeView( {collection: collection} );
				} } );
			} );
		}
	} );
  return BlockSearch;
} );
