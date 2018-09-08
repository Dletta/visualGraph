/* Abstraction Layer to GunDB
* Functions to abstract the creation of a schema,
* compatible with OWL/RDF via SPARQL,
* the goal here is to make it as easy for the user and/or
* interface into gun, to create and retrieve linked data
* graphs
*/

/* Schema definitions:
* Metadata should start with double-underscore
* all items should include __label and __type with the corresponding type
* __label = a name that visualGraph can display for the node
* __type = either 'node', 'edge' or 'index', this will become important
*   when querying happens
*/

/* Schema for Nodes */
var node = function (label) {
  var temp = {};
  temp['__type'] = 'node';
  temp['__label'] = label;
  return temp;
}

var createNode = function (label) {
  var temp = node(label);
  var gunRef = nodes.set(temp);
  return gunRef;
}
/* Schema for Edges */
var edge = function (label) {
  var temp = {};
  temp['__type'] = 'edge';
  temp['__label'] = label;
  return temp;
}

var createEdge = function (label) {
  var temp = edge(label);
  var gunRef = edges.set(temp);
  return gunRef;
}

/* Create Index for Nodes and Edges */
var nodes = gun.get('nodes').put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
var edges = gun.get('edges').put({'__type':'index','__label':'nodesIndex'}); //same here

/* Tuple function */
/* Takes objects or references from Gun to create nodes */
var tuple = function (node, verb, object){
  var node = nodes.set(node);
  var verb = edges.set(verb);
  var object = nodes.set(object);
  node.get('out').set(verb);
  verb.get('source').put(node);
  verb.get('target').put(object);
  object.get('in').set(verb);
}
