/**
* @name /js/views/statsGraph.js
* @description Stats Graph View
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'moment',
	'nvd3',
	'handlebars',
	'hbs'
], function( $, _, Backbone, moment, nv ) {

  var StatsGraph = Backbone.View.extend( {
		el: '#statsGraph svg',
		initialize: function() {
			this.render();
		},
		render: function() {
			var self = this;
			nv.addGraph( function() {
				self.chart = nv.models.lineWithFocusChart();

				self.chart.xAxis
					.tickFormat( function( d ) { return d3.time.format( '%H:%M' )( new Date( d ) ); } );
				self.chart.x2Axis
					.tickFormat( function( d ) { return d3.time.format( '%H:%M' )( new Date( d ) ); } );

				self.chart.yAxis 
					.tickFormat( function ( d ) { return ( ( d < 0.10 ) ? '' : d3.format( 'p' )( d ) ); } );
				self.chart.y2Axis
					.tickFormat( function ( d ) { return ( ( d < 0.10 ) ? '' : d3.format( 'p' )( d ) ); } );

				d3.select( self.el )
					.datum( self.graphData() )
					.transition().duration( 500 )
					.call( self.chart );

				nv.utils.windowResize( self.chart.update );
			} );
		},
		graphData: function() {
			return [
				{"key": "TPS","values": this.formatData( 'PercentTps' )},
				{"key": "Memory","values": this.formatData( 'PercentUsedMem' )},
				{"key": "Chunks","values": this.formatData( 'PercentLoadedChunks' )}
			];
		},
		formatData: function( dataItem ) {
			var formattedData = this.collection.map( function( model ) {
				return {x: new Date( model.get( 'Time' ) ), y: ( model.get( dataItem ) / 100 ) };
			} );
			
			return formattedData;
		}
	} );

  return StatsGraph;

} );




