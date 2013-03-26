/**
* @name /js/views/news.js
* @description News View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {

  var News = Backbone.View.extend( {
		el: '.news',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/news'], function ( newsTpl ) {
				self.$el.html( newsTpl( {news: self.collection.toJSON()} ) );
			} );
		}
	} );
  return News;
} );


