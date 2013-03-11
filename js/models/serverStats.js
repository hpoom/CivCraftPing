/**
* @name /js/model/serverStats.js
* @description Server Stats Model
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var ServerStats = Backbone.Model.extend( {
		urlRoot: 'http://skynet.nickg.org/players/',
		parse: function( response ) {
			response.PercentUsedMem = ( response.UsedMem / response.TotalMem ) * 100;
			response.PercentLoadedChunks = ( response.LoadedChunks / ( response.LoadedChunks + response.UnLoadedChunks ) ) * 100;
			return response;
		}
	} );
  return ServerStats;
} );
