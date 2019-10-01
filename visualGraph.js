/* SECTION: D3 functionality */

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
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

  label
      .attr("x", function(d) { return d.x + 5; })
      .attr("y", function(d) { return d.y + 3; })
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
node.append("title").text((d)=>{return d.id.toUpperCase();});
label = svg.selectAll('text').data(graph.nodes).enter().append("text").text((d)=>{return d.label.toUpperCase()}).attr('x', (d)=>{return d.x});
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

/* SECTION: Graph Inspector */

function detail(ev) {
  console.log(ev);
  gun.get(ev.id).once((data, key) => {
    var det = document.getElementById('detail');
    var soul = Gun.node.soul(data);
    var prop = Object.keys(data);
    var string = "<div class='contV'><h3> Data Inspector </h3>";
    string += "<div class='item'>KEY: " + key + " SOUL: " + soul;
    string += "<div class='contV'> "
    for(var item of prop) {
      console.log(item);
      if(item != "_") {
        //ignore meta data
        string += "<div class='prop'> PROP: " + item;
        if(typeof data[item] == 'string'){
          string += " VALUE: " + data[item];
        } else {
          string += " VALUE: " + data[item]['#'];
        }
        string += "</div>";
      }
    }
    string += "</div></div></div>";
    det.innerHTML =  string;
  });
}

/* SECTION: DFS functionality */

var DFS = (function () {

  var stack;
  var nodes;
  var edges;
  var start;
  var u;
  var label;
  var opt = false;
  var stop = false;
  var limit = 300;

  var util = {};

  util.makeNodes = function (map){
    var array = Array.from(map);
    var nodes = [];
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      nodes.push(array[i][1])
    }
    return nodes;
  };

  util.makeEdges = function (map) {
    var array = Array.from(map);
    var edges = [];
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      edges.push(array[i][1])
    }
    return edges;
  };

  var dfs = {};

  dfs.explore = async function(soul, lbl){
    console.log('Starting with:',soul);
    if(lbl){opt = true;} else { opt = false;}
    label = lbl;
    start = soul;
    stack = [];
    nodes = new Map();
    edges = new Map();
    var node = await gun.get(soul).promOnce();
    dfs.node(node);
  };

  dfs.node = function (node) {
    if(!node.data){console.log('no data:',node.key, node.data); dfs.back();return;}
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    if(soul == start){
      stack.push(soul);
    }
    u = node;
    if(!opt){
      nodes.set(soul, {id:soul,label:key})
    } else {
      nodes.set(soul, {id:soul,label:node.data.label})
    }

    dfs.edge(u, edges);
  };

  dfs.edge = function (node, edges) {
    if(stop){console.log('stopped');return;}
    var temp;
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    var tLabel = soul;
    var arr = Object.keys(node);
    for(var prop in arr){
      if(prop !== "_"){ //ignore metadata
        if(prop == label) { tLabel = node[prop] }
        if(typeof(node[prop]) == 'object' && node[prop] != null){
          if(!edges.has(soul+node[prop]['#'])){
            var temp = node[prop];
            break;
          }
        }
      }
    }
    if(temp){
      dfs.next(temp, soul, temp['#'], tLabel);
    } else {
      if(start == soul) {stack.pop()}
      dfs.back();
    }
  };

  dfs.next = async function (next, edgeS, edgeT, tLabel) {
    console.log('next', next);
    var v = next;
    var soul = v['#'];
    nodes.set(soul, {id:soul,label:tLabel})
    edges.set(edgeS+edgeT, {source:edgeS,target:edgeT})
    stack.push(soul)
    dfs.render();
    u = v;
    if(nodes.size >= limit){console.log('Reached limit');dfs.render();return;}
    var node = await gun.get(soul).promOnce();
    dfs.node(node);
  };

  dfs.back = function () {
    if(!(stack.length == 0)){
      soul = stack.pop();
      gun.get(soul).once(dfs.node)
    } else {
      dfs.render();
    }
  };

  dfs.render = function () {
    console.log('Rendering');
    graph.nodes = util.makeNodes(nodes);
    graph.edges = util.makeEdges(edges);
    update();
  };

  return dfs;

})()
