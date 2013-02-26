/**
* @name /js/model/playerCount.js
* @description Player Count Model
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var PlayerCount = Backbone.Model.extend( {
		initialize: function ( params ) {
			this.time = params.time;
		},
		url: function() {
			// Get the players data from SkyNet api
			return 'http://skynet.nickg.org/online?at=' + encodeURIComponent( this.time );
		},
		parse: function( response ) {
			return { count: _.keys( response ).length };
		}
	} );
  return PlayerCount;
} );
