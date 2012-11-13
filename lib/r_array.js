
(function(proto){

/** CONSTRUCTION */

proto.times = function() {
  var ar = [];
  if (arguments.length > 0) {
    var t = arguments[0];
    while (t-- > 0) ar = ar.concat(this);
  }
  return ar; 
}

proto.intersect = function() {
  this._validate_arguments(arguments, 1, ["object"]);
  var tally = {}, intersection = [];
  this.each(function(value){
    tally[value] = {count:0, val:value};
  });
  arguments[0].each(function(value){
    if (tally[value]) {
      tally[value].count++;
    }
  });
  for (var key in tally) {
    if (tally[key].count > 0) {
      intersection.push(tally[key].val);
    }
  }
  return intersection;
}

proto.union = function() {
  return Array.prototype.concat.apply(this, arguments);
}


/** ITERATION */

proto.each = function(callback) {
  if (callback == void 0) return;
  for (var i=0, len=this.length; i<len; i++) {
    callback( this[i] );
  }
}

/** CLOCKWORKS */

proto._validate_arguments = function(args, count, types) {
  if (args.length != count) {
    throw "wrong number of arguments";
  }
  for (var i=0, len=args.length; i<len; i++) {
    if (typeof args[i] != types[i]) {
      throw "argument " + i + " invalid";
    }
  }
}

})(Array.prototype);