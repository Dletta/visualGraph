## visualGraph - A visualizer / explorer for Gun DB data

### How to use

Clone the repo, open visualGraph.html in your browser.

Specify the super / node / heroku peer whose data you want to inspect.

Enter the key/soul of the node you want to focus on.
If your schema has a label node, specify it, empty will label each node with it’s soul.

Hit start. Graph is traversed based on connections in your data.

Navigate graph by click, drag and zoom.
Click on nodes to display their data.

### Powered by

Gun DB and d3.js


### Description

Utility to Traverse Graph and use d3.js to visualize

1. type DFS.search(yourRootNodeKey,labelInData)
that will start traversing the graph.
After it is complete the graph will show.
Start exploring the node and graph from any given root.
Graph is a global object that keeps the nodes and edges register that d3 needs to generate a force-directed graph.

The exploration Algorithm is a depth-first search, with while loops (big datasets may take a while), this is still very much beta, but it worked well on a small 4 node graph with interdependence and a random 100 test nodes connected to the root node.
Latest test was run on a large dataset from notabug.io. (reddit-like dApp) and although it took a while d3 is able to handle more than 3000 nodes. (Zoom and Pan allow you to see detail, but it may lag depending on your machine)

![Image of 4 nodes](https://i.imgur.com/eHxNnof.png)
Graph 1 - 4 Nodes
![Image of many nodes](https://i.imgur.com/Vap9pQn.png)
Graph 2 - 107 Nodes

### Triple store

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
