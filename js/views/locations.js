/**
* @name /js/views/locations.js
* @description Locations View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var Locations = Backbone.View.extend( {
		el: '#locations',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/locations'], function ( locationsTpl ) {
				self.$el.html( locationsTpl( {locations: self.collection.toJSON()} ) );
			} );
		}
	} );

  return Locations;
} );


