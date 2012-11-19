
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

/** TRANFORMATION */

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

proto.difference = function() {
  this._validate_arguments(arguments, 1, ["object"]);
  var filterItems = arguments[0];
  return this.delete_if( function(item) {
    return filterItems.indexOf(item);
  });
}

proto.delete_if = function() {
  this._validate_arguments(arguments, 1, ["function"]);
  var callback = arguments[0],
      result = [];
  this.each( function(item) {
    if (callback(item) === false) {
      result.push(item);
    }
  });
  return result;
}

proto.reject = function() {
  return Array.prototype.delete_if.apply(this, arguments);
}

proto.map = function() {
  this._validate_arguments(arguments, 1, ["function"]);
  var callback = arguments[0],
      result = [];
  this.each( function(item) {
    result.push(callback(item));
  });
  return result;
}

proto.collect = function() {
  return Array.prototype.map.apply(this, arguments);
}

/** COMPARISON */

proto.includes = function() {
  this._validate_arguments(arguments, 1, null);
  return this.indexOf(arguments[0]) != -1;
}

proto.compare = function() {
  var result = 0,
      comparee = arguments[0],
      len1=this.length,
      len2=comparee.length;
  for (var i=0; result==0 && i < len1 && i < len2; i++) {
    result = this[i].compare( comparee[i] )
  }
  if (result == 0) {
    if (len1 > len2) {
      result = 1;
    } else if (len1 < len2) {
      result = -1;
    }
  }
  return result;
}

proto.equals = function() {
  this._validate_arguments(arguments, 1, ["object"]);
  var compareee = arguments[0],
      equals = this.length == compareee.length;
  if (equals) {
    this.each( function(item, index) {
      equals &= (item === compareee[index]);
    });
  }
  return equals;
}


/** ITERATION */

proto.each = function() {
  this._validate_arguments(arguments, 1, ["function"]);
  var callback = arguments[0];
  for (var i=0, len=this.length; i<len; i++) {
    callback( this[i], i );
  }
}

/** CLOCKWORKS */

proto._validate_arguments = function(args, count, types) {
  if (args.length != count) {
    throw "wrong number of arguments";
  }
  if (types) {
    for (var i=0, len=args.length; i<len; i++) {
      if (typeof args[i] != types[i]) {
        throw "argument " + i + " invalid";
      }
    }
  }
}

})(Array.prototype);