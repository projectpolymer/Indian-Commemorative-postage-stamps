var margin = {top: 10, right: 10, bottom: 10, left: 25},
    width = 350 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr('class','parent_group')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var color = d3.scaleOrdinal(d3.schemeCategory20);
var sankey = d3.sankey()
    .nodeWidth(4)
    .nodePadding(290)
    .size([width, height]);

var graph = {
    "nodes":[
        {"node":0, "name":"1947"},
        {"node":1, "name":"1948"},
        {"node":2, "name":"1949"},
        {"node":3, "name":"1950"},
        {"node":4, "name":"thematic"},
        {"node":5, "name":"personality"},
        {"node":6, "name":"institution"}
    ],
    "links":[
        {"source":0, 'target':4, "value":7},
        {"source":0, 'target':5, "value":1},
        {"source":0, 'target':6, "value":1},
        {"source":1, 'target':4, "value":1},
        {"source":1, 'target':5, "value":1},
        {"source":2, 'target':5, "value":1},
        {"source":2, 'target':6, "value":1},
        {"source":3, 'target':4, "value":1},
        {"source":3, 'target':6, "value":1}]
}

sankey
.nodes(graph.nodes)
.links(graph.links)
.layout(1);

console.log(sankey  )

var link = svg.append("g")

.attr('class', 'links')
    .selectAll(".link")
    .data(graph.links)
    .enter()
    .append("path")
      .attr("class", "link")
      .attr('fill', 'none')
      .attr('stroke', '#c6c7c8')
      .attr("d", sankey.link() )
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

var node = svg.append("g")
      .attr('class', 'nodes')
      .selectAll(".node")
      .data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

node
        .append("rect")
          .attr("height", function(d) { return d.dy; })
          .attr("width", sankey.nodeWidth())
          .style("fill", function(d) { 
            if(d.name.length <= 4){
                return d.color = 'grey';   
            }else{
                return d.color = color(d.name.replace(/ .*/, "")); }})
          .append("title")
          .text(function(d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });

node
          .append("text")
            .attr("x", -18)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { 
                if(d.name.length <= 4){
                    return d.name;   
                }
                })
          .filter(function(d) { return d.x < width / 2; })
            .attr("x", sankey.nodeWidth())
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(270)");
