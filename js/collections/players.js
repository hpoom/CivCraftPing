/**
* @name /js/collections/players.js
* @description Players Collection
* @author Simon Wood <hpoomdev@gmail.com>
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
		comparator: function( player ) {
			return -moment( player.get( 'time' ) ).valueOf();
		},
		parse: function( response ) {
			response = _.pairs( response );
			_.each( response, function( element, index, list ) {
				list[index] = _.object( ['id', 'time'], element );
				list[index].loginTime = moment( list[index].time ).calendar();
				var dateForOnlineTime = ( moment() < moment( list[index].time ) ? moment().subtract( 'seconds', 1 ) : moment( list[index].time ) );
				list[index].timeOnline = dateForOnlineTime.fromNow( true );
				list[index].avatarSmall = 'https://minotar.net/avatar/' + list[index].id + '/16.png';
			} );
			return response;
		}
	} );
  return Players;
} );
