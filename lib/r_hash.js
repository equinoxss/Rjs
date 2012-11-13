

(function(proto){

proto.reject = function() {
  if (arguments.length == 0) {
    throw "missing argument";
  }
  if (typeof arguments[0] != "function") {
    throw "invalid argument";
  }
  var filtered = {}
  for (var key in this) {
    // wip
  }
}


})(Hash.prototype);