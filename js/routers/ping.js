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
	'moment',
	'bootstrap'
], function( $, _, Backbone, Poller, moment ) {

	// Defining the application router, you can attach sub routers here.
	var CivCraftPing = Backbone.Router.extend( {
		initialize: function() {	
		},
		routes: {
 			"": "stats",
			"players": "players",
			"bounties": "bounties",
			"trade": "trade",
			"locations": "locations"
		},
    stats: function() {
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {stats: 'true'} ) );
				
				// Request our server stats view
				require( ['views/serverStats'], function( ServerStatsView ) {
					// New up our model and fetch the data to populate it
					var serverStats = new Backbone.Model( {} );
					serverStats.url = 'http://skynet.nickg.org/stats?at=now';
					serverStats.fetch( { success: function( model, response ) {
						console.log( model );
						var serverStatsView = new ServerStatsView( {model: model} );
					} } );
				} );
			} );
		},
		players: function() {
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {players: 'true'} ) );

				// Request our players collection and online view
				require( ['collections/players', 'views/online', 'views/graph'], function( Players, OnlineView, GraphView ) {
					var onlinePlayers = new Players( {endpoint: 'online'} );
					// Initialise our user panel view
					var onlineView = new OnlineView( {collection: onlinePlayers} );
					var poller = Poller.get( onlinePlayers, {delay: 10000} ).start(); // 10 seconds
					// Dynamic graph stuff
					var graphView = new GraphView( {collection: onlinePlayers} );
				} );
			} );
		},
		bounties: function() {
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {bounties: 'true'} ) );
			} );
		},
		trade: function() {
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {trade: 'true'} ) );
			} );
		},
		locations: function() {
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {locations: 'true'} ) );
			} );
		}
	} );

	return CivCraftPing
} );