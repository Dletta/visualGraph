# visualGraph
Gun Utility to Traverse Graph and use d3.js to visualize

You need to use gun.get(aRootNode).load(explore.bind(this,graph)) to start exploring the node and graph from any given root.
graph is a global object that keeps the nodes and edges register that d3 needs to generate a force-directed graph.

The exploration Algorithm is a depth-first search, with while loops (big datasets may take a while), this is still very much beta
, but it worked well on a small 4 node graph with interdependence and a random 100 test nodes connected to the root node.

![Image of 4 nodes](https://i.imgur.com/eHxNnof.png) 
Graph 1 - 4 Nodes
![Image of many nodes](https://i.imgur.com/Vap9pQn.png)
Graph 2 - 107 Nodes