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
      .attr("cy", function(d) { return d.y; });

  label
      .attr("x", function(d) { return d.x + 5; })
      .attr("y", function(d) { return d.y + 3; });
}

function makeLabel(data) {
  //console.log(data);
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

// INITIALIZING D3 and GLOBALS

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");
var link;
var node;
var label;
var highlightSize = 5;
var normalSize = 3;
var zoom = d3.zoom();
svg.call(zoom.on("zoom", zoomed));

function zoomed() {
link.attr("transform", d3.event.transform);
node.attr("transform", d3.event.transform);
label.attr("transform", d3.event.transform);
}

var color = d3.scaleOrdinal(d3.schemeCategory10);

var simulation = d3.forceSimulation();
simulation.force("link", d3.forceLink().id(function(d) { return d.id; }));
simulation.force("center", d3.forceCenter(width/2,height/2));
simulation.force("charge", d3.forceManyBody().strength(-700));


function update () {
console.log('updated');
svg.selectAll('*').remove();
link = svg.append("g").attr("class","links").selectAll("line").data(graph.edges).enter().append("line");
node = svg.append("g").attr("class", "nodes").selectAll("circles").data(graph.nodes).enter()
              .append("circle").attr("id", (d)=>{return d.id}).attr("r", normalSize).attr('fill', 'rgb(120,0,0)').call(d3.drag().on("start",dragstarted).on("drag", dragged).on("end",dragended))
              .on("click", detail);
node.append("title").text((d)=>{return d.id.toUpperCase();});
label = svg.selectAll('text').data(graph.nodes).enter().append("text").text((d)=>{if(d.label){return d.label.toUpperCase()}}).attr('x', (d)=>{return d.x});
simulation.nodes(graph.nodes).on("tick", ticked);
simulation.force("link").links(graph.edges);
simulation.force("charge", d3.forceManyBody().strength(-700));
simulation.alphaTarget(0.3);
simulation.restart();
setTimeout(coolIt, 1000);
};

var coolIt = function () {
  simulation.alphaTarget(0);
}

/* SECTION: Graph Inspector */

var previous;

function detail(ev) {
  if(ev.id) {
    var key = ev.id;
    var select = d3.select("#"+key);
    try {
      previous.attr('r', normalSize);
    } catch (e) {console.log(e, "that's okay!!")};
    select.attr('r', highlightSize);
    previous = select;
  } else {
    var key = ev.target.id;
    var select = d3.select("#"+key);
    try {
      previous.attr('r', normalSize);
    } catch (e) {console.log(e, "that's okay!!")};
    select.attr('r', highlightSize);
    previous = select;
  }
  gun.get(key).once((data, key) => {
    var det = document.getElementById('detail');
    var soul = Gun.node.soul(data);
    var prop = Object.keys(data);
    var string = "<div class='contV'><h3> Data Inspector </h3>";
    string += "<div class='item'> SOUL: <span id='soul'>" + soul + "</span>";
    string += "<div class='contV'> "
    for(var item of prop) {
      if(item != "_") {
        if(data[item] == null) {continue};
        // ignore meta data
        string += "<div class='prop'> PROP: " + item;

        if(typeof data[item] == 'object'){
          string += " VALUE: <span class='link'";
          string += " id='" + data[item]['#'] + "'";
          string += " onclick='detail(event)'>" +  data[item]['#'];
          string += "</span>";
        } else {
          string += " VALUE: "
          string += '<input id="'+item+'" value="' + data[item] + '">';
        }
        string += "</div>";
      }
    }
    string += "</div></div></div>";
    det.innerHTML =  string;
  });
}

var saveDetail = function (ev) {
  var items = document.getElementsByClassName("item");
  for(var item of items) {
    var soul = item.firstChild;
    soul = soul.nextSibling;
    soul = soul.firstChild;
    soul = soul.data;
    var cont = item.firstChild;
    cont = cont.nextSibling;
    cont = cont.nextSibling;
    var propList = cont.children;
    console.log(propList)
    for(let prop of propList) {
      if(prop.firstChild.nextSibling){
        let id = prop.firstChild.nextSibling.id;
        let val = prop.firstChild.nextSibling.value;
        gun.get(soul).get(id).put(val);
      }
    }
  }

  var key = document.getElementById('key').value;
  var label = document.getElementById('label').value;
  console.log(key, label);
  DFS.search(key, label);
}

var savB = document.getElementById('save');
savB.addEventListener("click", saveDetail);

var start = function (ev) {
  console.log('started',ev)
  var key = document.getElementById('key').value;
  var label = document.getElementById('label').value;
  DFS.search(key, label);
}

var but = document.getElementById('startButton');
but.addEventListener("click", start);


/* SECTION: DFS functionality */


/* Depth First Search - explore all of the nodes from the given Soul
 * then update D3 data and the force-layout from the html
 */

var DFS = (function(){
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

  util.printMap = function (map) {
    var array = Array.from(map);
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      console.log(array[i][1])
    }
  }

  util.printArr = function (array){
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      console.log(array[i])
    }
  };

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

  dfs.search = function(soul, lbl, lim){
    console.log('Starting with:',soul);
    if(lbl){opt = true;} else { opt = false;}
    if(lim){limit = lim};
    console.log(limit);
    label = lbl;
    start = soul;
    stack = [];
    nodes = new Map();
    edges = new Map();
    gun.get(soul).once(dfs.node)
  };

  dfs.node = function(node, key) {
    //console.log('called', nodes.size);
    if(!node){console.error('no data:',key, node); dfs.back();return;}
    var soul = Gun.node.soul(node);
    if(soul == start){
      stack.push(soul);
    }
    u = node;
    if(!opt || node[label] == undefined){
      nodes.set(soul, {id:soul,label:key})
    } else {
      nodes.set(soul, {id:soul,label:node[label]})
    }
    dfs.edge(u, edges);
  };

  dfs.edge = function (node, edges) {
    if(stop){console.log('stopped');return;}
    var temp;
    var soul = Gun.node.soul(node);
    var tLabel = 'none';
    var arr = Object.keys(node);
    for(var item of arr){
      //save label if the prop meets the label
      if(item == label) { tLabel = node[item] }
      //console.log(tLabel);
      // if it's an object, then there is more
      if(typeof node[item] == 'object'){
        //skip nulled items or metadata
        if(node[item] == null || item == "_"){continue};
        if(!edges.has(soul+node[item]['#'])){
          var temp = node[item];
          break;
        }
      }
    }
    if(temp){
      dfs.next(temp, soul,temp['#'], tLabel);
    } else {
      if(start == soul) {stack.pop()}
      dfs.back();
    }
  };

  dfs.next = function (next, edgeS, edgeT, tLabel) {
    var v = next;
    var soul = v['#'];
    nodes.set(soul, {id:soul,label:v['#']})
    edges.set(edgeS+edgeT, {source:edgeS,target:edgeT})
    stack.push(soul)
    u = v;
    if(nodes.size >= limit){console.info('Reached limit');dfs.render();return;}
    gun.get(soul).once(dfs.node)
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
    //console.log('Rendering');
    graph.nodes = util.makeNodes(nodes);
    graph.edges = util.makeEdges(edges);
    update();
  };

  return dfs;
})(Gun, gun, graph, update);
