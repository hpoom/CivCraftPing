/**
* @name /js/views/civTrade.js
* @description Civ Trade View
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
		el: '.civTrade',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/civTrade'], function ( civTradeTpl ) {
				self.$el.html( civTradeTpl( {trade: self.collection.toJSON()} ) );
			} );
		}
	} );
  return Exchange;
} );


