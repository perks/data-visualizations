define(function(require) {
  var $ = require('jquery');
  var d3 = require('d3');
  var topojson = require('topojson');
  var domReady = require('domReady');
  var Datamap = require('datamaps');

  domReady(function() {
    // Begin drawing for SVG map

     var map = new Datamap({

        element: $('#container')[0],
        scope: 'usa',
        fills: {
          defaultFill : '#4A4A4A',
          Medical : '#8DC73F',
          Decriminalized : '#00BB3F',
          Pseudo: '#11772D',
          Legalized : '#576300',
        },
      data: {
        'WA': {fillKey: 'Legalized'},
        'Oregon': {fillKey: 'Pseudo'},
        'CA': {fillKey: 'Pseudo'},
        'AK': {fillKey: 'Pseudo'},
        'AZ': {fillKey: 'Medical'},
        'NM': {fillKey: 'Medical'},
        'MT': {fillKey: 'Medical'},
        'CO': {fillKey: 'Legalized'},
        'NY': {fillKey: 'Decriminalized'}
      },
      geographyConfig: {
        dataUrl: null,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        highlightBorderWidth: 6
      }
    });

    map.legend({
      legendTitle: "Marijuana Legal Status",
      labels: {
        Medical : "Medical",
        Decriminalized: "Decriminalized",
        Pseudo: "Medical & Decriminalized",
        Legalized : "Legalized"}
      });

      $('div.datamaps-legend').css('color', 'white');


    });
});
