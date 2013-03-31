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
			skynet: 'http://skynet.nickg.org',
			hpoom: 'http://www.hpoom.co.uk',
			reddit: 'http://www.reddit.com'
		},
		routes: {
 			"": "home",
			"stats": "stats",
			"stats/:graphTime": "stats",
			"players": "players",
			"bounties": "bounties",
			"trade": "trade",
			"locations": "locations"
		},
		navigate: function( route ) {
			// Do some analytics here...
			//console.log( route );
			// Remover active from all nav then apply to correct nav element
			$( 'ul.nav li' ).removeClass( 'active' );
			$( 'ul.nav li.' + route + 'Nav' ).addClass( 'active' );
		},
		home: function() {
			var self = this;
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {home: 'true'} ) );
				require( ['collections/reddit','views/news'], function( Reddit, NewsView ) {
					var morningChangeNews = new Reddit();
					morningChangeNews.url = self.domains.reddit + '/r/Civcraft/search.json?q=author:ttk2&restrict_sr=on&sort=new&t=week&jsonp=?';
					morningChangeNews.fetch( { success: function( collection, response ) {
						var newsView = new NewsView( {collection: collection} );
					} } );
				} );
		} );
		},
    stats: function( graphTime ) {
			var self = this;
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {stats: 'true', graphTime: graphTime} ) );
				
				// Request our server stats view
				require( ['models/serverStats', 'views/serverStats', 'views/statsGraph'], function( ServerStats, ServerStatsView, StatsGraphView ) {
					// New up our model and fetch the data to populate it
					var serverStats = new ServerStats();
					serverStats.url = self.domains.skynet + '/stats?at=now';
					serverStats.fetch( { success: function( model, response ) {
						var serverStatsView = new ServerStatsView( {model: model} );
					} } );
				
					// Deal with the server stats graph
					var graphFrom = moment.utc().subtract( 'hours', ( !_.isNaN( parseInt( graphTime ) ) ? parseInt( graphTime ) : 6 ) ).toJSON();
					var graphServerStats = new Backbone.Collection;
					graphServerStats.model = ServerStats;
					graphServerStats.url = self.domains.skynet + '/stats?from=' + graphFrom;
					graphServerStats.fetch( { success: function( collection, response ) {
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
				require( ['collections/players', 'views/online', 'models/basicPlayer', 'views/playerSearch'], function( Players, OnlineView, BasicPlayer, PlayerSearchView ) {
					var onlinePlayers = new Players();
					onlinePlayers.url = self.domains.skynet + '/online';
					// Initialise our user panel view
					var onlineView = new OnlineView( {collection: onlinePlayers} );
					var poller = Poller.get( onlinePlayers, {delay: 10000} ).start(); // 10 seconds
					
					// All players search collection
					var allPlayers = new Backbone.Collection;
					allPlayers.model = BasicPlayer;
					allPlayers.url = self.domains.skynet + '/players';
					
					allPlayers.fetch( { success: function( collection, response ) {
						var playerSearchView = new PlayerSearchView( {collection: allPlayers} );
					} } );
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
				require( ['views/blockSearch'], function( BlockSearchView ) {
					// Minecraft blocks and items search collection
					var blocksAndItems = new Backbone.Collection;
					blocksAndItems.url = 'js/data/blockValues.json';
	
					blocksAndItems.fetch( { success: function( collection, response ) {
						var blockSearchView = new BlockSearchView( {collection: blocksAndItems} );
					} } );
				} );
			} );
		},
		locations: function() {
			var self = this;
			require( ['hbs!../templates/main'], function ( mainTpl ) {
				$( '#content' ).html( mainTpl( {locations: 'true'} ) );
				
				require( ['views/locations'], function( LocationsView ) {
					// Fetch locations from our xml to json script on hpoom.co.uk
					var locations = new Backbone.Collection;
					locations.url = self.domains.hpoom + '/CivCraft/mapXmlToJson.php?callback=?';
					locations.fetch( { success: function( collection, response ) {
						var locationsView = new LocationsView( {collection: collection} );
					} } );
				} );
			} );
		}
	} );
	
	return CivCraftPing
} );