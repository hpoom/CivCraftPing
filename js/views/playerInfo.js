/**
* @name /js/views/playerInfo.js
* @description Player Info View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var PlayerInfo = Backbone.View.extend( {
		el: '#infoModelBody',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/playerInfo'], function ( playerInfoTpl ) {
				self.$el.html( playerInfoTpl( self.model.toJSON() ) );
			} );
			// Set model title
			$( '#infoModelLabel' ).html( 'Information on ' + this.model.id );
		}
	} );

  return PlayerInfo;

} );


