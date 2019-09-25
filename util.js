function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function ticked() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
}

function makeLabel(data) {
  console.log(data);
  var i = 0;
  var l = Object.entries(data).length;
  var string = '';
  for(i;i<l;i++){
    var temp = Object.entries(data)[i][0];
    temp += ' : ';
    var temp1 = Object.entries(data)[i][1];
    temp1 += ' ';
    string += temp + temp1 + " // ";
  }
  return string;
}

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");
var link;
var node;
var label;
var zoom = d3.zoom();
svg.call(zoom.on("zoom", zoomed));

function zoomed() {
link.attr("transform", d3.event.transform);
node.attr("transform", d3.event.transform);
label.attr("transform", d3.event.transform);
}

function detail(ev) {
  console.log(ev);
  gun.get(ev.id).once((data, key) => {
    var det = document.getElementById('detail');
    var prop = Object.keys(data);
    var string = "<div class='contV'><h3> Data Inspector </h3>";
    string += "<div class='item'>Item with Key: " + key
    string += "<div class='contV'>Data: <br>"
    for(var item of prop) {
      console.log(item);
      if(item != "_") {
        //ignore meta data
        string += "<div class='item'> prop: " + item;
        if(typeof data[item] == 'string'){
          string += " val: " + data[item] + "<br>";
        } else {
          string += " val: " + data[item]['#'] + "<br>";
        }
        string += "</div>";
      }
    }
    string += "</div></div></div>";
    det.innerHTML =  string;
  });
}

var color = d3.scaleOrdinal(d3.schemeCategory10);

var simulation = d3.forceSimulation();
simulation.force("charge", d3.forceManyBody().strength(-600));
simulation.force("link", d3.forceLink().id(function(d) { return d.id; }));
simulation.force("center", d3.forceCenter(width/2,height/2));

function update () {
console.log('updated');
svg.selectAll('*').remove();
link = svg.append("g").attr("class","links").selectAll("line").data(graph.edges).enter().append("line");
node = svg.append("g").attr("class", "nodes").selectAll("circles").data(graph.nodes).enter()
              .append("circle").attr("r", 2.5).attr('fill', 'red').call(d3.drag().on("start",dragstarted).on("drag", dragged).on("end",dragended))
              .on("click", detail);
node.append("title").text((d)=>{return d.id;});
label = svg.selectAll('text').data(graph.nodes).enter().append("text").text((d)=>{return d.label}).attr('x', (d)=>{return d.x});
simulation.nodes(graph.nodes).on("tick", ticked);
simulation.force("link").links(graph.edges);
simulation.restart();
function ticked() {
link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

node
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
label
    .attr("x", function(d) { return d.x + 5; })
    .attr("y", function(d) { return d.y + 3; })
}
};
