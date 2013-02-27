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
		},
		initialize: function() {
			this.render();
		},
		render: function(){
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/online'], function ( onlineTpl ) {
				self.$el.html( onlineTpl( {online: self.collection.toJSON(), count: self.collection.length} ) );
			} );
		},
	} );

  return Online;

} );


