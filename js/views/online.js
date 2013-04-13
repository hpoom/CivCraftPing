/**
* @name /js/views/online.js
* @description Online View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var Online = Backbone.View.extend( {
		el: '.online',
		events: {
			'click .infoLink': 'openPlayerInfo',
		},
		initialize: function() {
			this.listenTo( this.collection, 'reset', this.render ); // Change to rerender on collection reset.
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/online'], function ( onlineTpl ) {
				self.$el.html( onlineTpl( {online: self.collection.toJSON(), count: self.collection.length} ) );
			} );
		},
		openPlayerInfo: function( event ) {
			// Get player id
			var playerId = $( event.target ).text();
			require( ['views/playerInfo'], function( PlayerInfoView ) {
				var playerInfoView = new PlayerInfoView( {playerId: playerId} );
			} );
		}
	} );

  return Online;

} );


