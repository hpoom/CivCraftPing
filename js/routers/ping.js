/**
* @name /js/routers/ping.js
* @description Application bootstrap
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'poller',
	'moment'
], function( $, _, Backbone, Poller, moment ) {

  // Defining the application router, you can attach sub routers here.
  var CivCraftPing = Backbone.Router.extend( {
    initialize: function() {			
		},
		routes: {
      "": "home"
    },
    home: function() {
			// Request our players collection and online view
			require( ['collections/players', 'views/online', 'views/graph'], function( Players, OnlineView, GraphView ) {
				var onlinePlayers = new Players( {endpoint: 'online'} );
				// Initialise our user panel view
				var onlineView = new OnlineView( {collection: onlinePlayers} );
				var poller = Poller.get( onlinePlayers, {delay: 10000} ).start(); // 10 seconds
				// Dynamic graph stuff
				var graphView = new GraphView( {collection: onlinePlayers} );
			} );
			
			// Get a count of players online by chunks over a period of time
			require( ['collections/playerCounts','models/playerCount'], function( PlayersOverTime, PlayerCount ) {
				/*
				var playersOverTime = new PlayersOverTime();
				// Loop back over last hour in 5min increments
				_.each( _.range( 60, 0, -5 ), function( element, index, list ) {
					var startOfHour = moment().startOf( 'hour' ).format();
					var tenMinsAgo = moment().subtract( "minutes", element ).format();
					var playerCount = new PlayerCount( {time: tenMinsAgo});
					playerCount.fetch();
					playersOverTime.add( playerCount );
				} );
				
				// This needs changing.
				playersOverTime.on( 'change', function() {
					//console.log( playersOverTime.toJSON() );
				}, this );
				
				*/
			} );
    }
  } );

  return CivCraftPing
} );