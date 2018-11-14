var _ = require('lodash');

var Storage = function() {
  this.map = new Map(),
  this.add = function (item) {
    var uuid = uuidv4()
    this.map.set(uuid, item)
    return uuid
  },
  this.find = function(uuid) {
    return this.map.get(uuid)
  },
  this.byValue = function(item) {
    for (var [key, value] of this.map){
      console.log()
      if(_.isEqual(value, item)) {
        return key
      } else {
        return -1
      }
    }
  }
}

function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

var store = new Storage()
var test = store.add('test')
var obj = {name:'test', label:'person', birthdate:'07-05-1986'}
var testO = store.add(obj)
console.log(store)
console.log('test')
console.log(test)
console.log(store.find(test))
console.log(store.byValue('test'))
console.log('testO')
console.log(testO)
console.log(store.byValue(obj))
