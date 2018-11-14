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
var nodes = gun.get('nodes')//.put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
var edges = gun.get('edges')//.put({'__type':'index','__label':'edgesIndex'}); //same here


/* Tuple function */
/* Takes objects or references from Gun to create nodes */
var tuple = function (node, verb, object){
  node.get('out').set(verb);
  verb.get('source').put(node);
  verb.get('target').put(object);
  object.get('in').set(verb);
  setTimeout(DFS.search('nodes','__label'), 1000);
}

var addNode = function (label, edgeR, nodeR) {
  var obj = {label:label, edge:edgeR, node:nodeR};
  nodes.map().once(function(obj, data, key){
    if(data.__label == obj.label) {
      var soul = Gun.node.soul(data);
      var node = gun.get(soul).get('out').set(obj.edge);
      console.log(node._.soul);
      var node = gun.get(node._.soul);
      obj.edge.get('source').put(node);
      obj.edge.get('target').put(obj.node);
      obj.node.get('in').set(obj.edge);
    } else {
      console.log(`${obj.label}, not found`);
    }
  }.bind(null, obj));
};

/* BFS Search for Pattern (Query) */

var QuerySearch = ( function(){
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
      DFS.search('nodes','__label');
    }
  };

  query.nice = function (item, node) {
    console.log(item,node['__label']);
  }

  return query;
}
)(Gun, gun, nodes, edges);

var QueryFind = ( function(){
  var query = {};
  var tObj = {};
  var util = {};

  util.isMatch = function (is, toMatch) {
    return toMatch.some(function (v) {
        return is.indexOf(v) >= 0;
    });
  };

  util.print = function () {
    console.log('Found:');
    var arr = Object.entries(tObj.result[0]);
    var i = 0;
    var l = arr.length;
    for(i;i<l;i++){
      console.log(arr[i][0]);
      console.log(arr[i][1]);
    }
    DFS.search('nodes','__label');
  }

  query.find = function(obj){
    tObj = obj;
    nodes.map().once(query.match);
  };

  query.match = function(node, key){
    if(typeof node != 'string'){
      var keysQ = Object.keys(tObj.obj);
      var keys = Object.keys(node);
      var soul = node._.soul;
      if(util.isMatch(keys,keysQ)){
        for(var i=0;i<keys.length;i++){
          for(var y=0;y<keysQ.length;y++){
            var qK = keysQ[y];
            var qV = tObj.obj[qK];
            var k = keys[i];
            var v = node[k];
            if(qV == v && k == qK) {
              tObj.result.push(node);
              util.print();
            }
          }
        }
      } else {
        console.log('no match!');
        return;
      }
    } else {
      return;
    }
  };

  return query;
}
)(Gun, gun, nodes, edges);


/* Triple Traversal Object
 * This stores options and is meant to become the transport object between
 * functions that execute during Traversal
 */

var TripTrav = function(triple){
  this.subject = triple.subject;
  this.predicate = triple.predicate;
  this.object = triple.object;
  this.result = [];
}

var triple = {subject:'?p',predicate:'type',object:'Artist'};
var trav = new TripTrav(triple);
QuerySearch.search(trav);

/* Select an object to match from a node */

var SelectTrav = function(obj) {
  this.obj = obj;
  this.result = [];
}

var selection = {name:'Ice Cream'};
var travSel = new SelectTrav(selection);
QueryFind.find(travSel);

/* Local Graph Functions
 * To build a graph for queries
 * To build a graph to perform graph operations on
 */

 var localGraph = function() {
   this.map = new Map(),
   this.add = function (item) {
     var uuid = uuidv4();
     this.map.set(uuid, item);
     return uuid;
   },
   this.find = function(uuid) {
     return this.map.get(uuid);
   },
   this.update = function(uuid, item) {
     this.map.set(uuid, item);
   }
 }

 function uuidv4 () {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
   })
 }

 var lGraph = new localGraph();
 var test = lGraph.add({id:'test1'});
 var obj = {name:'test', label:'person', birthdate:'07-05-1986', link: test};
 var test0 = lGraph.add(obj)
