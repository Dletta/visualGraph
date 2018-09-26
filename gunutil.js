function print (soul) {
 gun.get(soul).once(console.log)
};

function printMap(map){
  var array = Array.from(map);
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    console.log(array[i][1])
  }
};

function printArr(array){
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    console.log(array[i])
  }
};

function makeNodes(map){
  var array = Array.from(map);
  var nodes = [];
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    nodes.push(array[i][1])
  }
  return nodes;
};

function makeEdges(map) {
  var array = Array.from(map);
  var edges = [];
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    edges.push(array[i][1])
  }
  return edges;
};

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


var dfsStack;
var dfsNodes;
var dfsEdges;
var dfsStart;
var dfsU;
var dfsLabel;
var dfsOption = false;
var dfsStop = false;
var limit = 300;


function dfs(soul, lbl){
  console.log('Starting with:',soul);
  if(lbl){dfsOption = true;} else { dfsOption = false;}
  dfsLabel = lbl;
  dfsStart = soul;
  dfsStack = [];
  dfsNodes = new Map();
  dfsEdges = new Map();
  gun.get(soul).once(dfsNode)
};

function dfsNode(node, key){
  console.log('called', dfsNodes.size);
  if(!node){console.log('no data:',key, node); dfsBack();return;}
  var soul = node['_']['#'] || node['#'];
  if(soul == dfsStart){
    dfsStack.push(soul);
  }
  dfsU = node;
  if(!dfsOption){
    dfsNodes.set(soul, {id:soul,label:key})
  } else {
    dfsNodes.set(soul, {id:soul,label:node[dfsLabel]})
  }

  dfsEdge(dfsU, dfsEdges);
};

function dfsEdge(node, edges){
  if(dfsStop){console.log('stopped');return;}
  var temp;
  var soul = node['_']['#'] || node['#'];
  var tLabel = 'none';
  var arr = Object.keys(node);
  var i = 1;
  var l = arr.length;
  for(;i<l;i++){
    if(arr[i] == label) { tLabel = node[arr[i]] }
    if(typeof(node[arr[i]]) == 'object' && node[arr[i]] != null){
      if(!dfsEdges.has(soul+node[arr[i]]['#'])){
        var temp = node[arr[i]];
        break;
      }
    }
  }
  if(temp){
    dfsNext(temp, soul,temp['#'], tLabel);
  } else {
    if(dfsStart == soul) {dfsStack.pop()}
    dfsBack();
  }
};

function dfsNext (next, edgeS, edgeT, tLabel) {
  var v = next;
  var soul = v['#'];
  dfsNodes.set(soul, {id:soul,label:v['#']})
  dfsEdges.set(edgeS+edgeT, {source:edgeS,target:edgeT})
  dfsStack.push(soul)
  dfsU = v;
  if(dfsNodes.size >= limit){console.log('Reached limit');render();return;}
  gun.get(soul).once(dfsNode)
};

function dfsBack () {
  if(!(dfsStack.length == 0)){
    soul = dfsStack.pop();
    gun.get(soul).once(dfsNode)
  } else {
    render();
  }
};

function render () {
  console.log('done');
  graph.nodes = makeNodes(dfsNodes);
  graph.edges = makeEdges(dfsEdges);
  update();
};
