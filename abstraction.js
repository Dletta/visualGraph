

function tuple (node, verb, object){
  var nodes = gun.get('nodes');
  var edges = gun.get('edges');
  var node = nodes.set(node);
  var verb = edges.set(verb);
  var object = nodes.set(object);
  node.get('out').set(verb);
  verb.get('source').put(node);
  verb.get('target').put(object);
  object.get('in').set(verb);
}
