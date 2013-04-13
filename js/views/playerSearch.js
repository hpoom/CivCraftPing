/**
* @name /js/views/playerSearch.js
* @description Player Search View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var PlayerSearch = Backbone.View.extend( {
		el: '#playerSearch',
		initialize: function() {
			var self = this;
			this.$el.typeahead( {
				source: self.collection.pluck( 'name' ),
				items: 20,
				updater: function( playerId ) {
					require( ['views/playerInfo'], function( PlayerInfoView ) {
						var playerInfoView = new PlayerInfoView( {playerId: playerId} );
					} );
					return playerId;
				}
			} );
			// Add the total numbe of players to the DOM
			self.$el.after( ' <span class="label">' + self.collection.length + ' Players</span>' );
		}
	} );
  return PlayerSearch;
} );


