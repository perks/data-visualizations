requirejs.config({
  'paths': {
    'app': 'app',
    'jquery': 'lib/jquery',
    'd3': 'lib/d3',
    'topojson': 'lib/topojson',
    'datamaps': 'lib/datamaps',
    'domReady': 'lib/domReady',
    'jquery.nouislider': 'lib/jquery.nouislider',
    'hbs' : 'lib/require-handlebars-plugin/hbs'
  },
  shim: {
    d3: {
      exports: 'd3'
    },
    topojson: {
      deps: ['d3'],
      exports: 'topojson'
    },
    datamaps: {
      deps: ['d3', 'topojson'],
    },
    'jquery.nouislider': {
      deps: ['jquery'],
      exports: '$'
    }
  }

});

/** Load main module to start app **/
requirejs(["app/main"]);

