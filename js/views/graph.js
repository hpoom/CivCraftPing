/**
* @name /js/views/graph.js
* @description Graph View
* @author Simon Wood <hpoomdev@gamil.com>
*/

define( [
  'jquery',
  'underscore',
  'backbone',
	'highcharts',
	'libs/highcharts/modules/exporting',
	'handlebars',
	'hbs'
], function( $, _, Backbone, Highcharts ) {

  var Graph = Backbone.View.extend( {
		el: '.graph',
		events: {
		},
		initialize: function() {
			this.listenTo( this.collection, 'reset', this.graphCount() );
			
			// Highchart stuff. Clearn up later!
			var self = this;
			self.chart = new Highcharts.Chart( {
				chart: {
					renderTo: 'liveChart',
					type: 'spline',
					marginRight: 10,
				},
				title: {
					text: 'Live random data'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150
				},
				yAxis: {
					title: {
						text: 'Value'
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				tooltip: {
					formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
						Highcharts.numberFormat(this.y, 2);
					}
				},
				legend: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				series: [{
					name: 'Random data',
					data: (function() {
						// generate an array of random data
						var data = [],
						time = (new Date()).getTime(),
						i;

						for (i = -19; i <= 0; i++) {
							data.push({
								x: time + i * 1000,
								y: 0
							});
						}
						return data;
					})()
				}]
			});
			
			console.log( self.chart.series[0] );
		},
		graphCount: function() {
			if ( _.isObject( self.chart ) ) {
				var x = (new Date()).getTime(); // current time
				var y = this.collection.length;
				self.chart.series[0].addPoint([x, y], true, true);
				console.log( 'add point' );
			}
		}
	} );

  return Graph;
} );


