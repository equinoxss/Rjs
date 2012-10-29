/*
	Ruby String methods
*/

/** CONSTUCTION */

String.prototype.times = function(t) {
	var ar = [];
	while (t--) ar.push(this);
	return ar.join("");
}

/** COMPARISON */

String.prototype.compare = function(that) {
	if (this < that) {
		return -1;
	} else if (this > that) {
		return 1;
	} else {
		return 0;
	}
}

String.prototype.casecmp = function(that) {
	return this.downcase().compare( that.downcase() );
}

String.prototype.ascii_only = function() {
	var result = true;
	for (var i=0, len=this.length; i<len; i++) {
		result &= this.charCodeAt(i) < 128;
	}
	return result;
}

/** ACCESSORS/ITERATION */

String.prototype.bytes = function() {
	if (arguments.length == 1 && typeof arguments[0] == "function") {
		return this._walk(arguments[0], this._byte_accessor)
	} else {
		return this.to_bytes();
	} 
}

String.prototype.chars = function() {
	if (arguments.length == 1 && typeof arguments[0] == "function") {
		return this._walk(arguments[0], this._char_accessor)
	} else {
		return this.to_a();
	} 
}

/** MODIFIERS */

String.prototype.capitalize = function() {
	return this.slice(0,1).upcase() + this.slice(1).downcase();
}

String.prototype.downcase = function() {
	return this.toLowerCase();
}

String.prototype.upcase = function() {
	return this.toUpperCase();
}

/** CONVERSION */

String.prototype.to_a = function() {
	return this._to_array(this._char_accessor);
}

String.prototype.to_bytes = function() {
	return this._to_array(this._byte_accessor);
}

String.prototype._to_array = function(accessor) {
	var result = [],
			func = accessor();
	for (var i=0, len=this.length; i<len; i++) {
		result.push( this[func](i) );
	}
	return result;
}

/** CLOCKWORKS */

String.prototype._walk = function(callback, accessor) {
	var func = accessor();
	for (var i=0, len=this.length; i<len; i++) {
		callback( this[func](i) );
	}
}

String.prototype._byte_accessor = function(i) {
	return "charCodeAt";
}

String.prototype._char_accessor = function(i) {
	return "charAt";
}