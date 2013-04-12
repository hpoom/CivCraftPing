/**
* @name /js/model/playerInfo.js
* @description Player Info Model
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
  var PlayerInfo = Backbone.Model.extend( {
		urlRoot: window.ping.domains.skynet + '/players/',
		url: function() {
			return this.urlRoot + this.id + '?from=' + moment.utc().subtract( 'days', 7 ).toJSON();
		},
		parse: function( response ) {
			var eventData = response;
			response = {};
			response.loginEvents = eventData;
			_.each( response.loginEvents, function( element, index, list ) {
				// Change login time to local time zone
				element.login_time = moment( element.login_time ).format();
				// Add in logout_time to make out data easier to work with
				start = moment( element.login_time );
				online = element.online_time.split( ':' );
				end = moment( start ).add( 'h', online[0] ).add( 'm', online[1] ).add( 's', online[2] ); //clone
				element.logout_time = end.format();
			} );
			return response;
		},
		calcTimeStats: function() {
			range = 7; // Set our comparison range to 7 days
			steps = range * 24; // The number of steps we need to walk through
			// Get today minus [range] days
			startDate = moment().subtract( 'days', range ).startOf( 'hour' );
			stopDate = moment().startOf( 'hour' );
			
			// CHANGE THIS!!!
			results = {};
			events = this.get( 'loginEvents' );
			totalCount = 0;
			offsetStart = 0;
			
			// Loop round our steps
			for ( currDate = moment( startDate ); currDate < stopDate; currDate.add( 'hours', 1 ) ) {
				currDateLimit = moment( currDate ).add( 'hours', 1 );
				// Check if key exists in results and if not then set it
				resultKey = currDate.hour().toString();
				if ( !_.has( results, resultKey ) ) {
					results[resultKey] = 0;
				}
				
				// Second loop round data on this model (inefficent!!! needs reworking) - 6384, 4215, 242
				// Make efficencys by stop keep moment cast on login and logout date (have moment version on the model in parse)
				for ( var index = offsetStart; index < events.length; index++ ) {
					element = events[index];
					// Check if item start date is after limit or item end date is before current date
					if ( moment( element.login_time ) < currDate && moment( element.logout_time ) > currDateLimit ) {
						// We have 100% time overlap
						results[resultKey] += 60;
					} else if ( moment( element.login_time ) > currDate && moment( element.login_time ) < currDateLimit ) {
						// We have a part time overlap
						if ( moment( element.logout_time ) > currDateLimit ) {
							time = Math.abs( currDateLimit - moment( element.login_time ) ) / ( 1000 * 60 );
						} else {
							time = Math.abs( moment( element.logout_time ) - moment( element.login_time ) ) / ( 1000 * 60 );
						}
						results[resultKey] += time;
					} else if ( moment( element.logout_time ) > currDate && moment( element.logout_time ) < currDateLimit ) {
						// We have a part time overlap
						if ( moment( element.login_time ) < currDate ) {
							time = Math.abs( moment( element.logout_time ) - currDate ) / ( 1000 * 60 );
						} else {
							time = Math.abs( moment( element.logout_time ) - moment( element.login_time ) ) / ( 1000 * 60 );
						}
						results[resultKey] += time;
					} else if ( moment( element.logout_time ) < currDate ) {
						// If we have not yet reached our block update the offset start
						offsetStart = index;
					} else if ( moment( element.login_time ) > currDateLimit ) {
						// If we are past the current block we are looking at then break out the loop
						break;
					}
					totalCount++;
				}
			}
			
			// Clean up our results
			for ( var key in results ) {
				results[key] = results[key] / range / 60 * 100;
			}
			
			console.log( totalCount );
			console.log( results );
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