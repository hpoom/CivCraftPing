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
			
    }
  } );

  return CivCraftPing
} );