/**
* @name /js/model/serverStats.js
* @description Server Stats Model
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var ServerStats = Backbone.Model.extend( {
		parse: function( response ) {
			// Deal with Ticks
			response.StatusTps = ( ( response.PercentTps > 80 ) ? 'success' : ( ( response.PercentTps > 60 ) ? 'warning' : 'danger' ) ); 
			
			// Deal with Memory
			response.PercentUsedMem = ( response.UsedMem / response.TotalMem ) * 100;
			response.StatusUsedMem = ( ( response.PercentUsedMem < 40 ) ? 'success' : ( ( response.PercentUsedMem < 70 ) ? 'warning' : 'danger' ) );
			
			// Deal with Chunks
			response.PercentLoadedChunks = ( response.LoadedChunks / 50000 ) * 100;
			response.StatusLoadedChunks = ( ( response.PercentLoadedChunks < 30 ) ? 'success' : ( ( response.PercentLoadedChunks < 60 ) ? 'warning' : 'danger' ) );
			
			return response;
		}
	} );
  return ServerStats;
} );
