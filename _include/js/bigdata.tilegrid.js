  var radius = 50, padding = 5, cols = 8, parameter = 'RecId';
  var menu = [
            {id: 'RecId', name: 'Record ID'},
            {id: 'EntId', name: 'Entity ID'},
            {id: 'Dominance', name: 'Dominance Value'},
            {id: 'Spread', name: 'Spread Value'},
            {id: 'OrderVal', name: 'Order Value'},
          ];

/// HELPER FUNCTIONS
function translateSVG(x, y) {
  return 'translate('+x+','+y+')';
}

//// UI
function menuClick(d) {
  if(parameter === d.id)
    return;

  d3.select('#menu').selectAll('div').classed('selected', false);
  d3.select(this).classed('selected', true);

  parameter = d.id;

  updateChart();
}

function selectThis(d) {
  d3.select(this).classed('selected', function() {return !d3.select(this).classed('selected');})
}

//// D3
function updateChart() {

  var nodes = d3.select('#chart')
    .selectAll('div.node')
    .sort(function(a, b) {return parameter === 'ranking' ? d3.ascending(a[parameter], b[parameter]) : d3.descending(a[parameter], b[parameter]);})
    .transition()
    .duration(1000)
    .style('left', function(d, i) {
      var col = i % cols;
      var x = 2 * col * (radius + padding);
      return x + 'px';
    })
    .style('top', function(d, i) {
      var row = Math.floor(i / cols);
      var y = 2 * row * (radius + padding);
      return y + 'px';
    });

  d3.select('#chart')
    .selectAll('div.node .value')
    .transition()
    .duration(1000)
    .tween("text", function(d)
      {
        var x = d[parameter];
        if (!(parameter == 'RecId' || parameter == 'EntId')) x *= 10000;
        var i = d3.interpolate(this.textContent, (x));
        return function(t) {
          this.textContent = Math.round(i(t));
      };
    });
}

 // Menu
d3.select('#menu')
  .selectAll('div')
  .data(menu)
  .enter()
  .append('div')
  .text(function(d) {return d.name;})
  .classed('selected', function(d, i) {return i==0;})
  .on('click', menuClick);


  d3.json("_include/data/crashData.json", function(dataset) {
    var nodes = d3.select('#chart')
                      .selectAll('div')
                      .data(dataset)
                      .enter()
                      .append('div')
                      .attr('id', function(d) {return 'entity-'+d.EntId;})
                      .classed('node', true)
                      .style('width', 2 * radius + 'px')
                      .style('height', 2 * radius + 'px')
                      .on('click', selectThis);


        nodes
          .append('div')
          .classed('name', true)
          .text(function(d) {return d.EntValue })
          .style('width', 2 * radius + 'px');

        nodes
          .append('div')
          .classed('value', true)
          .text(function(d) {return d[parameter];})
          .style('width', 2 * radius + 'px');

        updateChart();

  });