# visualGraph
Gun Utility to Traverse Graph and use d3.js to visualize

Run your node.js super-peer, open the util.html (modify the peer to include only your peer's address)
then open the console in the website and type startTrav(yourRootNodeKey)
that will start traversing the graph
after it is complete the graph will showstart exploring the node and graph from any given root.
Graph is a global object that keeps the nodes and edges register that d3 needs to generate a force-directed graph.

The exploration Algorithm is a depth-first search, with while loops (big datasets may take a while), this is still very much beta
, but it worked well on a small 4 node graph with interdependence and a random 100 test nodes connected to the root node.

![Image of 4 nodes](https://i.imgur.com/eHxNnof.png)
Graph 1 - 4 Nodes
![Image of many nodes](https://i.imgur.com/Vap9pQn.png)
Graph 2 - 107 Nodes

# Triple store

Create Nodes and Edges. Store Triple
```
//syntax newNode(dataObject, label)
var jack = newNode({name:'Jack Reach', age:29}, 'Jack');
var wins = newEdge({when:'now'}, 'wins');
var ever = newNode({name:'Everything'},'Everything');

tuple(jack,wins,ever);
```
Query your Data
```
//Look for specific tuples
var triple = {subject:'?p',predicate:'wins',object:'Everything'};

var trav = new TripTrav(triple);

QuerySearch.search(trav);

//prints 0 'Jack Reach'
         1 'wins'
         2 'Everything'
         
// Look for a specific object
var selection = {age:29};
var travSel = new SelectTrav(selection);
QueryFind.find(travSel);

//prints obj Jack
```
