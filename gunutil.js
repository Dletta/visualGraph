function printMap(map){
  var array = Array.from(map);
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    console.log(array[i][1])
  }
}

function printArr(array){
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    console.log(array[i])
  }
}

function makeNodes(map){
  var array = Array.from(map);
  var nodes = [];
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    nodes.push(array[i][1])
  }
  return nodes;
}

function makeEdges(map) {
  var array = Array.from(map);
  var edges = [];
  var i =0;
  var l = array.length;
  for(;i<l;i++){
    edges.push(array[i][1])
  }
  return edges;
}

function exhausted(node,edges,opt) {
  var temp;
  var arr = Object.keys(node);
  var i = 0;
  var l = arr.length;
  for(;i<l;i++){
    if(arr[i] !== 'name'){
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
}

function explore(graph,node, key) {
  var stack = [];
  var nodes = new Map();
  var edges = new Map();
  nodes.set(node.name, {id:node.name});
  var start = node;
  var u = node;
  stack.push(u)
  printArr(stack)
  do{
    while(!exhausted(u, edges)){
      var edge = exhausted(u, edges, true);
      var v = u[edge];
      console.log('v is',v.name, v);
      nodes.set(v.name, {id:v.name});
      edges.set(u.name+v.name, {source:u.name,target:v.name})
      stack.push(v)
      u = v;
      console.log('going down');
      printArr(stack);
    }
    y = u;
    do{
      console.log('looking for parent');
      var y = stack.pop()
      printArr(stack)
    }while(stack.length>0 && exhausted(y,edges))
    u = y;
    console.log(`found ${u.name}`);
  }
  while(stack.length>0 || !exhausted(u,edges))

  var graph = {};
  graph.nodes = makeNodes(nodes);
  graph.edges = makeEdges(edges);
  update(graph);
}
