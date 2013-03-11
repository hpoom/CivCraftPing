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
	'handlebars',
	'hbs'
], function( $, _, Backbone, Highcharts ) {

  var Graph = Backbone.View.extend( {
		el: '.graph',
		events: {
		},
		initialize: function() {
			this.listenTo( this.collection, 'reset', this.graphCount );
			
			// Highchart stuff. Clearn up later!
			var self = this;
			self.chart = new Highcharts.Chart( {
				chart: {
					renderTo: 'liveChart',
					type: 'spline',
					marginRight: 10,
				},
				title: {
					text: 'Total players online'
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

						for (i = -290; i <= 0; i=i+10) {
							data.push({
								x: time + i * 1000,
								y: 0
							});
						}
						return data;
					})()
				}]
			});
		},
		graphCount: function() {
			if ( _.isObject( this.chart ) ) {
				var x = (new Date()).getTime(); // current time
				var y = this.collection.length;
				this.chart.series[0].addPoint([x, y], true, true);
			}
		}
	} );

  return Graph;
} );


