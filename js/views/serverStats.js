/**
* @name /js/views/serverStats.js
* @description Server Stats View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var ServerStats = Backbone.View.extend( {
		el: '#stats',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/serverStats'], function ( serverStatsTpl ) {
				self.$el.html( serverStatsTpl( self.model.toJSON() ) );
			} );
		}
	} );

  return ServerStats;

} );


