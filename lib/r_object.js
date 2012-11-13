(function (proto) {

proto.class = function() {
  return this.constructor;
}

proto.clone = function() {
  var clone = {};
  for(var key in this) {
    clone[key] = this[key];
  }
  return clone;
}

proto.define_singleton_method = function(key, method) {
  return this.class()[key] = method;
}

proto.display = function(port) {
  var write = (typeof port.write == "function") ? port.write : console.log;
  return write(this);
}

proto.dup = proto.clone;

// object.to_enum
// Require Enumerator class functionality

})(Object.prototype);