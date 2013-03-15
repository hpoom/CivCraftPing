/**
* @name /js/application.js
* @description Application bootstrap
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
  'routers/ping', // Request our backbone router
], function( $, _, Backbone, hbs, ping ) {
  var App = {
		router: ping,
		init: function () {
			var self = this;
			$( function () {
				// Start our ping controller
				window.ping = new self.router();
				Backbone.history.start();
			} );
		}
	}
	
  return App;
} );