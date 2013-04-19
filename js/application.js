/**
* @name /js/application.js
* @description Application bootstrap
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'moment',
	'handlebars',
  'routers/ping', // Request our backbone router
], function( $, _, Backbone, moment, hbs, ping ) {
  var App = {
		router: ping,
		init: function () {
			var self = this;
			$( function () {
				// Add a helper to handlebars to make out life easier later
				hbs.registerHelper( 'compare', function( lvalue, rvalue, options ) {
					if (arguments.length < 3) {
						throw new Error( "Handlerbars Helper 'compare' needs 2 parameters" );
					}
					operator = options.hash.operator || "==";

					var operators = {
						'==':       function(l,r) { return l == r; },
						'===':      function(l,r) { return l === r; },
						'!=':       function(l,r) { return l != r; },
						'<':        function(l,r) { return l < r; },
						'>':        function(l,r) { return l > r; },
						'<=':       function(l,r) { return l <= r; },
						'>=':       function(l,r) { return l >= r; },
						'typeof':   function(l,r) { return typeof l == r; }
					}

					if (!operators[operator]) {
						throw new Error( "Handlerbars Helper 'compare' doesn't know the operator " + operator );
					}
					var result = operators[operator]( lvalue, rvalue );
					if( result ) {
						return options.fn( this );
					} else {
						return options.inverse( this );
					}
				} );
				hbs.registerHelper( 'momentFromNow', function( timestamp ) {
					return moment( timestamp ).fromNow();
				} );
				
				// Initialise GA
				ga( 'create', 'UA-40064761-1', 'github.io' );
				// Start our ping controller
				window.ping = new self.router();
				// Add an event to call navigate on ping for every navigation
				window.ping.on( 'route', window.ping.navigate );
				Backbone.history.start();
			} );
		}
	}
	
  return App;
} );