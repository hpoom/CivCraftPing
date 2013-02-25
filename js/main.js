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
		oauth: {
			deps: ['backbone']	
		}
	},
	paths: {
		jquery: 'libs/jquery',
		json2: 'libs/json2',
		handlebars: 'libs/handlebars',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		i18nprecompile: 'libs/i18nprecompile',
		hbs: 'libs/hbs'
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