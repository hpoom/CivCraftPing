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
				{"key": "Chunks","values": this.formatData( 'PercentLoadedChunks' )},
				{"key": "Players","values": this.formatData( 'Players' )},
				{"key": "Mobs","values": this.formatData( 'Mobs' )}
			];
		},
		formatData: function( dataItem ) {
			var formattedData = this.collection.map( function( model ) {
				var yData = model.get( dataItem ) / 100;
				// Deal with players and mobs
				if ( dataItem === 'Players' ) {
					yData = model.get( dataItem ) / 300; // Assume 300 is max players
				} else if ( dataItem === 'Mobs' ) {
					yData = model.get( dataItem ) / 5000; // Assume 5000 is max mobs
				}
				
				return {x: new Date( model.get( 'Time' ) ), y: yData };
			} );
			
			return formattedData;
		}
	} );

  return StatsGraph;

} );




