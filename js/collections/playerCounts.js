/**
* @name /js/model/playerCounts.js
* @description Player Counts Collection
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'models/playerCount',
	'handlebars',
	'hbs'
], function( $, _, Backbone, PlayerCount ) {
  var PlayerCounts = Backbone.Collection.extend( {
		model: PlayerCount
	} );
  return PlayerCounts;
} );
