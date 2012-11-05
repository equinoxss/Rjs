/*
	Ruby String methods
*/

/** CONSTUCTION */

String.prototype.times = function(t) {
	var ar = [];
	while (t--) ar.push(this);
	return ar.join("");
}

String.prototype.gsub = function() {
	if (arguments.length < 2) {
		throw "missing argument(s)";
	} else {
		var pattern;
		if (typeof arguments[0] == "string") {
			pattern = arguments[0];
		} else if (typeof arguments[0] == "object") {
			pattern = arguments[0].source;
		}
		return this.replace(new RegExp(pattern, "g"), arguments[1]);
	}
}

/* TODO: move to Set
String.prototype.intersection = function() {
	var dictionary = {},
			buffer = this + Array.prototype.slice.call(arguments).join(""),
			result = "";
	buffer.chars(function(c) {
		dictionary[c] |= 0;
		dictionary[c]++;
	});
	for (key in dictionary) {
		if (dictionary[key] > 1) {
			result += key
		}
	}
	return result;
}


String.prototype.union = function() {
	var dictionary = {},
			setCount = 1 + arguments.length,
			buffer = this + Array.prototype.slice.call(arguments).join(""),
			result = "";
	buffer.chars(function(c) {
		dictionary[c] |= 0;
		dictionary[c]++;
	});
	for (key in dictionary) {
		result += key.times(dictionary[key] / setCount);
	}
	return result;
}
*/

/** IDENTITY */

// Apache Harmony
String.prototype.hash_code = function() {
	var hash = 0;
	if (this.length == 0) return hash;
	var buffer = this.chars().reverse()
			multiplier = 1;
	for (var i=0, len=buffer.length; i<len; i++) {
    hash += buffer[i].charCodeAt(0) * multiplier;
    multiplier = (multiplier << 5) - multiplier;
	}
	return hash;
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

String.prototype.end_with = function() {
	if (arguments.length == 0) {
		return false;
	} else {
		var result = false;
		for (var i=0, len=arguments.length; i<len; i++) {
			if (typeof arguments[i] == "string") {
				result |= (this.indexOf(arguments[i]) == this.length - arguments[i].length);
			}
		}
		return result;
	}
}

String.prototype.eql = function() {
	return this.equals.apply(this, arguments);
}

String.prototype.equals = function() {
	if (arguments.length == 0) {
		return false;
	} else {
		return (this.length == arguments[0].length) && (this.compare(arguments[0]) == 0);
	}
}

String.prototype.include = function() {
	return this.includes.apply(this, arguments);
}

String.prototype.includes = function () {
	if (arguments.length == 0) {
		return false;
	}
	return this.indexOf(arguments[0]) >= 0;
}

/** ACCESSORS/ITERATION */

String.prototype.bytes = function() {
	if (arguments.length == 1 && typeof arguments[0] == "function") {
		return this._walk(arguments[0], this._byte_accessor)
	} else {
		return this.to_bytes();
	} 
}

String.prototype.each_byte = function() {
	return this.bytes.apply(this, arguments);
}

String.prototype.chars = function() {
	if (arguments.length == 1 && typeof arguments[0] == "function") {
		return this._walk(arguments[0], this._char_accessor)
	} else {
		return this.to_a();
	} 
}

String.prototype.each_char = function() {
	return this.chars.apply(this, arguments);
}

String.prototype.each_line = function() {
	var lines = this.split(/\r\n|\r|\n/);
	if (arguments.length == 1 && typeof arguments[0] == "function") {
		lines.each(arguments[0]);
	} else {
		return lines;
	}
}

String.prototype.lines = function() {
	return this.each_line.apply(this, arguments);
}

String.prototype.count = function() {
	// count character intersection of arguments
	// ^ means invert
}

String.prototype.delete = function() {
	// delete intersection of arguments, return remainder
	// ^ means invert -- same as count
}

String.prototype.is_empty = function() {
	return this.length == 0;
}

String.prototype.index = function() {
	if (arguments.length == 0) {
		throw "missing argument(s)"
	} else {
		var buffer = this,
				offset = 0,
				index = -1;
		if (arguments.length == 2) {
			buffer = this.substr(arguments[1]);
			offset = this.length - buffer.length;
		}
		if (typeof arguments[0] == "object") {
			index = buffer.search(arguments[0]);
		} else if (typeof arguments[0] == "string") {
			index = buffer.indexOf(arguments[0]);
		} 
		return (index == -1) ? null : index + offset;
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

String.prototype.chomp = function() {
	var pattern = /[\r\n]*$/;
	if (arguments.length) {
		pattern = new RegExp(arguments[0]+"$");
	}
	return this.replace(pattern, "");
}

String.prototype.chop = function() {
	var pattern = /([\r\n]*|.)$/;
	return this.replace(pattern, "");
}

String.prototype.strip = function() {
	return this.lstrip().rstrip();
}

String.prototype.lstrip = function() {
	return this.replace(/^[\s\t\n\r]*/,"");
}

String.prototype.rstrip = function() {
	return this.replace(/[\s\t\n\r]*$/,"");
}

/** CONVERSION */

String.prototype.to_a = function() {
	return this._to_array(this._char_accessor);
}

String.prototype.to_bytes = function() {
	return this._to_array(this._byte_accessor);
}

String.prototype.hex = function () {
	if (this.is_empty()) {
		return NaN;
	} else {
		var buffer = this.lstrip(),
				negative = buffer[0] == "-",
				offset = (negative) ? 1 : 0
				isHex = buffer.indexOf("0x") == offset,
				hexStr = (negative?"-":"") + (isHex?"":"0x") + buffer.substr(offset);
		return parseInt(hexStr);
	}
}

/** CLOCKWORKS */

String.prototype._to_array = function(accessor) {
	var result = [],
			func = accessor();
	for (var i=0, len=this.length; i<len; i++) {
		result.push( this[func](i) );
	}
	return result;
}

String.prototype._walk = function(callback, accessor) {
	var func = accessor();
	for (var i=0, len=this.length; i<len; i++) {
		callback( this[func](i), i );
	}
}

String.prototype._walk_backwards = function(callback, accessor) {
	var func = accessor();
	for (var i=this.length-1; i>=0; i--) {
		callback( this[func](i), i );
	}
}

String.prototype._byte_accessor = function(i) {
	return "charCodeAt";
}

String.prototype._char_accessor = function(i) {
	return "charAt";
}