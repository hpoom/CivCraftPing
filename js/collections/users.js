/**
* @name /js/model/users.js
* @description Users Collection
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'moment',
	'models/user',
	'handlebars',
	'hbs'
], function( $, _, Backbone, moment, User ) {
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
				list[index].timeOnline = moment( list[index].loginTime ).fromNow( true );
			} );
			return response;
		}
	} );
  return Users;
} );
