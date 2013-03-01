/**
* @name /js/model/players.js
* @description Players Collection
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'moment',
	'handlebars',
	'hbs'
], function( $, _, Backbone, moment ) {
  var Players = Backbone.Collection.extend( {
		initialize: function ( params ) {
			this.endpoint = params.endpoint;
		},
		url: function() {
			// Get the players data from SkyNet api
			return 'http://skynet.nickg.org/' + this.endpoint;
		},
		comparator: function( collection ) {
			return( collection.get( 'time' ) );
		},
		parse: function( response ) {
			response = _.pairs( response );
			_.each( response, function( element, index, list ) {
				list[index] = _.object( ['id', 'time'], element );
				list[index].loginTime = moment( list[index].time ).calendar();
				list[index].timeOnline = moment( list[index].time ).fromNow( true );
				list[index].avatarSmall = 'https://minotar.net/avatar/' + list[index].id + '/16.png';
			} );
			return response;
		}
	} );
  return Players;
} );
