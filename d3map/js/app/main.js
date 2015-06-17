

define(function(require) {
  // Load dependencies
  var $ = require('jquery');
  var d3 = require('d3');
  var topojson = require('topojson');
  var domReady = require('domReady');
  var Datamap = require('datamaps');
  var slider = require('jquery.nouislider');

  function initMap(load) {

    var dataset = load;
    var map = new Datamap({
        element: $('#container')[0],
        done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            var state = geography.id;
            var obj = map.options.data[state];
            console.log(state);
            require(['hbs!app/templates/statbox'], function(templ) {
              $('#statbox').replaceWith(templ(obj));
            });

          });
        },
        scope: 'usa',
        fills: {
          defaultFill : '#4A4A4A',
          Medical : '#5CCDC9',
          Decriminalized : '#FFB173',
          Pseudo: '#FE7276',
          Legalized : '#6EE768',
        },
        data: dataset,
        geographyConfig: {
          dataUrl: null,
          borderColor: '#C0C0C0',
          borderWidth: 1,
          highlightBorderWidth: 3,
          highlightFillColor: '#D1F4CA'
        }
    });

    /** for some reason zoom wont work unlesss these variables and functions are declared here **/
    var width = 800;
    var height = 450;
    var centered;

    var projection = d3.geo.albersUsa()
      .scale(800)
      .translate([width / 2, height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    var g = d3.select("g");

    g.selectAll("path").attr("d", path).on("dblclick", clicked);

    function clicked(d) {
      var x, y, k;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }

      g.selectAll("path")
          .classed("active", centered && function(d) { return d === centered; });

      g.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
    }

    /** end zoom stuff **/

    function setColor(state) {
      map.updateChoropleth(state);
    }

    function onSlide() {
      for (var state in map.options.data) {
        var curVal = parseInt($('#timeline').val());
        var myear = parseInt(map.options.data[state].Medical.Year);
        var dyear = parseInt(map.options.data[state].Decriminalized.Year);
        var pyear = parseInt(map.options.data[state].Pseudo.Year);
        var lyear = parseInt(map.options.data[state].Legalized.Year);

        var defaultColor = {};
        defaultColor[state] = {"fillKey" : "defaultFill"};

        if (curVal >= myear && myear != 0) {
          var medical = {};
          medical[state] = {"fillKey" : "Medical"};
          setColor(medical);
        } else if ((curVal < pyear  &&  pyear !=0) && (curVal < myear && myear !=0) && (curVal < dyear && dyear !=0) && (curVal < lyear && lyear !=0))  {
          setColor(defaultColor);
        } else {

        }


        if (curVal >= dyear && dyear != 0) {
          var decriminalized = {};
          decriminalized[state] = {"fillKey" : "Decriminalized"};
          setColor(decriminalized);
        } else if ((curVal < pyear  &&  pyear !=0) && (curVal < myear && myear !=0) && (curVal < dyear && dyear !=0) && (curVal < lyear && lyear !=0))  {
          setColor(defaultColor);
        } else {

        }

        if (curVal >= pyear && pyear != 0) {
          var pseudo = {};
          pseudo[state] = {"fillKey" : "Pseudo"};
          setColor(pseudo);
        }  else if ((curVal < pyear  &&  pyear !=0) && (curVal < myear && myear !=0) && (curVal < dyear && dyear !=0) && (curVal < lyear && lyear !=0))  {
          setColor(defaultColor);
        } else {

        }

        if (curVal >= lyear && lyear != 0) {
          var legalized = {};
          legalized[state] = {"fillKey" : "Legalized"};
          setColor(legalized);
        } else if ((curVal < pyear  &&  pyear !=0) && (curVal < myear && myear !=0) && (curVal < dyear && dyear !=0) && (curVal < lyear && lyear !=0))  {
          setColor(defaultColor);
        } else {

        }

        if (curVal < 1973) {
          setColor(defaultColor);
        }
      }

    }

      $('#timeline').noUiSlider({
        range: [1968, 2015],
        handles: 1,
        start: 1970,
        behaviour: "tap-drag",
        connect: 'lower',
        serialization: {
          to: [ $("#low"), 'html'],
          resolution: 1
        },
        slide: onSlide,
      }).change(onSlide);

      map.legend({
        legendTitle: "Marijuana Legal Status",
        labels: {
          Medical : "Medical",
          Decriminalized: "Decriminalized",
          Pseudo: "Medical & Decriminalized",
          Legalized : "Legalized"}
      });

      $('div.datamaps-legend').css('color', 'white');


  }

  domReady(function() {

    $.getJSON('data/final.json', function(load) {
        initMap(load);
    });


  });




});



