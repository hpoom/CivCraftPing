/**
* @name /js/views/exchange.js
* @description Exchange View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var Exchange = Backbone.View.extend( {
		el: '.exchange',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/exchange'], function ( exchangeTpl ) {
				self.$el.html( exchangeTpl( {exchange: self.collection.toJSON()} ) );
			} );
		}
	} );
  return Exchange;
} );


