# visualGraph
Gun Utility to Traverse Graph and use d3.js to visualize

You need to use gun.get(aRootNode).load(explore, graph) to start exploring the node and graph from any given root.
graph is a global object that keeps the nodes and edges register that d3 needs to generate a force-directed graph.

The exploration Algorithm is a depth-first search, with while loops (big datasets may take a while), this is still very much beta
, but it worked well on a small 4 node graph with interdependence.
