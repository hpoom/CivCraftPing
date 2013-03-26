/**
* @name /js/collections/reddit.js
* @description Reddit Collection
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
  var Reddit = Backbone.Collection.extend( {
		/*comparator: function( player ) {
			return -moment( player.get( 'time' ) ).valueOf();
		},*/
		parse: function( response ) {
			var self = this;
			response = response.data.children;
			_.each( response, function( element, index, list ) {
				list[index].data.createdString = moment.unix( list[index].data.created_utc ).fromNow();
				list[index].data.selftext_html = self.unescapeHtml( list[index].data.selftext_html );
			} );
			console.log( response )
			return response;
		},
		unescapeHtml: function( html ) {
			return $("<div />").html(html).text()
		}
	} );
  return Reddit;
} );