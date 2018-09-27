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
var nodes = gun.get('nodes')/*.put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
*/var edges = gun.get('edges')/*.put({'__type':'index','__label':'edgesIndex'}); //same here
*/

/* Tuple function */
/* Takes objects or references from Gun to create nodes */
var tuple = function (node, verb, object){
  node.get('out').set(verb);
  verb.get('source').put(node);
  verb.get('target').put(object);
  object.get('in').set(verb);
}

/* BFS Search for Pattern (Query) */

var Query = ( function(){
  var query = {};
  var tObj = {};

  query.search = function(obj){
    tObj = obj;
    if(tObj.subject){
      nodes.map().once(query.step);
    } else {
      throw 'no pattern defined';
    }
  };

  query.step = function(node, key){
    if(typeof node != 'string'){
      var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
      console.log(soul);
      if(node['__label'] == tObj.subject || tObj.subject[0] == '?'){
        gun.get(soul).get('out').map().once(query.look.bind(null, soul))
      }
    }
  };

  query.look = function(parent, node, key) {
    console.log('Qlook',key, node, parent);
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    if(node['__label']== tObj.predicate || tObj.predicate[0] == '?'){
      var temp = (parent+'__'+soul);
      gun.get(node.target['#']).once(query.find.bind(null,temp));
    }
  };

  query.find = function(parent, node, key) {
    console.log('Qfind',key, node, parent);
    var soul = Gun.node.soul(node)/*node['_']['#'] || node['#']*/;
    if(node['__label']== tObj.subject || tObj.subject[0] == '?'){
      var temp = (parent+'__'+soul);
      console.log('pushed',temp);
      tObj.result.push(temp);
      query.print();
    }
  };

  query.print = function () {
    if(!tObj.result){
      console.log('no results');
      return;
    } else {
      var i = 0;
      var l = tObj.result.length;
      for(i;i<l;i++){
        var temp = tObj.result[i];
        temp = temp.split('__');
        var y = 0;
        var l1 = temp.length;
        for(y;y<l1;y++){
          gun.get(temp[y]).once(query.nice.bind(null,y));
        }
      }
    }
  };

  query.nice = function (item, node) {
    console.log(item,node['__label']);
  }

  return query;
}
)(Gun, gun, nodes, edges);

/* Triple Traversal Object
 * This stores options and is meant to become the transport object between
 * functions that execute during Traversal
 */

var Traversal = function(triple){
  this.subject = triple.subject;
  this.predicate = triple.predicate;
  this.object = triple.object;
  this.result = [];
}

triple = {subject:'?p',predicate:'type',object:'Artist'};
var trav = new Traversal(triple);
Query.search(trav);

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
