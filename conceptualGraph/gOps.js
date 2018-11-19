/* Derived formation rules
  1 - projection
  2 - maximal join
*/

/* Projection
 Taking a master graph w, graph v (e.g. a query) is a projection of w when
 v can be derived from w by applying n>=0 detach ops or n>=0 restrict ops
 */

 for(each concept relation) {
  apply detachment on relation that is not in v
 }
 return subset of w that should contain v;

 /* In Gun a projection is achieved by doing gun.get('edges').map().once
  and only keeping the edges that are found in the query v
  */

  var projection = (query) {
    this.queryG = query;
    this.result = [];
    this.method = function(query, result, relation, key) {
      if(relation is found in query){
        result.push(relation) //this results in multiple projective origins v,w
      } else {
        return
      }
    },
    this.start {
      gun.get('relations').map().once(this.method.bind(this, query, this.result))
    }
  }

  var maxiJoin = (graph1, graph2) {
    this.result = new Graph;
    this.graphV = graph1;
    this.graphW = graph2;
    this.graphU = kernel(a,b,c); //u is maximal common projection;
    this.method = function () {
      u is max common project to kernel k if
        no graph t is a common projection with v and w but is not identical
        to u
      u is a mx common projection in respect to kernel k. A maximal join of
        v and w with repsect to k is a graph obtained by joining v and w
        via u, where the concept b (in u) is joined to c (in w).
        (which means the common concept of the 3 graphs are joined)
    }
  }

function concept (label, value, quant, uuid) {
 if(value === undefined && quant === undefined){
   concept indefinite
 } else if (value) {
   concept constant //one value for one person
   function permissible to check  if value is permissible on a given sort label
 } else if (quant) {
   concept quantified // one of four value A E E1 E-set
 }
}

function relation (label, uuid){

}
