/**
* @name /js/views/online.js
* @description Online View
* @author Simon Wood <hpoomdev@gamil.com>
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
			'click .infoLink': 'openModel',
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
		openModel: function( event ) {
			// Get player id
			var playerId = $( event.target ).text();
			
			// Get our model and view for our model
			require( ['models/playerInfo', 'views/playerInfo'], function( PlayerInfo, PlayerInfoView ) {
				var playerInfo = new PlayerInfo( {id: playerId} );
				// CHANGE THIS to multi fetch
				playerInfo.fetch( {success: function( model, response ) {
					var playerInfoView = new PlayerInfoView( {model: model} );
					console.log( model );
				} } );
			} );
			
			// Model show
			$( '#infoModal' ).modal();
		}
	} );

  return Online;

} );


