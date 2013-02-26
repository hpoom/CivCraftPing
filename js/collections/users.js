/**
* @name /js/model/users.js
* @description Users Collection
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'models/user',
	'handlebars',
	'hbs'
], function( $, _, Backbone, User ) {
  var Users = Backbone.Collection.extend( {
		model: User,
		initialize: function ( params ) {
			this.endpoint = params.endpoint;
		},
		url: function() {
			// Get the user's data from SkyNet api
			return 'http://skynet.nickg.org/' + this.endpoint;
		},
		comparator: function( collection ) {
			return( collection.get( 'loginTime' ) );
		},
		parse: function( response ) {
			response = _.pairs( response );
			_.each( response, function( element, index, list ) {
				list[index] = _.object( ['user', 'loginTime'], element );
				var dLoginTime = Date.parse( list[index].loginTime );
				var dNow = new Date(); // Now does not consider time zones. Must add time zones in.
				var buffer = 1000 * 60; // 60 second bufer to make sure times are not negative.
				// Maybe just set negative numbers to zero???
				list[index].timeOnline = Math.round( ( dNow.getTime() - dLoginTime ) / 1000 / 60 );
			} );
			console.log( response );
			return response;
		}
	} );
  return Users;
} );
