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
				for ( var index = offsetStart; index < events.length; index++ ) {
					element = events[index];
					login_moment = moment( element.login_time );
					logout_moment = moment( element.logout_time );
					
					// Check if item start date is after limit or item end date is before current date
					if ( login_moment < currDate && logout_moment > currDateLimit ) {
						// We have 100% time overlap
						results[resultKey] += 60;
					} else if ( login_moment > currDate && login_moment < currDateLimit ) {
						// We have a part time overlap
						if ( logout_moment > currDateLimit ) {
							time = Math.abs( currDateLimit - login_moment ) / ( 1000 * 60 );
						} else {
							time = Math.abs( logout_moment - login_moment ) / ( 1000 * 60 );
						}
						results[resultKey] += time;
					} else if ( logout_moment > currDate && logout_moment < currDateLimit ) {
						// We have a part time overlap
						if ( login_moment < currDate ) {
							time = Math.abs( logout_moment - currDate ) / ( 1000 * 60 );
						} else {
							time = Math.abs( logout_moment - login_moment ) / ( 1000 * 60 );
						}
						results[resultKey] += time;
					} else if ( logout_moment < currDate ) {
						// If we have not yet reached our block update the offset start
						offsetStart = index;
					} else if ( login_moment > currDateLimit ) {
						// If we are past the current block we are looking at then break out the loop
						break;
					}
				}
			}
			
			// Clean up our results
			for ( var key in results ) {
				results[key] = results[key] / range; // Values are minutes
			}
			results = _.pairs( results );
			_.each( results, function( element, index, list ) {
				list[index] = _.object( ['label', 'value'], element );
				list[index].label = ( parseInt( list[index].label ) < 10 ? '0' + list[index].label : list[index].label ) + ':00';
			} );
			results = _.sortBy( results, function( item ) {
				return item.label;
			} );
			
			return results;
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