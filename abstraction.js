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
function newNode(object, label) {
  object.__label = label;
  object.__type = 'node';
  var gunRef = nodes.set(object);
  return gunRef;
}

/* Schema for Edges */
function newEdge(object, label) {
  object.__label = label;
  object.__type = 'edge';
  var gunRef = edges.set(object);
  return gunRef;
}

/* Create Index for Nodes and Edges */
var nodes = gun.get('nodes').put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
var edges = gun.get('edges').put({'__type':'index','__label':'edgesIndex'}); //same here

/* Tuple function */
/* Takes objects or references from Gun to create nodes */
var tuple = function (node, verb, object){
  node.get('out').set(verb);
  verb.get('source').put(node);
  verb.get('target').put(object);
  object.get('in').set(verb);
}

/* BFS Search for Pattern (Query) */

var Traversal = function(triple){
  this.subject = triple.subject;
  this.predicate = triple.predicate;
  this.object = triple.object;
  this.result = [];
}

var bfsPattern = [];
var bfsResult = [];

var bfsSearch = function(obj){
  if(obj.subject) {
    nodes.map().once(bfsStep.bind(null,obj));
  } else {
    throw 'no pattern defined';
  }
}
var bfsStep = function(obj, node, key){
  if(typeof node != 'string'){
    console.log(`found ${JSON.stringify(node)}`);
    var soul = node['_']['#'] || node['#'];
    if(node['__label'] == obj.subject || obj.subject[0] == '?'){
      gun.get(soul).get('out').map().once(bfsLook.bind(null,obj,soul))
    }
  }
}
var bfsLook = function(obj, parent,node, key) {
  console.log('look',key, node, parent,obj.predicate);
  var soul = node['_']['#'] || node['#'];
  if(node['__label']== obj.predicate || obj.predicate[0] == '?'){
    var temp = (parent+'__'+soul);
    gun.get(node.target['#']).once(bfsFind.bind(null,obj,temp));
  }
}
var bfsFind = function(obj, parent, node, key) {
  console.log('find',key,node, parent);
  var soul = node['_']['#'] || node['#'];
  if(node['__label']== obj.subject || obj.subject[0] == '?'){
    var temp = (parent+'__'+soul);
    console.log('pushed',temp);
    obj.result.push(temp)
  }
}

var bfsPrint = function(obj) {
  if(!obj.result){
    console.log('no results');
    return;
  } else {
    var i = 0;
    var l = obj.result.length;
    for(i;i<l;i++){
      var temp = obj.result[i];
      temp = temp.split('__');
      var y = 0;
      var l1 = temp.length;
      for(y;y<l1;y++){
        gun.get(temp[y]).once(bfsNice.bind(null,y));
      }
    }
  }
}
var bfsNice = function(item, node) {
  console.log(item,node['__label']);
}

bfsPattern = {subject:'?p',predicate:'type',object:'Artist'};
var trav = new Traversal(bfsPattern);
bfsSearch(trav);

//Example SPARQL output
var query = {
  "type": "query",
  "prefixes": {
    "dbpedia-owl": "http://dbpedia.org/ontology/"
  },
  "queryType": "SELECT",
  "variables": [ "?p", "?c" ],
  "where": [
    {
      "type": "bgp",
      "triples": [
        {
          "subject": "?p",
          "predicate": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "object": "http://dbpedia.org/ontology/Artist"
        },
        {
          "subject": "?p",
          "predicate": "http://dbpedia.org/ontology/birthPlace",
          "object": "?c"
        },
        {
          "subject": "?c",
          "predicate": "http://xmlns.com/foaf/0.1/name",
          "object": "\"York\"@en"
        }
      ]
    }
  ]
}
