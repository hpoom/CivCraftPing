/**
* @name /js/routers/ping.js
* @description Application bootstrap
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone'
], function( $, _, Backbone, oauth ) {

  // Defining the application router, you can attach sub routers here.
  var CivCraftPing = Backbone.Router.extend( {
    initialize: function() {			
		},
		routes: {
      "": "home"
    },
    home: function() {
			// Request our players collection and online view
			require( ['collections/players', 'views/online'], function( Players, OnlineView ) {
				var onlinePlayers = new Players( {endpoint: 'online'});
				onlinePlayers.fetch( {success: function () {
					// Initialise our user panel view
					var onlineView = new OnlineView( {collection: onlinePlayers} );
				}} );
			} );
    }
  } );

  return CivCraftPing
} );