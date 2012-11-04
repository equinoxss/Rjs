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

})(Object.prototype)