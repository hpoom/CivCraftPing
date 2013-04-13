/**
* @name /js/views/playerInfo.js
* @description Player Info View
* @author Simon Wood <hpoomdev@gmail.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'moment',
	'nvd3',
	'handlebars',
	'hbs'
], function( $, _, Backbone, moment ) {

  var PlayerInfo = Backbone.View.extend( {
		events: {
			'click button.close': 'closePlayerInfo',
		},
		initialize: function( options ) {
			var self = this;
			playerId = 'hpoom';
			require( ['models/playerInfo'], function( PlayerInfo ) {
				self.model = new PlayerInfo( {id: options.playerId} );
				self.model.fetch( {success: function( model, response ) {	
					self.render();
				} } );
			} );
		},
		render: function() {
			var self = this;
			// Compile the template using handelbars
			require( ['hbs!../templates/playerInfo'], function ( playerInfoTpl ) {
				var last = _.last( self.model.get( 'loginEvents' ) );
				self.$el.html( playerInfoTpl( {id: self.model.id, lastLogin: moment( last.login_time ).calendar() } ) );
				self.$el.addClass( 'well' );
				// Append out view to the DOM - NEED TO CHECK IF PLAYER INFO ALREADY OPEN!!!
				$( '.playerInfoList' ).append( self.$el );
				self.drawGraph();
			} );
		},
		closePlayerInfo: function() {
			this.$el.remove();
		},
		drawGraph: function() {
			var self = this;
			nv.addGraph(function() {
				self.chart = nv.models.multiBarChart()
						.x(function(d) { return d.label })
						.y(function(d) { return d.value })
						.margin({top: 10, right: 10, bottom: 25, left: 35})
						//.showValues(true)
						.tooltips(false)
						.showControls(false);

				self.chart.yAxis
						.tickFormat(d3.format(',.2f'));

				d3.select( '#' + self.model.id + '_graph' )
						.datum( self.graphData() )
						.transition().duration(500)
						.call(self.chart);

				nv.utils.windowResize( self.chart.update );
			} );
		},
		graphData: function() {
			return [
				{
					key: this.model.id,
					values: this.model.calcTimeStats()
				}
			];
		}
	} );
  return PlayerInfo;
} );


