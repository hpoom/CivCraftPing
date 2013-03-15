/**
* @name /js/routers/ping.js
* @description Application bootstrap
* @author Simon Wood <hpoomdev@gmail.com>
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
		domains: {
			skynet: 'http://skynet.nickg.org'
		},
		routes: {
 			"": "stats",
			"players": "players",
			"bounties": "bounties",
			"trade": "trade",
			"locations": "locations"
		},
    stats: function() {
			var self = this;
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {stats: 'true'} ) );
				
				// Request our server stats view
				require( ['models/serverStats', 'views/serverStats', 'views/statsGraph'], function( ServerStats, ServerStatsView, StatsGraphView ) {
					// New up our model and fetch the data to populate it
					var serverStats = new ServerStats();
					serverStats.url = self.domains.skynet + '/stats?at=now';
					serverStats.fetch( { success: function( model, response ) {
						var serverStatsView = new ServerStatsView( {model: model} );
					} } );
				
					// Deal with the server stats graph
					var graphServerStats = new Backbone.Collection;
					graphServerStats.model = ServerStats;
					graphServerStats.url = self.domains.skynet + '/stats?from=' + moment.utc().subtract( 'hours', 72 ).toJSON();
					graphServerStats.fetch( { success: function(  collection, response ) {
						var statsGraphView = new StatsGraphView( {collection: collection} );
					} } );
				} );
			} );
		},
		players: function() {
			var self = this;
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {players: 'true'} ) );

				// Request our players collection and online view
				require( ['collections/players', 'views/online', 'views/graph'], function( Players, OnlineView, GraphView ) {
					var onlinePlayers = new Players();
					onlinePlayers.url = self.domains.skynet + '/online';
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