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
			// Request our userPanel view
			require( ['collections/users', 'views/online'], function( Users, OnlineView ) {
				var users = new Users( {endpoint: 'online'});
				users.fetch( {success: function () {
					// Initialise our user panel view
					var onlineView = new OnlineView( {collection: users} );
				}} );
			} );
    }
  } );

  return CivCraftPing
} );