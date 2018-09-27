/* Utility Functions for D3 and GunDB visualization */

/* Legacy Traversal  no longer used, kept for reference atm*/
function exhausted(node,edges,opt) {
  var temp;
  var arr = Object.keys(node);
  var i = 0;
  var l = arr.length;
  for(;i<l;i++){
    if(typeof(node[arr[i]]) !== 'string' && node[arr[i]].name){
      if(!edges.has(node.name+arr[i])){
        var temp = arr[i];
        break;
      }
    }
  }
  if(!opt) {
    if(temp){
      return false;
    } else {
      return true;
    }
  } else {
    if(temp){
      return temp;
    }
  }
};

function explore(graph, cb, node, key) {
  var stack = [];
  var nodes = new Map();
  var edges = new Map();
  nodes.set(node.name, {id:node.name});
  var start = node;
  var u = node;
  stack.push(u)
  do{
    while(!exhausted(u, edges)){
      var edge = exhausted(u, edges, true);
      var v = u[edge];
      nodes.set(v.name, {id:v.name});
      edges.set(u.name+v.name, {source:u.name,target:v.name})
      stack.push(v)
      u = v;
    }
    var y = u;
    while(!(stack.length==0)){
      y = stack.pop();
      if(!exhausted(y,edges)){
        stack.push(y)
        u = y;
        break;
      }
    }
  }while(!(stack.length==0))
  console.log('done');
  graph.nodes = makeNodes(nodes);
  graph.edges = makeEdges(edges);
  cb();
};

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

  dfs.search = function(soul, lbl){
    console.log('Starting with:',soul);
    if(lbl){opt = true;} else { opt = false;}
    label = lbl;
    start = soul;
    stack = [];
    nodes = new Map();
    edges = new Map();
    gun.get(soul).once(dfs.node)
  };

  dfs.node = function(node, key) {
    console.log('called', nodes.size);
    if(!node){console.log('no data:',key, node); dfs.back();return;}
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    if(soul == start){
      stack.push(soul);
    }
    u = node;
    if(!opt){
      nodes.set(soul, {id:soul,label:key})
    } else {
      nodes.set(soul, {id:soul,label:node[label]})
    }

    dfs.edge(u, edges);
  };

  dfs.edge = function (node, edges) {
    if(stop){console.log('stopped');return;}
    var temp;
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    var tLabel = 'none';
    var arr = Object.keys(node);
    var i = 1;
    var l = arr.length;
    for(;i<l;i++){
      if(arr[i] == label) { tLabel = node[arr[i]] }
      if(typeof(node[arr[i]]) == 'object' && node[arr[i]] != null){
        if(!edges.has(soul+node[arr[i]]['#'])){
          var temp = node[arr[i]];
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
    if(nodes.size >= limit){console.log('Reached limit');dfs.render();return;}
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
    console.log('Rendering');
    graph.nodes = util.makeNodes(nodes);
    graph.edges = util.makeEdges(edges);
    update();
  };

  return dfs;
})(Gun, gun, graph, update);
