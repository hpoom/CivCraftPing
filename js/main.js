/**
* @name /js/main.js
* @description Boilerplate code, sort out requirejs shim then kick off the app with init() 
* @author Simon Wood <hpoomdev@gamil.com>
*/

require.config( {
	shim: {
		handlebars: {
			exports: 'Handlebars'
		}, 
		underscore: {
			deps: ['jquery'], //dependencies
			exports: '_' //the exported symbol
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		i18nprecompile : {
			deps: ['handlebars', 'underscore']
		},
		hbs: {
			deps: ['backbone','handlebars','i18nprecompile','json2']
		},
		poller: {
			deps: ['backbone']
		},
		highcharts: {
			deps: ['jquery'],
			exports: 'Highcharts'
		},
		d3: {
			exports: 'd3'
		},
		nvd3: {
			deps: ['d3'],
			exports: 'nv'
		}
	},
	paths: {
		jquery: 'libs/jquery',
		json2: 'libs/json2',
		handlebars: 'libs/handlebars',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		i18nprecompile: 'libs/i18nprecompile',
		hbs: 'libs/hbs',
		bootstrap: 'libs/bootstrap.min',
		poller: 'libs/backbone.poller.min',
		highcharts: 'libs/highcharts/highcharts',
		d3: 'libs/nvd3/lib/d3.v2.min',
		nvd3: 'libs/nvd3/nv.d3.min',
		moment: 'libs/moment'
	},
	hbs: {
    disableI18n: true,
		disableHelpers: true
	}
} );

require( ['application'], function( App ) {
  // The "app" dependency is passed in as "App"
  window.App = App;
	App.init();
});