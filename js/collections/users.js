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
	} );
  return Users;
} );
