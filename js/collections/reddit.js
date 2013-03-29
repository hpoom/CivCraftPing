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
		parse: function( response ) {
			var self = this;
			response = response.data.children;
			_.each( response, function( element, index, list ) {
				list[index].data.createdString = moment.unix( list[index].data.created_utc ).fromNow();
				list[index].data.selftext_html = self.unescapeHtml( list[index].data.selftext_html );
			} );
			return response;
		},
		unescapeHtml: function( html ) {
			return $("<div />").html(html).text()
		}
	} );
  return Reddit;
} );