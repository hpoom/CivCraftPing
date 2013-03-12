/**
* @name /js/model/playerInfo.js
* @description Player Info Model
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'handlebars',
	'hbs'
], function( $, _, Backbone ) {
  var PlayerInfo = Backbone.Model.extend( {
		urlRoot: window.ping.domains.skynet + '/players/',
		parse: function( response ) {
			var eventData = response;
			response = {};
			response.loginEvents = eventData;
			return response;
		},
		multiFetch: function( options ) {
			/*
			var redditInfo = new Backbone.Model( {} );
			redditInfo.url = 'http://www.reddit.com/user/hpoom/about.json?jsonp=?';
			redditInfo.fetch( { success: function(  model, response ) {
				console.log( model );
			}, dataType: 'jsonp' } );
			//this.set( 'redditInfo', redditInfo );
			*/
			
			// once count reached callback
			options.success( this, multiResponse );
			
			return multiResponse;
		}
	} );
  return PlayerInfo;
} );

// Extend backbone so url could be an array/object. When fetch is called all models are 
// fetched and data put back into attraibutes on the root model.
/*
Backbone.MultiModel = Backbone.Model.extend( {} );
Backbone.MultiModel.prototype.fetch = function() {
    console.log( 'FETCHED' );
}

var myMultiModel = new Backbone.MultiModel( {} );
console.log( myMultiModel );
myMultiModel.fetch();
*/