/**
* @name /js/model/basicPlayer.js
* @description Basic Player Model
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var BasicPlayer = Backbone.Model.extend( {
		parse: function( response ) {
			var nameData = response;
			response = {};
			response.name = nameData;
			return response;
		}
	} );
  return BasicPlayer;
} );